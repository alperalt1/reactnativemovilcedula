import { useQuery } from "@tanstack/react-query";
import { useSubscriptionStore } from "../../store/home/useSubscriptionStore"
import { HomeService } from "../../services/home/HomeService";
import { useEffect } from "react";

export const useSubscriptionMutation = () => {
  const setSubscripcion = useSubscriptionStore((state) => state.setSubscripcion);
  const query = useQuery({
    queryKey: ['subscription-info'],
    queryFn: HomeService.informacionsuscripcion,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (query.data?.status === 'success' && query.data?.data) {
      setSubscripcion(query.data.data);
    }
  }, [query.data, setSubscripcion]);
  return query;
}