import { api } from "./api";

export const aiAPI = {
  generate: (deckId: string, content: string) =>
    api.post("/ai/generate", { deckId, content }),
};
