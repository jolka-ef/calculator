import { useExpressionDispatch } from "../ExpressionContext";
import { timesCode } from "../utils/operationsData";

export const Times = () => {
  // Import expression dispatch function from the context returned by useReducer() .
  const dispatch = useExpressionDispatch();

  /**
   * A callback that handles multiplication.
   * @param {!Event} event The event associated with the click.
   */
  const handleClick = (event) => {
    event.preventDefault();
    dispatch({ type: "operandAdded", sign: "*" });
  };

  return (
    <button className="OperationsKeypad-button" onClick={handleClick}>
      {String.fromCharCode(timesCode)}
    </button>
  );
};
