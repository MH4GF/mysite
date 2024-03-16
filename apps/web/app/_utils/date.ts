export const compareDesc = (dateLeft: Date, dateRight: Date): number => {
  const timeLeft = dateLeft.getTime();
  const timeRight = dateRight.getTime();

  if (timeLeft > timeRight) {
    return -1;
  }

  if (timeLeft < timeRight) {
    return 1;
  }

  return 0;
};

export const format = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
};
