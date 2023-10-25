import { CircleKeypad } from "./components/CircleKeypad";
import { Divide } from "./components/Divide";
import { Minus } from "./components/Minus";
import { Opposite } from "./components/Opposite";
import { Percent } from "./components/Percent";
import { Plus } from "./components/Plus";
import { Times } from "./components/Times";
import { useExpressionDispatch } from "./ExpressionContext";
import { ExpressionDisplayer } from "./components/ExpressionDisplayer";

export const Calculator = () => {
  const dispatch = useExpressionDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "getResult" });
  };
  return (
    <>
      <main>
        <form className="Calculator" onSubmit={handleSubmit}>
          <ExpressionDisplayer />

          <fieldset className="Calculator-operationsKeypad">
            <Plus />
            <Minus />
            <Times />
            <Divide />
          </fieldset>

          <fieldset>
            <CircleKeypad />
          </fieldset>

          <fieldset className="Calculator-operationsKeypad">
            <Opposite />
            <Percent />
          </fieldset>
        </form>
      </main>
    </>
  );
};
