import { useExpressionDispatch } from "../ExpressionContext";

export const CircleKeypad = () => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const circleKeypad = [...digits, ".", "C"];

  // Import expression dispatch function from the context returned by useReducer() .
  const dispatch = useExpressionDispatch();

  /**
   * A callbacks that handles clicks on the circle keypad buttons.
   * @param {!Event} event The event associated with the click.
   * @param {number|string} sign The character to put in expression displayer.
   */
  const handleClick = (event, sign) => {
    event.preventDefault();
    switch (sign) {
      case ".":
        dispatch({ type: "dotAdded" });
        break;
      case "C":
        dispatch({ type: "clearData" });
        break;
      default:
        dispatch({ type: "numberAdded", sign: `${sign}` });
    }
  };
  /**
   * A callback that handles evaluating the expression.
   * @param {!Event} event The event associated with the click.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "getResult" });
  };

  return (
    <ul
      className="Calculator-circleKeypad"
      style={{ "--numberOfItems": `${circleKeypad.length}` }}
    >
      {circleKeypad.map((sign, index) => (
        <li
          className="CircleKeypad-item "
          key={index}
          style={{ "--index": `${index - 1}` }}
        >
          <button
            className="CircleKeypad-button"
            onClick={(event) => handleClick(event, sign)}
          >
            <>{sign}</>
          </button>
        </li>
      ))}
      <li
        className="CircleKeypad-centerItem SquareItem KeypadItem"
        key={circleKeypad.length + 1}
      >
        <button className="CircleKeypad-button" onClick={handleSubmit}>
          =
        </button>
      </li>
    </ul>
  );
};
