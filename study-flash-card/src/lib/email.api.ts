// @/lib/email.api.ts
import { api } from "./api";
import { AxiosResponse } from "axios";

export interface ApiResponse {
  success: boolean;
  message?: string;
}

export const submitContribution = async (
  email: string,
  message: string,
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    // You MUST 'return' the promise here
    return await api.post("/contributions", { email, message });
  } catch (error) {
    console.error("Failed to submit contribution:", error);
    throw error;
  }
};
