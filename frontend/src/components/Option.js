/*import React, { Component } from "react";
import PropTypes from "prop-types";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
// import Radio from "@material-ui/core/Radio";
//import { Radio } from ' @material-ui/core';

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool
  };

  render() {
    const { _onSelect, value, style, isSelected, selectedStyle } = this.props;
    const defaultStyle = {
      color: "#0C7C00"
    };
    const appliedStyle =
      style && style.icon
        ? { ...defaultStyle, ...style.icon }
        : { ...defaultStyle };
        return
    return 
    // (
    //   <Radio
    //     type="radio"
    //     value={value}
    //     style={appliedStyle}
    //     checked={isSelected}
    //     onChange={() => _onSelect(value)}
    //   />
    // );
  }
}

class Option extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    _onSelect: PropTypes.func
  };

  componentDidMount() {
    const { _onSelect } = this.props;
    if (!_onSelect) {
      console.error("<Option /> must be wrapped in a <QuestionGroup /> ");
    }
  }
  render() {
    const { value, _isSelected, _onSelect, style, selectedStyle } = this.props;

    const defaultStyle = {
      boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
      margin: "5px 0",
      padding: "5px",
      display: "flex",
      alignItems: "center",
      backgroundColor: _isSelected ? "rgba(76,175,80,0.33)" : ""
    };
    const appliedStyle =
      style && style.option
        ? { ...defaultStyle, ...style.option }
        : { ...defaultStyle };

    return (
      <div
        style={
          _isSelected && selectedStyle && selectedStyle.option ? (
            { ...appliedStyle, ...selectedStyle.option }
          ) : (
            appliedStyle
          )
        }
      >
        <RadioIcon
          _onSelect={_onSelect}
          value={value}
          isSelected={_isSelected}
          selectedStyle={selectedStyle}
          style={style}
        />
        <label htmlFor={value} style={{ margin: "auto" }}>
          {this.props.children}
        </label>
      </div>
    );
  }
}

export default Option;*/