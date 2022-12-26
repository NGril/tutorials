import React from "react";
import LanguageContext from "../contexts/LanguageContext";
import ColorContext from "../contexts/ColorContext";

class Button extends React.Component {
  renderButton(color) {
    return (
      <button className={`ui button ${color}`}>
        {/* the context consumer needs to be passed a function, the first argument is the current value held in the context */}
        <LanguageContext.Consumer>
          {(value) => (value === "english" ? "Submit" : "Voorleggen")}
        </LanguageContext.Consumer>
      </button>
    );
  }

  render() {
    return (
      <ColorContext.Consumer>
        {(color) => this.renderButton(color)}
      </ColorContext.Consumer>
    );
  }
}

export default Button;
