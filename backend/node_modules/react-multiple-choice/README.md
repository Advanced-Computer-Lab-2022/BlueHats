# react-multiple-choice
React-multiple-choice is a super customizable library of components to easily add a multiple choice form to your application. Access to the individual components of the form gives you full control of what is rendered in your application.

NOTE: If you were using version 1.x.x please upgrade to version 2.0.0 that supports the full API.
# Installation and usage
The easiest way to use react-multiple-choice is to install it from npm and build it into your app with webpack.
`npm install react-multiple-choice`

React-multiple-choice gives you all of the components you need to build out your form. Let's dive into those components.

# Components
## Test
`import { Test } from react-multiple-choice`

The test component is a wrapper for your form, all other components must be wrapped in a Test.

#### Props

`onOptionSelect` - Function - A function that returns the an object containing the question number as the keys and the selected option's value as the value.
NOTE: If the user has not selected an option for a question, that question number will not appear in the return value of `onOptionSelect`

`Style` - Object

ex. `<Test onOptionSelect={selectedOptions => console.log(selectedOptions)} />`

## QuestionGroup
`import { QuestionGroup } from react-multiple-choice`

The QuestionGroup component is a wrapper for each individual question. It wraps the question and options.

#### Props
`questionNumber` - Integer - This will be the key provided by the `Test` component's `onOptionSelect` return value.

`Style` - Object

## Question
`import { Question } from react-multiple-choice`

The Question component is a just a wrapper to display the question.

#### Props
`Style` - Object

## Option
`import { Option } from react-multiple-choice`

The Option component is a wrapper for all of the options for each question.

#### Props
`Value` - string - This will be the value provided by the `Test` component's `onOptionSelect` return value.

`Style` - Object - This is the only style that is different from the others. This prop is a nested object containing an icon object and an option object. This allows you to style both the container of the option and the radio icon.
ex. 
```
<Option style={{
    icon: {
      color: "chartreuse"
    }, 
    option: {
      width: "100%"
    }
  }} />
```

# Example Usage
```
import React from 'react';
import { render } from 'react-dom';
import { Test, QuestionGroup, Question, Option } from 'react-multiple choice';

class App extends React.Component {
  state = {
    selectedOptions: {}
  };
  render() {
    return (
        <Test onOptionSelect={selectedOptions => this.setState({ selectedOptions })}>
          <QuestionGroup questionNumber={0}>
            <Question>What's your favorite food?</Question>
            <Option value="0">Mac n Cheese</Option>
            <div>Add some additional info or tooltips for specific questions</div>
            <Option value="1">Steak</Option>
            <Option value="2">Sushi</Option>
            <Option value="3">Pad Thai</Option>
          </QuestionGroup>
        </Test>
    );
  }
}
render(<App />, document.getElementById("root"));
```

See a full live demo [here](https://wcrozier12.github.io/react-multiple-choice/)

# Styles
All of the components above accept a style prop that will allow you to fully customize the style of any of the components. Please see the Option component documentation for how to style the radio icon and option container.

