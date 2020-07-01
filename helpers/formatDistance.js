const formatDistance = (rawDistance) => {
  if (rawDistance < 1000) {
    return `${Math.round(rawDistance / 100) * 100}m`;
  }
  return `${Math.round(rawDistance / 1000)}km`;
};

export default formatDistance;
