/**
 * Matching Engine for PropTech SaaS
 * Calculates match score between user preferences and development/unit
 */

export const calculateMatchScore = (userPrefs, development) => {
  if (!userPrefs) return 0;

  let score = 0;
  const weights = {
    location: 30,
    budget: 25,
    moveInDate: 20,
    bedrooms: 15,
    pets: 5,
    parking: 5
  };

  // Location Match (Simplified)
  if (userPrefs.location && development.address.city.toLowerCase() === userPrefs.location.toLowerCase()) {
    score += weights.location;
  }

  // Budget Match
  if (userPrefs.budget && development.minPrice <= userPrefs.budget) {
    score += weights.budget;
  }

  // Move-in Date Match (Simplified)
  if (userPrefs.moveInDate && development.availableFrom <= userPrefs.moveInDate) {
    score += weights.moveInDate;
  }

  // Bedrooms Match
  if (userPrefs.bedrooms) {
    // Assuming development has units, we check if any unit matches
    const hasMatchingBedrooms = development.units?.some(u => u.type.includes(userPrefs.bedrooms));
    if (hasMatchingBedrooms) score += weights.bedrooms;
  }

  // Pets Match
  if (userPrefs.pets === development.features?.petsAllowed) {
    score += weights.pets;
  }

  // Parking Match
  if (userPrefs.parking === development.features?.parking) {
    score += weights.parking;
  }

  return score;
};
