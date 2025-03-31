import { ParseStatus, string, z } from "zod";

export const signupInput = z.object({
  name: string(),
  email: string().email(),
  password: string().min(6).max(20),
});

export const signinInput = z.object({
  email: string().email(),
  password: string(),
});

export const blogCreateInput = z.object({
  title: string(),
  content: string(),
});

export const blogUpdateInput = z.object({
  title: string().optional(),
  content: string().optional(),
});

export type signupType = z.infer<typeof signupInput>;
export type signinType = z.infer<typeof signinInput>;
export type blogCreateType = z.infer<typeof blogCreateInput>;
export type blogUpdateType = z.infer<typeof blogUpdateInput>;
