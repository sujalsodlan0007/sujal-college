const developments = [
  {
    id: 1,
    slug: "the-summit",
    name: "The Summit",
    location: "Manchester, UK",
    price_from: 1200,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    status: "available",
    match_score: 95,
  },
  {
    id: 2,
    slug: "riverside-plaza",
    name: "Riverside Plaza",
    location: "London, UK",
    price_from: 2500,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    status: "coming_soon",
    match_score: 88,
  },
  {
    id: 3,
    slug: "skyline-towers",
    name: "Skyline Towers",
    location: "Birmingham, UK",
    price_from: 1500,
    image: "https://images.unsplash.com/photo-1460317442991-0ec239f636a7?q=80&w=1000&auto=format&fit=crop",
    status: "available",
    match_score: 92,
  }
];

const developmentService = {
  getFeatured: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(developments), 800);
    });
  },

  getAll: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(developments), 1000);
    });
  },

  getBySlug: async (slug) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = developments.find(d => d.slug === slug);
        if (item) resolve(item);
        else reject(new Error("Development not found"));
      }, 500);
    });
  },
};

export default developmentService;
