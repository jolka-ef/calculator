import { createContext, useContext, useReducer } from "react";
import { roundNumber } from "./utils/roundNumber";
import { evaluate } from "mathjs";
import { endsWithSign } from "./utils/endsWithSign";
import { endsWithNumber } from "./utils/endsWithNumber";

const ExpressionContext = createContext(null);

const ExpressionDispatchContext = createContext(null);

export function ExpressionProvider({ children }) {
  const [expression, dispatch] = useReducer(
    expressionReducer,
    initialExpression
  );

  return (
    <ExpressionContext.Provider value={expression}>
      <ExpressionDispatchContext.Provider value={dispatch}>
        {children}
      </ExpressionDispatchContext.Provider>
    </ExpressionContext.Provider>
  );
}

/**
 * Provides the current expression.
 */
export function useExpression() {
  return useContext(ExpressionContext);
}

/**
 * Provides the function that lets components dispatch actions.
 */
export function useExpressionDispatch() {
  return useContext(ExpressionDispatchContext);
}

/**
 * Returns new state.
 * @param {Object} action - responsible for changing the state.
 * @param {string} expression - the current state.
 */
function expressionReducer(expression, action) {
  switch (action.type) {
    case "clearData": {
      return "";
    }
    case "dotAdded": {
      if (expression.match(/\.{1}\d*$/)) {
        return expression;
      } else {
        return `${expression}.`;
      }
    }
    case "getOpposite": {
      const substraction = expression.match(/\d+%?-\d*\.?\d*%?$/);
      if (substraction) {
        if (expression.endsWith("%")) {
          return `${expression
            .slice(0, -1)
            .replace(/d*\.?\d+%?$/, (number) => +number * -1)}%`;
        } else {
          return expression.replace(/d*\.?\d+%?$/, (number) => +number * -1);
        }
      } else if (expression.endsWith("%")) {
        return `${expression
          .slice(0, -1)
          .replace(/-?\d*.?\d+$/, (number) => +number * -1)}%`;
      } else {
        return `${expression.replace(
          /-?\d*\.?\d+$/,
          (number) => +number * -1
        )}`;
      }
    }
    case "getResult": {
      try {
        return `${roundNumber(evaluate(expression))}`;
      } catch (e) {
        return expression;
      }
    }

    case "numberAdded": {
      return `${expression}${action.sign}`;
    }
    case "operandAdded": {
      if (expression.length === 0 || expression.endsWith(".")) {
        return expression;
      } else if (endsWithSign(expression.at(-1))) {
        return `${expression.slice(0, -1)}${action.sign}`;
      } else {
        return `${expression}${action.sign}`;
      }
    }
    case "percentAdded": {
      if (endsWithNumber(expression)) {
        return `${expression}%`;
      } else {
        return expression;
      }
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialExpression = "";
