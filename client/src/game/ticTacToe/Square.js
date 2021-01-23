import React, { Component } from "react";

export default class Square extends Component {
  render() {
    let className = ['square'];

    if (this.props.value !== null) {
      className.push('square-' + this.props.value);
    }

    return (
      <button
        className={className.join(' ')}
        onClick={() => this.props.onClick()}
      ></button>
    );
  }
}

