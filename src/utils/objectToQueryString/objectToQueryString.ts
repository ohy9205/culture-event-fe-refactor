export const objectToQueryString = (obj: Record<string, any>) => {
  return Object.keys(obj)
    .map(
      // (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      (key) =>
        obj[key] !== "" || !undefined ? `${key}=${obj[key]}` : undefined
    )
    .join("&");
};
