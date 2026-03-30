import { create } from "zustand";
import { CedulaConsultada } from "../../interface/home/HomeInterface";

interface ConsultaState {
  cedula: CedulaConsultada | null;
  setCedula: (data: CedulaConsultada ) => void;
  clearCedula: () => void;
}


export const useConsultaStore = create<ConsultaState>((set) => ({
  cedula: null,
  setCedula: (data) => set({
    cedula: data
  }),
  clearCedula: () => set({
    cedula: null
  })
}))