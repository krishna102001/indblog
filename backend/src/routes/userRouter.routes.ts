import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { signinInput, signupInput } from "@krishnakantmaurya/indblog-common";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json(); // getting req data
  const JWT_SECRET = c.env.JWT_SECRET; // env variable getting
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = signupInput.safeParse(body);
  if (!success) {
    return c.json({ success: false, message: "input are incorrect" }, 400);
  }

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
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };
    const token = await sign(payload, JWT_SECRET); // jwt signing
    return c.json({ success: true, jwt_token: token }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "failed to register" }, 400);
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const JWT_SECRET = c.env.JWT_SECRET;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return c.json({ success: false, message: "input are not correct" }, 400);
  }
  try {
    const data = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!data) {
      return c.json({ success: false, message: "not found user!!" }, 403);
    }
    const isMatchPaswword = await bcrypt.compare(body.password, data.password);
    if (!isMatchPaswword) {
      return c.json({ success: false, message: "incorrect password" }, 400);
    }
    const payload = {
      id: data.id,
      name: data.name,
      email: data.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };
    const token = await sign(payload, JWT_SECRET);
    return c.json({ success: true, jwt_token: token }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "failed to sign in" }, 400);
  }
});

export default userRouter;
