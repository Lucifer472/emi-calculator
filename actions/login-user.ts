"use server";
import * as z from "zod";

import { signIn } from "@/auth";
import { redirect_path } from "@/routes";
import { LoginSchema } from "@/schema";

export const LoginUser = async (v: z.infer<typeof LoginSchema>) => {
  const validateData = LoginSchema.safeParse(v);

  if (!validateData.success) {
    return { error: "Invalid Fields" };
  }
  await signIn("credentials", {
    email: validateData.data.email,
    password: validateData.data.password,
    redirect: true,
    redirectTo: redirect_path,
  });
};
