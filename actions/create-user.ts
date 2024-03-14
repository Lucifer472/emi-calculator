"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { createUserFromValue } from "@/lib/user";
import { UserSchema } from "@/schema";

export const createUserAction = async (v: z.infer<typeof UserSchema>) => {
  const validatedField = UserSchema.safeParse(v);

  if (!validatedField.success) {
    return { error: "Invalid Field Provided!" };
  }
  const hashedPassword = await bcrypt.hash(validatedField.data.password, 10);

  const data = { ...validatedField.data, password: hashedPassword };

  const user = await createUserFromValue(data);

  if (user.success) {
    return { success: user.success, message: "Created Successfully" };
  }

  return { error: user.error };
};
