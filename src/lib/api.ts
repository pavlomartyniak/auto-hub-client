import axios from "axios";
import { env } from "@/lib/env";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: env.NEXT_PUBLIC_API_TIMEOUT,
});

// Interceptors keep cross-cutting concerns in one place (DRY)
api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.set("Content-Type", "application/json");
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize errors for predictable handling in UI
    return Promise.reject({
      message: error?.response?.data?.message ?? "Unexpected API error",
      status: error?.response?.status ?? 500,
    });
  },
);
