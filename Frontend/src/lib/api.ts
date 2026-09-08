import type { PredictionInput, PredictionResponse, HistoryItem, ActivityItem } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        let errorMessage = "API request failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // Response wasn't JSON
        }
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error) {
      console.error(`API request error [${endpoint}]:`, error);
      throw error;
    }
  }

  async checkHealth(): Promise<{ message: string }> {
    return this.request<{ message: string }>("/");
  }

  async predict(data: PredictionInput): Promise<PredictionResponse> {
    return this.request<PredictionResponse>("/predict", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getHistory(): Promise<HistoryItem[]> {
    return this.request<HistoryItem[]>("/history");
  }

  async getActivity(): Promise<ActivityItem[]> {
    return this.request<ActivityItem[]>("/activity");
  }
}

export const api = new ApiClient();
