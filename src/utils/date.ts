export const convertKRTime = (dateTime: string): string => {
  const utcDate = new Date(dateTime);
  const krDate = utcDate.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  return krDate;
};
