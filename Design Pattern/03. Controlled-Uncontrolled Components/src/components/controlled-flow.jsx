import React, { useState } from "react";

export const ControlledFlow = ({ children, onDone, currentStepIndex, onNext }) => {
  const next = (data) => {
    onNext(data);
  };

  if (React.Children.toArray(children).length <= currentStepIndex) {
    onDone("Done");
  }

  const currentChild = React.Children.toArray(children)[currentStepIndex];

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { next });
  }

  return currentChild;
};
