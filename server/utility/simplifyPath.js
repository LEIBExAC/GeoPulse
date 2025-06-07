exports.simplifyPath = (locations, maxPoints) => {
  if (locations.length <= maxPoints) return locations;

  const step = Math.floor(locations.length / maxPoints);
  const simplified = [];

  for (let i = 0; i < locations.length; i += step) {
    simplified.push(locations[i]);
  }

  // Ensure last point is included
  if (simplified[simplified.length - 1] !== locations[locations.length - 1]) {
    simplified.push(locations[locations.length - 1]);
  }

  return simplified;
};
