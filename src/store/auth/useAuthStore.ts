import { create } from "zustand";
import { LoginInterface } from "../../interface/auth/AuthInterface";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "../mmkvStorage";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setLoginData: (data: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setLoginData: (data) => set({
        user: data.user,
        token: data.access_token
      }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage-id',
      storage: createJSONStorage(() => mmkvStorage)
    }
  )
);