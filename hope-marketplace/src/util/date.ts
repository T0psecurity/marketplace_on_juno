export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const convertDateToString = (
  input: Date | string,
  callback?: (year: number, month: number, date: number) => string
): string => {
  const targetDate = input ? new Date(input) : new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const date = targetDate.getDate();
  if (callback) return callback(year, month, date);
  return `${date} ${MONTHS[month]} ${year}`;
};

export const compareDate = (
  date1: string | Date,
  date2: string | Date
): 1 | 0 | -1 => {
  const dateString1 = String(date1);
  const dateString2 = String(date2);
  const converted1 = new Date(dateString1);
  const converted2 = new Date(dateString2);
  if (converted1 > converted2) return 1;
  if (converted2 > converted1) return -1;
  return 0;
};
