import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// POST /api/v1/user/signup
// POST /api/v1/user/signin
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/:id
// GET /api/v1/blog/bulk

app.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const data = await prisma.user.findMany();
  return c.json(data);
});

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  await prisma.user.create({
    data: {
      name: "Krishna Kant Maurya",
      email: "krishna@gmail.com",
      password: "12344",
    },
  });
  return c.text("user signed up");
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("user sign in");
});

app.post("/api/v1/blog", (c) => {
  return c.text("added blog");
});

app.put("/api/v1/blog", (c) => {
  return c.text("updated blogs");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("saare blogs bluk me hain");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("blog hain");
});

export default app;
