import { Hono } from "hono";
import { verify } from "hono/jwt";

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
  const token = authHeader?.split(" ")[1];
  const user = await verify(token, c.env.JWT_SECRET);
  console.log(user);
  if (user && typeof user.id == "string") {
    c.set("userId", user.id);
    await next();
  } else {
    return c.json({ success: false, message: "unauthorized access" }, 401);
  }
});

blogRouter.post("/api/v1/blog", (c) => {
  return c.text("added blog");
});

blogRouter.put("/api/v1/blog", (c) => {
  return c.text("updated blogs");
});

blogRouter.get("/api/v1/blog/bulk", (c) => {
  return c.text("saare blogs bluk me hain");
});

blogRouter.get("/api/v1/blog/:id", (c) => {
  return c.text("blog hain");
});

export default blogRouter;
