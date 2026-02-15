import { api } from "./api";

// Card API
export const cardAPI = {
  getByDeck: (deckId: string) => api.get(`/cards/deck/${deckId}`),
  getDue: (deckId: string) => api.get(`/cards/deck/${deckId}/due`),
  create: (data: {
    front: string;
    back: string;
    deckId: string;
    imageUrl?: string;
    imageKeyword?: string;
  }) => api.post("/cards", data),
  update: (
    id: string,
    data: {
      front?: string;
      back?: string;
      imageUrl?: string;
      imageKeyword?: string;
    },
  ) => api.put(`/cards/${id}`, data),
  delete: (id: string) => api.delete(`/cards/${id}`),
  rate: (id: string, rating: number) =>
    api.post(`/cards/${id}/rate`, { rating }),
};
