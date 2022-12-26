/*import React from "react";
import { QuestionGroup } from "./index";

class Test extends React.Component {
  answers = {};

  cacheAnswers = (activeValue, questionNumber) => {
    this.answers[questionNumber] = activeValue;
    this.props.onOptionSelect && this.props.onOptionSelect(this.answers);
  };
  render() {
    const { style } = this.props;
    const defaultStyle = { display: "inline-block", width: "30%" };
    const appliedStyle = style
      ? { ...defaultStyle, ...style }
      : { ...defaultStyle };

    const children = React.Children.map(this.props.children, child => {
      if (child.type === QuestionGroup) {
        return React.cloneElement(child, {
          _onChange: (activeValue, activeQuestionNumber) =>
            this.cacheAnswers(activeValue, activeQuestionNumber)
        });
      } else {
        return child;
      }
    });
    return <div style={appliedStyle}>{children}</div>;
  }
}

export default Test;*/