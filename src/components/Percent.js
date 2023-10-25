import { useExpressionDispatch } from "../ExpressionContext";
import { percentCode } from "../utils/operationsData";
export const Percent = () => {
  // Import expression dispatch function from the context returned by useReducer() .
  const dispatch = useExpressionDispatch();

  /**
   * A callback that handles adding percent sign.
   * @param {!Event} event The event associated with the click.
   */
  const handleClick = (event) => {
    event.preventDefault();
    dispatch({ type: "percentAdded" });
  };

  return (
    <button className="OperationsKeypad-button" onClick={handleClick}>
      {String.fromCharCode(percentCode)}
    </button>
  );
};
