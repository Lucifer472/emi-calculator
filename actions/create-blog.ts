"use server";

import * as z from "zod";
import { auth } from "@/auth";

import { addBlog } from "@/lib/blog";
import { getUserIdByEmail } from "@/lib/user";
import { BlogSchema } from "@/schema";

export const createBlog = async (v: z.infer<typeof BlogSchema>) => {
  const validateData = BlogSchema.safeParse(v);

  if (!validateData.success) {
    return { error: "Something went wrong!" };
  }

  const { data } = validateData;

  // const session = await auth();
  // if (!session || !session.user || !session.user.email) {
  //   return { error: "Please Login Again!" };
  // }

  const userId = await getUserIdByEmail("hsexplain1@gmail.com");

  let img = " ";
  const block = JSON.parse(data.blog);
  for (const e of block.blocks) {
    if (e.type === "image") {
      img = e.data.file.url;
      break;
    }
  }

  if (userId.success) {
    const blog = await addBlog(
      data,
      userId.success,
      data.title
        .toLowerCase()
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, "-"),
      img
    );
    if (blog.success) {
      return { success: "Blog Created Successfully" };
    }
  }
  return { error: "Something went wrong" };
};
