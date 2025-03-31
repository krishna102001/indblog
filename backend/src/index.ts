import { Hono } from "hono";

import userRouter from "./routes/userRouter.routes";
import blogRouter from "./routes/blogRouter.routes";
import { cors } from "hono/cors";

const app = new Hono();
app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/", blogRouter);

export default app;
