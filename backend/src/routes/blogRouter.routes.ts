import { Hono } from "hono";
import { verify } from "hono/jwt";
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

blogRouter.put("/blog/:id", (c) => {
  return c.text("updated blogs");
});

blogRouter.get("/blog/bulk", (c) => {
  return c.text("saare blogs bluk me hain");
});

blogRouter.get("/blog/:id", (c) => {
  return c.text("blog hain");
});

blogRouter.delete("/blog/:id", (c) => {
  return c.text("blog deleted");
});

export default blogRouter;
