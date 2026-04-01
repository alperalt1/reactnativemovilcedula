import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { CodigoInterface, RegisterInterface } from "../../interface/auth/AuthInterface";
import { AuthService } from "../../services/auth/AuthService";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { AxiosError } from "axios";
import { ApiResponse } from "../../interface/ApiResponse";
import { Alert } from "react-native";
import { useConsultaStore } from "../../store/home/useConsultaStore";
import { useSubscriptionStore } from "../../store/home/useSubscriptionStore";
import { useResetPasswordStore } from "../../store/auth/useResetPassword";

export const useEnviarCodigoMutation = () => {

  const mutation = useMutation({
    mutationFn: (credentials: CodigoInterface) => AuthService.generarcodigo(credentials),
    onError: (error: AxiosError<ApiResponse<any>>) => {
      const serverMessage = error.response?.data?.message || "Error de conexión";
      const validationErrors = error.response?.data?.errors;
      if (validationErrors) {
        console.log("Errores detallados:", validationErrors);
      }
      Alert.alert("Error", serverMessage);
    }
  });
  return { mutation }

}