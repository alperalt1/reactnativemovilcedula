import axios from "axios";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { CedulaConsultada, Consultar, Subscription } from "../../interface/home/HomeInterface";
import { ApiResponse } from "../../interface/ApiResponse";
import { HistorialConsulta } from "../../interface/history/HistoryInterface";
import { Urls } from "../../constants/Urls";

const api = axios.create({
  baseURL: Urls.development,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const HistoryService = {
  historialconsulta: async (): Promise<ApiResponse<HistorialConsulta[]>> => {
    const { data } = await api.get<ApiResponse<HistorialConsulta[]>>('/historialconsulta');
    return data;
  },

}