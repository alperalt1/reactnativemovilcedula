import { CedulaConsultada } from "../home/HomeInterface";

export interface HistorialConsulta {
  id: number;
  user_id: number;
  cedula_consultada: string;
  resultado_json: CedulaConsultada;
  ip_address: string;
  created_at: string;
  updated_at: string;
}