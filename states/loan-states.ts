import { create } from "zustand";

interface useLoan1State {
  loanType: string;
  setLoanType: (v: string) => void;
}

export const useLoan1 = create<useLoan1State>((set) => ({
  loanType: "personal",
  setLoanType: (v) => set({ loanType: v }),
}));

interface useLoan2State {
  bank: string;
  setBank: (v: string) => void;
}

export const useLoan2 = create<useLoan2State>((set) => ({
  bank: "hdfc",
  setBank: (v) => set({ bank: v }),
}));
