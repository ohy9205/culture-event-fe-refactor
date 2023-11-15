export const getFormattedPeriod = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {
    startDate: `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`,
    endDate: `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`,
  };
};

export const getFormattedTime = (originDate: string) => {
  const date = new Date(originDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};
