import React, { useEffect, useRef } from "react";
import { useExpression, useExpressionDispatch } from "../ExpressionContext";
import { formatExpression } from "../utils/formatExpression";

export const ExpressionDisplayer = () => {
  // Import expression dispatch function from the context returned by useReducer() .
  const dispatch = useExpressionDispatch();

  // Import current expression from the context.
  const expression = useExpression();

  /**
   * Creates a ref object to access DOM input.
   */
  const inputRef = useRef(null);

  /**
   * Calls focus method on DOM input.
   */
  const focus = () => inputRef.current.focus();

  /**
   * Adds event handlers to the document.
   */
  useEffect(() => {
    document.addEventListener("keydown", focus);
    return () => {
      document.removeEventListener("keydown", focus);
    };
  }, []);

  /**
   * A callback that handles backspace and enter clicks on the keyboard.
   * @param {!Event} event The event associated with the click.
   */
  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch({ type: "getResult" });
    }
  };

  /**
   * A callback that handles clicks on the keyboard.
   * @param {!Event} event The event associated with the click.
   */
  const handleChange = (event) => {
    const sign = event.target.value.slice(-1);
    const dot = sign === ".";
    const number = !isNaN(sign);
    const percent = sign === "%";
    const operand = /[-+*/]/.test(sign);
    switch (true) {
      case dot:
        dispatch({ type: "dotAdded" });
        break;
      case number:
        dispatch({ type: "numberAdded", sign: sign });
        break;
      case percent:
        dispatch({ type: "percentAdded" });
        break;
      case operand:
        dispatch({ type: "operandAdded", sign: sign });
        break;
      default:
        console.log("not math sign");
    }
  };

  return (
    <>
      <input
        autoFocus
        className="Calculator-displayer"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={formatExpression(expression)}
      />
    </>
  );
};
