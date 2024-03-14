import { create } from "zustand";

interface ArticleState {
  category: string;
  setCat: (v: string) => void;
}

export const useArticleState = create<ArticleState>((set) => ({
  category: "car",
  setCat: (v) =>
    set({
      category: v,
    }),
}));
