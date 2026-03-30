import axios from "axios";
import { LoginInterface, LoginResponse, RegisterInterface, RegisterResponse } from "../../interface/auth/AuthInterface";
import { ApiResponse } from "../../interface/ApiResponse";
import { Urls } from "../../constants/Urls";

const api = axios.create({
  baseURL: Urls.development,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

export const AuthService = {
  login: async (credentials: LoginInterface): Promise<ApiResponse<LoginResponse>> => {
    const { data } = await api.post('/iniciarsesion', credentials);
    return data;
  },

  register: async (credentials: RegisterInterface): Promise<ApiResponse<RegisterResponse>> => {
    const { data } = await api.post('/registrar', credentials);
    return data;
  }
}