import { create } from "zustand";

interface ResetPasswordState {
  email: string | null;
  setEmail: (data: any) => void;
  clearEmail: () => void;
}

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  email: null,
  setEmail: (data) => set({
    email: data
  }),
  clearEmail: () => set({ email: null }),
}))