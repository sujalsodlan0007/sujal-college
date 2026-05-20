import api from "./api";

const authService = {
  login: async (email, password) => {
    // Mocking API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: 1, name: "John Doe", email, role: "user" },
          token: "mock-jwt-token",
        });
      }, 1000);
    });
  },

  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: 1, ...userData, role: "user" },
          token: "mock-jwt-token",
        });
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },
};

export default authService;
