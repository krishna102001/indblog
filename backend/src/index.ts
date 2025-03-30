import { Hono } from "hono";

import userRouter from "./routes/userRouter.routes";
import blogRouter from "./routes/blogRouter.routes";

const app = new Hono();

// POST /api/v1/user/signup
// POST /api/v1/user/signin
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/:id
// GET /api/v1/blog/bulk

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
