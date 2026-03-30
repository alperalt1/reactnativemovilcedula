import { create } from "zustand";
import { Subscription } from "../../interface/home/HomeInterface";

interface SubscriptionState {
  subscripcion: Subscription | null;
  setSubscripcion: (data: Subscription) => void;
  clearSubscripcion: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscripcion: null,
  setSubscripcion: (data) => set({
    subscripcion: data
  }),
  clearSubscripcion: () => set({
    subscripcion: null
  })
}))