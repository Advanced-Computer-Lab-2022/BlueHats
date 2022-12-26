/*import React from "react";
import PropTypes from "prop-types";
import Option from "./Option";
import QuestionGroup from "./QuestionGroup";
import Question from "./Question";

class MultipleQuestions extends React.Component {
  static propTypes = {
    questions: PropTypes.array.isRequired,
    getAnswers: PropTypes.func
  };

  answers = {};

  cacheAnswers = (activeValue, questionNumber) => {
    this.answers[questionNumber] = activeValue;
    this.props.getAnswers && this.props.getAnswers(this.answers);
  };
  render() {
    const { questions } = this.props;
    return (
      <div>
        {questions.map((question, i) => {
          const options = questions[i].options.map((option, index) => {
            return <Option value={index.toString()}>{option}</Option>;
          });

          return (
            <React.Fragment>
              <Question>{question.question}</Question>
              <QuestionGroup
                questionNumber={i}
                onChange={(activeValue, activeQuestionNumber) =>
                  this.cacheAnswers(activeValue, activeQuestionNumber)}
              >
                {options}
              </QuestionGroup>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default MultipleQuestions;*/