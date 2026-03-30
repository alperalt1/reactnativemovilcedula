import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Consultar } from '../../interface/home/HomeInterface'
import { HomeService } from '../../services/home/HomeService'
import { AxiosError } from 'axios'
import { ApiResponse } from '../../interface/ApiResponse'
import { useConsultaStore } from '../../store/home/useConsultaStore'
import { useNavigation } from '@react-navigation/native'
import { NavigationInterface } from '../../interface/navigation/NavigationInterface'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const useConsultarMutation = () => {
  const queryClient = useQueryClient();
  const setCedula = useConsultaStore((state) => state.setCedula);
  const clearCedula = useConsultaStore((state) => state.clearCedula);
  const navigation = useNavigation<NativeStackNavigationProp<NavigationInterface>>();
  const mutation = useMutation({
    mutationFn: (informacion: Consultar) => HomeService.consultar(informacion),
    onMutate: () => {
      clearCedula();
    },
    onSuccess: (response) => {
      if (response?.data) {
        setCedula(response.data);
        queryClient.invalidateQueries({ queryKey: ['subscription-info'] });
        queryClient.invalidateQueries({ queryKey: ['history-info'] });
      }
      navigation.navigate('CedulaView', {
        title: 'Consulta de Identidad'
      });
    },
    onError: (error: AxiosError<ApiResponse<any>>) => {
      const serverMessage = error.response?.data?.message || "Error de conexión";
      const validationErrors = error.response?.data?.errors;
      if (validationErrors) {
        console.log("Errores detallados:", validationErrors);
      }
      Alert.alert("Error", serverMessage);
    }
  })
  return { 
    mutation,
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    data: mutation.data?.data
  }
}
