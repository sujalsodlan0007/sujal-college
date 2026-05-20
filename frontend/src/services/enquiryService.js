const enquiryService = {
  create: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id: Date.now(), ...data }), 800);
    });
  },

  getMyEnquiries: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([]), 500);
    });
  },
};

export default enquiryService;
