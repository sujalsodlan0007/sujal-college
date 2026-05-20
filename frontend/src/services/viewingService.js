const viewingService = {
  create: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id: Date.now(), ...data }), 800);
    });
  },

  getMyViewings: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([]), 500);
    });
  },
};

export default viewingService;
