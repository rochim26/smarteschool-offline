import React from "react";
import ReactiveButton from "reactive-button";

const Button = ({ variant, buttonText, state, ...rest }) => {
  if (variant == "danger") {
    return (
      <ReactiveButton
        buttonState={state}
        idleText={buttonText}
        errorText="Gagal"
        className="btn btn-danger bg-danger bg-gradient rounded-pill px-4"
        {...rest}
      />
    );
  } else if (variant == "success") {
    return (
      <ReactiveButton
        buttonState={state}
        idleText={buttonText}
        errorText="Gagal"
        className="btn btn-success bg-success bg-gradient rounded-pill px-4"
        {...rest}
      />
    );
  } else if (variant == "secondary") {
    return (
      <ReactiveButton
        buttonState={state}
        idleText={buttonText}
        errorText="Gagal"
        className="btn btn-secondary bg-secondary bg-gradient rounded-pill px-4"
        {...rest}
      />
    );
  } else if (variant == "primary") {
    return (
      <ReactiveButton
        buttonState={state}
        type="submit"
        idleText={buttonText}
        errorText="Gagal"
        className="btn btn-primary bg-primary bg-gradient rounded-pill px-4"
        {...rest}
      />
    );
  }
};

export default Button;
