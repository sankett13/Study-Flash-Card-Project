import { api } from "./api";

// Deck API

export const deckAPI = {
  getAll: () => api.get("/decks"),
  getOne: (id: string) => api.get(`/decks/${id}`),
  create: (data: { title: string; description?: string }) =>
    api.post("/decks", data),
  update: (id: string, data: { title: string; description?: string }) =>
    api.put(`/decks/${id}`, data),
  delete: (id: string) => api.delete(`/decks/${id}`),
};
