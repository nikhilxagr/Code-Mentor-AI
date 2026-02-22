import api from "./api";

const problemService = {
  analyze: async (problemNumber) => {
    const response = await api.post("/analyze", { problemNumber });
    return response.data;
  },

  analyzeComplexity: async ({ code, language }) => {
    const response = await api.post("/tools/complexity", { code, language });
    return response.data;
  },

  reviewCode: async ({ code, language }) => {
    const response = await api.post("/tools/debug", { code, language });
    return response.data;
  },

  optimizeCode: async ({ code, language }) => {
    const response = await api.post("/tools/optimize", { code, language });
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get("/history");
    return response.data;
  },

  getStats: async () => {
    const response = await api.get("/stats");
    return response.data;
  }
};

export default problemService;
