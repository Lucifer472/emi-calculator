import db from "@/lib/db";
import * as z from "zod";

import { BlogSchema } from "@/schema";

export const addBlog = async (
  value: z.infer<typeof BlogSchema>,
  userId: string,
  url: string,
  img: string
) => {
  try {
    const data = await db.blog.create({
      data: {
        title: value.title,
        url: url,
        img: img,
        keywords: value.keywords,
        description: value.desc,
        blog: value.blog,
        faq: value.faq,
        category: value.category,
        authrId: userId,
      },
    });

    if (!data) return { error: "Something went wrong" };

    return { success: data };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const getBlogFromUrl = async (url: string) => {
  try {
    const data = await db.blog.findUnique({
      where: {
        url,
      },
    });

    if (!data) return null;
    return data;
  } catch (error) {
    return null;
  }
};

export const getBlogsByCat = async (cat: string, page: number) => {
  try {
    const data = await db.blog.findMany({
      skip: page - 1,
      take: 10,
      where: {
        category: cat,
      },
      include: {
        Author: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!data) return null;
    return data;
  } catch (error) {
    return null;
  }
};
