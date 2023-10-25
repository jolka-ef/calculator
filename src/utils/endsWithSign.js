import { operandsAndCodes } from "./operationsData";

export const endsWithSign = (character) => {
  return !!(Object.keys(operandsAndCodes).indexOf(character) + 1);
};
