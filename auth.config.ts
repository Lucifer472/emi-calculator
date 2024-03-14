import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import CredentialsProvider from "next-auth/providers/credentials";
import { getUsersByEmail } from "./lib/user";
import { LoginSchema } from "./schema";

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (!validateFields.success) return null;

        const user = await getUsersByEmail(validateFields.data.email);
        if (user.success) {
          const isMatch = await bcrypt.compare(
            validateFields.data.password,
            user.success.password
          );

          if (!isMatch) {
            return null;
          }

          const data = { ...user.success, password: null };
          return data;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
