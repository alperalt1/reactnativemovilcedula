import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterInterface } from "../../interface/auth/AuthInterface";
import { AuthService } from "../../services/auth/AuthService";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { AxiosError } from "axios";
import { ApiResponse } from "../../interface/ApiResponse";
import { Alert } from "react-native";
import { useConsultaStore } from "../../store/home/useConsultaStore";
import { useSubscriptionStore } from "../../store/home/useSubscriptionStore";

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const setLoginData = useAuthStore((state) => state.setLoginData);
  const clearCedula = useConsultaStore((state)=> state.clearCedula);
  const clearSubscripcion = useSubscriptionStore((state)=>state.clearSubscripcion);
  const mutation = useMutation({
    mutationFn: (credentials: RegisterInterface) => AuthService.register(credentials),
    onSuccess: (response) => {
      clearCedula();
      clearSubscripcion();
      queryClient.clear();
      setLoginData(response.data)

    },
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