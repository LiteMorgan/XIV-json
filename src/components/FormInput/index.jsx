import React, { Component } from 'react';


export default class FormInput extends Component {
  /**
   * @function constructor
   */
  constructor(props) {
    super(props);

    this.id          = this.props.id;
    this.label       = this.props.label;
    this.type        = this.props.type || 'text';
    this.placeholder = this.props.placeholder;
    this.update      = this.props.update;
  };

  handleChange = event => {
    this.update(this.id, event.target.value);
  }


  /**
   * @function render
   */
  render() {
    return(
      <div className="form-group row">
        <label htmlFor={this.id}
               className="">
          <small>{this.label}</small>
        </label>
        <input type={this.type}
               className="form-control"
               id={this.id}
               placeholder={this.placeholder}
               onChange={this.handleChange}
        />
      </div>
    )
  };
}