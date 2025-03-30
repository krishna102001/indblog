import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// userRouter.get("/", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   const body = c.body()
//   const data = await prisma.user.findMany();
//   return c.text("hello babay");
// });

userRouter.post("/signup", async (c) => {
  const body = await c.req.json(); // getting req data
  const JWT_SECRET = c.env.JWT_SECRET; // env variable getting
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const hashPassword = await bcrypt.hash(body.password, 10);
    // console.log(hashPassword);
    const data = await prisma.user.create({
      data: {
        ...body,
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    const payload = {
      ...data,
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    };
    const token = await sign(payload, JWT_SECRET); // jwt signing
    return c.json({ success: true, jwt_token: token }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "failed to register" }, 400);
  }
});

userRouter.post("/signin", (c) => {
  return c.text("user sign in");
});

export default userRouter;
