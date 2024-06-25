import convertKRTime from "./convertKRTime";

const convertWriterDate = (createdAt: string, updatedAt: string) => {
  const isUpdated = createdAt === updatedAt ? false : true;
  const date = isUpdated ? updatedAt : createdAt;
  const convertedtDate = convertKRTime(date);

  return isUpdated ? `${convertedtDate} (수정)` : `${convertedtDate}`;
};

export default convertWriterDate;
