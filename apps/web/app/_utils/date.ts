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
