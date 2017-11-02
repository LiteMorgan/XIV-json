import React, { Component } from 'react';


export default class FormSelect extends Component {
  /**
   * @function constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    }

    this.id          = this.props.id;
    this.label       = this.props.label;
    this.options     = this.props.options;
    this.update      = this.props.update;
    this.result      = this.props.resultNumber;
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps.options) {
      this.setState({options: nextProps.options});
    }
  }

  handleChange = event => {
    let value = this.result ? Number(event.target.value) : event.target.value;
    
    this.update(this.id, value);
  }


  /**
   * @function render
   */
  render() {
    return(
      <div className="form-group row">
        <label htmlFor={this.id}
               className="text-right">
          <small>{this.label}</small>
        </label>
        <select className="custom-select form-control"
                id={this.id}
                onChange={this.handleChange}
        >
          {
            this.state.options.map((option) => {
              return (
                <option key={option.id}
                        value={option.number || option.id}
                >
                  {option.name}
                </option>
              )
            })
          }
        </select>
      </div>
    )
  };
}