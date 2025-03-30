import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
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

  const body = await c.req.json();
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
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

blogRouter.delete("/blog/:id", (c) => {
  return c.text("blog deleted");
});

export default blogRouter;
