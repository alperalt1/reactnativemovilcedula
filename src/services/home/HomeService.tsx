import axios from "axios";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { CedulaConsultada, Consultar, Subscription } from "../../interface/home/HomeInterface";
import { ApiResponse } from "../../interface/ApiResponse";
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
  (config)=>{
    const token = useAuthStore.getState().token;
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error)=>{
    return Promise.reject(error)
  }
)

export const HomeService = {
  consultar: async (informacion: Consultar): Promise<ApiResponse<CedulaConsultada>> =>{
    const { data } = await api.post('/consultar',informacion);
    return data;
  },
  informacionsuscripcion: async (): Promise<ApiResponse<Subscription>> =>{
    const { data }= await api.get<ApiResponse<Subscription>>('/informacionsuscripcion');
    return data;
  }
}