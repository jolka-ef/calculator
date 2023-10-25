export const roundNumber = (number, places = 4) =>
  Math.round(number * 10 ** places) / 10 ** places;
