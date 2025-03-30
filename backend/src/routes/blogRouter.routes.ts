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

blogRouter.post("/blog", (c) => {
  return c.text("added blog");
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
