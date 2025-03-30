import { Hono } from "hono";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

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
