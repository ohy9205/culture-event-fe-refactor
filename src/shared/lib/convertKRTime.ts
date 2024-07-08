const convertKRTime = (dateTime: string): string => {
  const regx = /^(\d{4})\.(\d{2})\.(\d{2})$/;
  let formattedDate;

  if (regx.test(dateTime.slice(0, 10))) {
    formattedDate =
      dateTime.slice(0, 10).replace(/\./g, "-") + dateTime.slice(10);
  } else {
    formattedDate = dateTime;
  }

  const utcDate = new Date(formattedDate);
  const krDate = utcDate.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // 오전/오후 표시
  });
  return krDate;
};

export default convertKRTime;
