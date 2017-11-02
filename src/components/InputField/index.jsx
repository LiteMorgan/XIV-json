import React, { Component } from 'react';
import base64               from 'base-64';
import FormInput            from './../FormInput';
import FormSelect           from './../FormSelect';


import './InputField.css';


export default class InputField extends Component {
  /**
   * @function constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      data: {
        buy_currency:     null,
        buy_cost:         null,
        craftable: {
          craft_level:    null,
          is_specialist:  false,
          mastery:        null,
          stars:          null,
        },
        description:      "",
        help:             "",
        id:               0,
        is_crafted:       false,
        is_untradable:    false,
        materials: [
          {
            icon:         null,
            name:         null,
            quantity:     null,
            url_xivdb:    null
          }
        ],
        name:             "",
        patch:            "",
        sort_category:    0,
        sort_number:      0,
        tags:             [0],
        url_preview:      "",
        url_xivdb:        ""
      },
      JSONCategories: [],
      JSONData:       [],
      JSONPatches:    [],
      JSONTags:       [],
    }
  };


  componentWillMount() {
    this.props.stateChanges(this.state.data);
  }


  componentDidMount() {
    // Set the API Requests to execute
    const fetchCategories = this.fetchGithub('xivorchestrion', 'src/_data/categories.json');
    const fetchData       = this.fetchGithub('xivorchestrion', 'src/_data/orchestrionRolls.json');
    const fetchPatches    = this.fetchGithub('xivorchestrion', 'src/_data/patches.json');

    // Make all API Requests and save to state
    Promise.all([fetchCategories, fetchData, fetchPatches])
      .then(values => {
        this.setState({
          JSONCategories: values[0],
          JSONData:       values[1],
          JSONPatches:    values[2],
        });
      })
  };


  /**
   * @function fetchGuthub
   * Make fetch request to Github API and save content to state
   * @param (string) repo:
   * @param (string) path:
   * @param (string) user:
   */
  fetchGithub = (repo, path, user = 'getignited') => {
    return fetch(`https://api.github.com/repos/${user}/${repo}/contents/${path}`)
      .then(response => response.json())
      .then(json => {
        let result = JSON.parse(base64.decode(json.content));
        return result;
      })
  };


  updateState = (state, value) => {
    const existingObj = this.state.data;
    const newObj = {};
    newObj[state] = value;
    Object.assign(existingObj, newObj);

    this.setState({data: existingObj}, () => {
      this.props.stateChanges(this.state.data);
    });
  };


  /**
   * @function render
   */
  render() {
    
    return(
      <main className="InputField">
        <div className="InputField__inner">
          <form className="container">
            <FormInput id="id"
                       label="ID Number"
                       type="number"
                       placeholder="000"
                       update={this.updateState}
            />
            <FormInput id="name"
                       label="Title"
                       placeholder="What's the song name?"
                       update={this.updateState}
            />
            <FormInput id="description"
                       label="Description"
                       placeholder="Where does the song play?"
                       update={this.updateState}
            />
            <FormInput id="help"
                       label="Help Text"
                       placeholder="How do I obtain the song?"
                       update={this.updateState}
            />
            <FormInput id="url_preview"
                       label="Preview URL"
                       placeholder="URL to preview the song"
                       update={this.updateState}
            />
            <FormSelect id="sort_category"
                        label="Category"
                        options={this.state.JSONCategories}
                        update={this.updateState}
                        resultNumber={true}
            />
            <FormInput id="sort_number"
                       label="Category Order"
                       type="number"
                       placeholder="What is the song number in the category?"
                       update={this.updateState}
            />
            <p className="row">
              Tags
            </p>
            <FormSelect id="patch"
                        label="Patch"
                        options={this.state.JSONPatches}
                        update={this.updateState}
            />
            <p className="row">
              Marketboard friendly?
            </p>
            <p className="row">
              Currency Junk
            </p>
            <p className="row">
              Materials junk
            </p>
          </form>
        </div>
      </main>
    )
  };
}