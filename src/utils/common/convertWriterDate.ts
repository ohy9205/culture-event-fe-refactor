import { convertKRTime } from "../common/convertKRTime";

export const convertWriterDate = (createdAt: string, updatedAt: string) => {
  const isUpdated = createdAt === updatedAt ? false : true;
  const date = isUpdated ? updatedAt : createdAt;
  const convertedtDate = convertKRTime(date);

  return isUpdated ? `${convertedtDate} (수정)` : `${convertedtDate}`;
};
