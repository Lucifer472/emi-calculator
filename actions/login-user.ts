"use server";
import { signIn } from "@/auth";
import { redirect_path } from "@/routes";
import { LoginSchema } from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod";

export const LoginUser = async (v: z.infer<typeof LoginSchema>) => {
  const validateData = LoginSchema.safeParse(v);

  if (!validateData.success) {
    return { error: "Invalid Fields" };
  }
  try {
    await signIn("credentials", {
      email: validateData.data.email,
      password: validateData.data.password,
      redirect: false,
    });

    return { success: "Login Successful" };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong" };
  }
};
