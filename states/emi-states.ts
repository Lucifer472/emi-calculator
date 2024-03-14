import { create } from "zustand";

interface useEmiStateProps {
  principle: number;
  interest: number;
  duration: number;

  setPrinciple: (v: number) => void;
  setInterest: (v: number) => void;
  setDuration: (v: number) => void;
}

export const useEmiState = create<useEmiStateProps>((set) => ({
  principle: 100000,
  interest: 10.5,
  duration: 5,
  setPrinciple: (v) => set({ principle: v }),
  setInterest: (v) => set({ interest: v }),
  setDuration: (v) => set({ duration: v }),
}));
