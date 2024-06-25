export const replaceObjectKey = (
  obj: Record<any, any>,
  key: string,
  replaceValue: any
) => {
  return { ...obj, [key]: replaceValue };
};

export const deleteObjectKeys = (obj: Record<any, any>, keys: string[]) => {
  const copy = { ...obj };
  keys.forEach((key) => {
    delete copy[key];
  });
  return copy;
};

export const objectToQueryString = (
  obj: Record<string, any>,
  separator: string
) => {
  return Object.keys(obj)
    .map((key) =>
      obj[key] !== "" || !undefined ? `${key}=${obj[key]}` : undefined
    )
    .join(separator);
};
