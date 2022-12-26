import React from "react";
import LanguageContext from "../contexts/LanguageContext";

class Field extends React.Component {
  // hooking up the context to a class component
  // contextType is a special property name and needs to be called exactly that
  static contextType = LanguageContext;

  render() {
    const text = this.context === "english" ? "Name" : "Naam";

    return (
      <div className="ui field">
        <label>{text}</label>
        <input />
      </div>
    );
  }
}

// an alternate way of hooking up context to a class component
// Field.contextType = LanguageContext;

export default Field;
