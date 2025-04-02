import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  blogCreateInput,
  blogCreateType,
  blogUpdateInput,
} from "@krishnakantmaurya/indblog-common";
import { encodeBase64 } from "hono/utils/encode";
import { cloudinaryUploadImage } from "../utils/cloudinary-upload";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    OPEN_AI_KEY: string;
  };
  Variables: {
    userId: string;
    cloudinaryConfig: string;
  };
}>();

//middleware is created
blogRouter.use("/*", async (c, next) => {
  const authHeader = (await c.req.header("Authorization")) || "";
  if (authHeader === "") {
    return c.json({ success: false, message: "token not found" }, 400);
  }
  const token = authHeader?.split(" ")[1];
  const decodeJwt = decode(token);
  if (Math.floor(Date.now() / 1000) > (decodeJwt.payload.exp || 0)) {
    return c.json(
      {
        success: false,
        message: "please login again. token expired!!!",
      },
      400
    );
  }
  const user = await verify(token, c.env.JWT_SECRET);
  // console.log(user);
  if (user && typeof user.id == "string") {
    //cloudinary setup
    const cloudName = c.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = c.env.CLOUDINARY_API_KEY;
    const apiSecret = c.env.CLOUDINARY_API_SECRET;

    c.set("cloudinaryConfig", JSON.stringify({ cloudName, apiKey, apiSecret }));
    c.set("userId", user.id);
    await next();
  } else {
    return c.json({ success: false, message: "unauthorized access" }, 401);
  }
});

blogRouter.post("/blog", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const formData = await c.req.formData();
  const image = formData.get("image");
  let result;
  if (image instanceof File) {
    const imageArrayBuffer = await image.arrayBuffer();
    const base64 = encodeBase64(imageArrayBuffer);
    const cloudinaryConfig = JSON.parse(c.get("cloudinaryConfig"));
    result = await cloudinaryUploadImage(cloudinaryConfig, base64);
  }

  const body = {
    title: String(formData.get("title")),
    content: String(formData.get("content")),
    image: result.url,
  };

  // quota limit excceded 🥺😭
  // const client = new OpenAI({ apiKey: c.env.OPEN_AI_KEY });
  // const response = await client.responses.create({
  //   model: "gpt-4o-mini",
  //   input: [
  //     {
  //       role: "assistant",
  //       content:
  //         "you will get a blog content in html format. you have to summarise the content and add below them a summary part which have given",
  //     },
  //     {
  //       role: "user",
  //       content: body.content,
  //     },
  //   ],
  // });

  // body.content = response.output_text;

  const { success, error } = blogCreateInput.safeParse(body);
  if (!success) {
    console.error(error);
    return c.json({ success: false, message: "incorrect inputs" }, 400);
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        image: body.image,
        published: true,
        authorId: userId,
      },
    });
    return c.json({ success: true, post: post }, 201);
  } catch (error) {
    console.error(error);
    return c.json(
      { success: false, message: "failed to publish the post!!" },
      400
    );
  }
});

blogRouter.put("/blog/:id", async (c) => {
  const userId = c.get("userId");
  const postId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const { success } = blogUpdateInput.safeParse(body);
  if (!success) {
    return c.json({ success: false, message: "incorrect inputs" }, 400);
  }
  try {
    const updatePost = await prisma.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: {
        ...body,
      },
    });
    if (!updatePost) {
      return c.json(
        { success: false, message: "failed to update the post" },
        500
      );
    }
    return c.json({ success: true, message: "updated successfully" });
  } catch (error) {
    console.error(error);
    return c.json(
      { success: false, message: "failed to update the data" },
      400
    );
  }
});

blogRouter.get("/blog/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const data = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      created_at: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return c.json({ success: true, posts: data });
});

blogRouter.get("/blog/:id", async (c) => {
  const postId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        created_at: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    if (!post) {
      return c.json({ success: false, message: "no post!!!" }, 400);
    }
    return c.json({ success: true, post }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "failed to get the post" }, 400);
  }
});

blogRouter.get("/blog/user/all/:id", async (c) => {
  const userId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        posts: true,
      },
    });
    return c.json({ success: true, posts });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "failed to get the post" });
  }
});

blogRouter.delete("/blog/:id", async (c) => {
  const postId = c.req.param("id");
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });
    if (!post) {
      return c.json({ success: false, message: "post not found" }, 400);
    }
    return c.json({ success: true, message: "successfully deleted post" }, 200);
  } catch (error) {
    console.error(error);
    return c.json(
      { success: false, message: "failed to deleted the post" },
      500
    );
  }
});

blogRouter.post("/blog/image-upload", async (c) => {
  const body = await c.req.formData();
  const image = body.get("image");
  try {
    if (image instanceof File) {
      const byteArrayBuffer = await image.arrayBuffer();
      const base64 = encodeBase64(byteArrayBuffer);
      const cloudinaryConfig = JSON.parse(c.get("cloudinaryConfig"));
      const result = await cloudinaryUploadImage(cloudinaryConfig, base64);
      // console.log(result);
      return c.json({ success: true, url: result.url }, 201);
    }
  } catch (error) {
    return c.json(
      { status: false, message: "Failed to upload the photo" },
      400
    );
  }
});

export default blogRouter;
