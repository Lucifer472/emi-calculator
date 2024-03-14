import * as z from "zod";

export const UserSchema = z.object({
  email: z.string().min(1).max(50),
  password: z.string().min(8).max(50),
  name: z.string().min(5).max(50),
  img: z.string(),
  bio: z.string().min(25).max(100),
  gender: z.enum(["Male", "Female"]).default("Male"),
  dob: z.date(),
  facebook: z.string().min(1),
  instagram: z.string().min(1),
  linkedin: z.string().min(1),
  twitter: z.string().min(1),
});

export const LoginSchema = z.object({
  email: z.string().min(1).max(50),
  password: z.string().min(8).max(50),
});

export const BlogSchema = z.object({
  title: z.string().min(3).max(100),
  keywords: z.string().max(100),
  desc: z.string().max(100),
  category: z.string().min(1).max(50),
  blog: z.string(),
  faq: z.string(),
});
