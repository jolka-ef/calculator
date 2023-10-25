import { useExpressionDispatch } from "../ExpressionContext";
import { plusMinusCode } from "../utils/operationsData";

export const Opposite = () => {
  // Import expression dispatch function from the context returned by useReducer() .
  const dispatch = useExpressionDispatch();

  /**
   * A callback that handles opposite of a number.
   * @param {!Event} event The event associated with the click.
   */
  const handleClick = (event) => {
    event.preventDefault();
    dispatch({ type: "getOpposite" });
  };

  return (
    <button className="OperationsKeypad-button" onClick={handleClick}>
      {String.fromCharCode(plusMinusCode)}
    </button>
  );
};
