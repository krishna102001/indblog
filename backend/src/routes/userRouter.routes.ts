import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

userRouter.get("/", async (c) => {
  //   const prisma = new PrismaClient({
  //     datasourceUrl: c.env.DATABASE_URL,
  //   }).$extends(withAccelerate());
  //   const data = await prisma.user.findMany();
  return c.text("hello babay");
});

userRouter.post("/signup", async (c) => {
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

userRouter.post("/signin", (c) => {
  return c.text("user sign in");
});

export default userRouter;
