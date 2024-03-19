import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import Credentials from "next-auth/providers/credentials";
import { getUsersByEmail } from "@/lib/user";
import { LoginSchema } from "@/schema";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (!validateFields.success) return null;

        const { email, password } = validateFields.data;

        const user = await getUsersByEmail(email);
        if (user.error || !user.success) return null;

        const isPasswordMatch = await bcrypt.compare(
          password,
          user.success.password as string
        );

        if (!isPasswordMatch) return null;
        return user.success;
      },
    }),
  ],
} satisfies NextAuthConfig;
