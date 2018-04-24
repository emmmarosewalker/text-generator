import React, { Component } from 'react';
import axios from 'axios';
import { Input } from './Input.js';
import { Card } from './Card.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      numParagraphs : 1,
      text : 'Change above selections to generate text',
      returnType : 'html'
    };
    this.handleChange = this.handleChange.bind(this);
    this.getApi = this.getApi.bind(this);
  }
  handleChange(val, isNum){
    /* The onChange handler in the child component tells us if the input change was for the num of paragraphs, 
    or the preferred response type. This tells us which state should be updated */
    if (isNum){
      this.setState(
        { numParagraphs : val }, 
        this.getApi(val, isNum) // Callback
        );
    } 
    else {
      this.setState(
        { returnType : val },
        this.getApi(val, isNum) // Callback
        );
    }
  }
  getApi(val, isNum){
    /* Uses val (the input the user selected, either num. paragraphs or return type) and the isNum boolean (true if number
    of paragraphs was changed) to set parameters to make a get request to the Bacon Ipsum API using axios. The response sets the state of the
    text, after which React automatically re-renders the output with the changed state. */

    let params = {
      type : 'meat-and-filler' // from Bacon Ispum API. Docs : all-meat for meat only or meat-and-filler for meat mixed with miscellaneous ‘lorem ipsum’ filler.
    };

    // Check if the value was from changing no. paragraphs or html/plain text. Set API params accordingly
    isNum ? params['paras'] = val : params['paras'] = this.state.numParagraphs;
    isNum ? params['format'] = this.state.returnType : params['format'] = val;

    // API call
    const apiUrl = "https://baconipsum.com/api";
    axios.get(apiUrl, {
      params
    })
    .then((response) => {
      this.setState({
        text : response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  render() {
    return (
      <div className="jumbotron col-8 m-auto" style={{color: 'white'}}>
      <h1>Bacon Ipsum Generator</h1>
      <Input onChange={this.handleChange} />
      <Card cardContent={this.state.text} />
      <p>This generator is based on the <a href="https://baconipsum.com/json-api/">Bacon Ipsum API</a></p> // Credit to original API author
      </div>
      );
  }
}
export default App;
