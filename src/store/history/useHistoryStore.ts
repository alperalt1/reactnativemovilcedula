import { create } from "zustand";
import { CedulaConsultada } from "../../interface/home/HomeInterface";
import { HistorialConsulta } from "../../interface/history/HistoryInterface";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "../mmkvStorage";

interface HistoryState {
  history: HistorialConsulta[] | [];
  setHistory: (data: HistorialConsulta[] ) => void;
  clearHistory: () => void;
}


export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      setHistory: (data) => set({ history: data }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'history-storage',
      storage: createJSONStorage(() => mmkvStorage) 
    }
  )
);