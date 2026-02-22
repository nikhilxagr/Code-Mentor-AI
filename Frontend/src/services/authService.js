import api from "./api";

const persistSession = (payload) => {
  if (payload?.token) {
    localStorage.setItem("token", payload.token);
  }
  if (payload?.user) {
    localStorage.setItem("user", JSON.stringify(payload.user));
  }
};

const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    persistSession(response.data);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    persistSession(response.data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  }
};

export default authService;
