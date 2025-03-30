import { Hono } from "hono";

import userRouter from "./routes/userRouter.routes";
import blogRouter from "./routes/blogRouter.routes";

const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
