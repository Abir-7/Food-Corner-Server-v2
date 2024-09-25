export const preprocessQueries = (queries: Record<string, unknown>) => {
  const processedQueries = { ...queries };

  // Convert 'availableFor.lunch' to boolean
  if (processedQueries["availableFor.lunch"] === "true") {
    processedQueries["availableFor.lunch"] = true;
  }
  if (processedQueries["availableFor.dinner"] === "true") {
    processedQueries["availableFor.dinner"] = true;
  }
  if (processedQueries["availableFor.breakfast"] === "true") {
    processedQueries["availableFor.breakfast"] = true;
  }
  return processedQueries;
};
