import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginInterface } from "../../interface/auth/AuthInterface";
import { AuthService } from "../../services/auth/AuthService";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { AxiosError } from "axios";
import { ApiResponse } from "../../interface/ApiResponse";
import { Alert } from "react-native";
import { useConsultaStore } from "../../store/home/useConsultaStore";
import { useSubscriptionStore } from "../../store/home/useSubscriptionStore";
import { useHistoryStore } from "../../store/history/useHistoryStore";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const setLoginData = useAuthStore((state) => state.setLoginData);
  const clearCedula = useConsultaStore((state) => state.clearCedula);
  const clearSubscripcion = useSubscriptionStore((state) => state.clearSubscripcion);
  const clearHistory = useHistoryStore((state) => state.clearHistory);
  const mutation = useMutation({
    mutationFn: (credentials: LoginInterface) => AuthService.login(credentials),
    onSuccess: async (response) => {
      clearCedula();
      clearSubscripcion();
      clearHistory();
      queryClient.clear();

      setLoginData(response.data);

      await queryClient.refetchQueries({
        queryKey: ['history-info'],
        type: 'active'
      });

      await queryClient.refetchQueries({
        queryKey: ['subscription-info'],
        type: 'active'
      });
    },
    onError: (error: AxiosError<ApiResponse<any>>) => {
      if (error.response) {
        const serverMessage = error.response.data?.message || "Error en el servidor";
        const validationErrors = error.response.data?.errors;

        console.log("Error del servidor:", serverMessage, validationErrors);
        Alert.alert("Error de validación", serverMessage);
      }
      else if (error.request) {
        console.log("Error de conexión (Network Error):", error.message);
        Alert.alert(
          "Error de conexión",
          "No se pudo conectar con el servidor. Verifica que tengas internet o que la configuración HTTP sea correcta."
        );
      }
      else {
        Alert.alert("Error", error.message);
      }
    }
  });
  return { mutation }

}