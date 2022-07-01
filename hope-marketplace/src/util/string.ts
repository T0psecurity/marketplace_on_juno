export const convertNumberToString = (number: number): string => {
  return number.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
};

export const addSuffix = (number: number): string => {
  if (number >= 1e5) return `${convertNumberToString(number / 1e6)}M`;
  if (number >= 1e3) return `${convertNumberToString(number / 1e3)}K`;
  return convertNumberToString(number);
};
