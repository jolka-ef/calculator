import { operandsAndCodes } from "./operationsData";

export const formatExpression = (expression) => {
  if (expression.length) {
    const regex = new RegExp(
      `[${Object.keys(operandsAndCodes).join("")}]`,
      "g"
    );
    return expression
      .replace(/(\d+[-+*/]{1})(?=([-+*/]{1}))/g, "$1(")
      .replace(/(\(.\d+)/g, "$1)")
      .replace(regex, (sign) => String.fromCharCode(operandsAndCodes[sign]));
  } else {
    return expression;
  }
};
