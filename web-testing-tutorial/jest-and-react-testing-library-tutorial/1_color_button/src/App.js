import { useState } from "react";
import "./App.css";

// this function is used to demonstrate when to write unit tests
export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

// most of this component is used to demonstrate functional testing
function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [disabled, setDisabled] = useState(false);

  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  return (
    <div>
      <button
        style={{ backgroundColor: disabled ? "grey" : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {newButtonColor}
      </button>

      <input
        type="checkbox"
        id="disable-button-checkbox"
        onChange={(e) => setDisabled(e.target.checked)}
        defaultChecked={disabled}
        aria-checked={disabled}
      />
      <label htmlFor="disable-button-checbox">Disable button</label>
    </div>
  );
}

export default App;
