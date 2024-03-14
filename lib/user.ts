import db from "@/lib/db";

import * as z from "zod";
import { UserSchema } from "@/schema/index";

export const createUserFromValue = async (v: z.infer<typeof UserSchema>) => {
  try {
    const user = await db.user.create({
      data: {
        email: v.email,
        name: v.name,
        password: v.password,
        emailVerified: new Date(),
        image: v.img,
      },
    });

    const data = await db.profile.create({
      data: {
        bio: v.bio,
        dob: v.dob,
        facebook: v.facebook,
        instagram: v.instagram,
        linkedin: v.linkedin,
        twitter: v.twitter,
        gender: v.gender,
        userId: user.id,
      },
    });

    if (!data) return { error: "Something went Wrong!" };

    return { success: data };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const getUsersByEmail = async (email: string) => {
  try {
    const data = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!data) return { error: "No User Found!" };

    return { success: data };
  } catch (error) {
    return { error: "Something went Wrong!" };
  }
};

export const getUserIdByEmail = async (email: string) => {
  try {
    const data = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!data) return { error: "No User Found!" };

    return { success: data.id };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
