const unitService = {
  getByDevelopment: async (developmentId) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([]), 500);
    });
  },
};

export default unitService;
