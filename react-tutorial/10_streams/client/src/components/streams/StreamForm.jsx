import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  /*
  - this is a bit hard to understand because redux-form is doing a lot of things behind the scenes
  - basically we are passing the form props to this renderInput method and descturing the input attribute from them
  - then, instead of manually assigning each key value from the input prop to the <input> HTML element we can use the 
  shortened syntax which makes use of desctructuring, {...input}
  - this will automatically assign all the appropriate input prop values to html attributes (onChange, value...)
  */
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      /*
      - usually we would just pass our onSubmit event handler to the onSubmit <form> attribute
      - when using redux-form we pass it the predefined redux-form property of handleSubmit and then pass our user defined function to that prop
      - the onSubmit function that we define takes in the actual form values as arguments in that case, so we would see the values we enetered in the title and the description fields here
      - also we don't need to call event.preventDefault() now, which is a bonus
      */
      <form
        // we need this error class name so semantic ui knows it needs to show the errors, by default it has display:none set on error messages
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validate,
})(StreamForm);
