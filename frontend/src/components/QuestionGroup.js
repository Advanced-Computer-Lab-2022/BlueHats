/*import React from "react";
import PropTypes from "prop-types";
import Option from "./Option";
class QuestionGroup extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string
  };

  state = {
    activeValue: this.props.defaultValue
  };

  componentDidMount() {
    const { _onChange } = this.props;
    if (!_onChange) {
      console.error(
        "No onChange handler provided to <QuestionGroup />. Check that your <QuestionGroup /> is wrapped in a <Test /> "
      );
    }
  }

  handleSelect = value => {
    this.setState({ activeValue: value }, () => {
      this.props._onChange &&
        this.props._onChange(this.state.activeValue, this.props.questionNumber);
    });
  };
  render() {
    const { style } = this.props;
    const defaultStyle = {
      flexDirection: "column",
      display: "flex"
    };

    const appliedStyle = style
      ? { ...style, ...defaultStyle }
      : { ...defaultStyle };
    const children = React.Children.map(this.props.children, child => {
      if (child.type === Option) {
        return React.cloneElement(child, {
          _isSelected: this.state.activeValue === child.props.value,
          _onSelect: value => this.handleSelect(value)
        });
      } else {
        return child;
      }
    });
    return <div style={appliedStyle}>{children}</div>;
  }
}

export default QuestionGroup;*/