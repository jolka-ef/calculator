import { useExpressionDispatch } from "../ExpressionContext";
import { plusCode } from "../utils/operationsData";

export const Plus = () => {
  // Import expression dispatch function from the context returned by useReducer() .
  const dispatch = useExpressionDispatch();

  /**
   * A callback that handles addition.
   * @param {!Event} event The event associated with the click.
   */
  const handleClick = (event) => {
    event.preventDefault();
    dispatch({ type: "operandAdded", sign: "+" });
  };

  return (
    <button className="OperationsKeypad-button" onClick={handleClick}>
      {String.fromCharCode(plusCode)}
    </button>
  );
};
