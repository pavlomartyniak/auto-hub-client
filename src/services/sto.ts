"use client";

import { api } from "@/lib/api";
import { STO } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useSTOList() {
  return useQuery<STO[]>({
    queryKey: ["sto"],
    queryFn: async () => {
      const { data } = await api.get<STO[]>("/api/sto");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useSTOById(id: string) {
  return useQuery<STO>({
    queryKey: ["sto", id],
    queryFn: async () => {
      const { data } = await api.get<STO>(`/api/sto/${id}`);
      return data;
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}
