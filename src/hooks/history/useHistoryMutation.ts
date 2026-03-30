import { useQuery } from "@tanstack/react-query";
import { useSubscriptionStore } from "../../store/home/useSubscriptionStore"
import { HomeService } from "../../services/home/HomeService";
import { useEffect } from "react";
import { useHistoryStore } from "../../store/history/useHistoryStore";
import { HistoryService } from "../../services/history/HistoryService";

export const useHistoryMutation = () => {
  const setHistory = useHistoryStore((state) => state.setHistory);
  const query = useQuery({
    queryKey: ['history-info'],
    queryFn: HistoryService.historialconsulta,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (query.data?.status === 'success' && Array.isArray(query.data.data)) {
      setHistory(query.data.data);
    }
  }, [query.data, setHistory]);
  return {
    history: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}