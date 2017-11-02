import React, { Component } from 'react';

import './CodeWindow.css';


export default class CodeWindow extends Component {

  /**
   * @function stringReplace
   * Based on the 'Pretty Print JSON Data in Color' fiddle at https://jsfiddle.net/unLSJ
   */
  stringReplace = (match, pIndent, pKey, pVal, pEnd) => {
    const key = '<span class="json-key">';
    const val = '<span class="json-value">';
    const str = '<span class="json-string">';
    let r = pIndent || '';

    if (pKey)
      r = r + key + pKey.replace(/[: ]/g, '') + '</span>: ';
    if (pVal)
      r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
    return r + (pEnd || '');
  };


  /**
   * @function prettyPrint
   * Based on the 'Pretty Print JSON Data in Color' fiddle at https://jsfiddle.net/unLSJ
   */
  prettyPrint = obj => {
    const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    return JSON.stringify(obj, null, 2)
      .replace(/&/g, '&amp;')
      .replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(jsonLine, this.stringReplace);
  };


  render() {
    const prettyPrintJSON =  {__html: this.prettyPrint(this.props.code)};

    return (
      <pre className="">
        <code dangerouslySetInnerHTML={prettyPrintJSON} />
      </pre>
    )
  }
}