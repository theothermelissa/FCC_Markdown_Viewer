import React, { Component } from 'react';
// import './App.css';
import marked from 'marked/marked.min.js';

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = (href, title, content) => {
  return `<a target="_blank" href="${href}">${content}</a>`
};

const placeholder = `
  # Aloha! Here's a heading for you.

  ## And a sub-heading.
  ### With a sub-sub, even. Fancy!

  How about code? (Don't forget the backticks!)

  \`fries = (potato) => potato + heat + fat + salt\`

  Multi-line code? No problem. 

  \`\`\`
  function compareThese(this, that) {
    if (this === that) {
      return "Match."
    } else {
      return "Nope!"
    }
  };
  \`\`\`

  You can add images: 

  ![Pic of Potatoes](https://cdn0.wideopeneats.com/wp-content/uploads/2018/05/potatoes.jpg)

  Text can be **bold**, or _emphasized_, or even ~~stricken through~~. You can add [links](http://google.com), too.

  >Or make block quotes, saying rather little but at great length.
  --Somebody Important, Probably.

  - you can
  - also have
  - lists
    - even nested ones

  1. heck, you can 
  1. also do
  1. numbered lists --
    1. even if you forget
    1. how to count
  1. for some reason
`;

const Editor = (props) => {
  return (
    <textarea 
      className="input"
      id="editor"
      value={props.userInput}
      onChange={props.onChange}
      type="text" />
  )
};

class Preview extends React.Component {
  
  renderMarkup() {
    return {__html: marked(this.props.userInput)}
  }

  render() {
    return (
      <div id="preview" className="preview" dangerouslySetInnerHTML={this.renderMarkup()}></div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: placeholder,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(newInput) {
    this.setState({
      userInput: newInput.target.value
    });
  }
  render() {
    return (
      <div className="container">
        <h1 className="title">Markdown Viewer</h1>
        <div className="titleBar">Type Your Markdown Here:</div>
        <Editor userInput={this.state.userInput} onChange={this.handleChange} />
        <div className="titleBar">Here's your preview:</div>
        <Preview userInput={this.state.userInput} />
      </div>
    )
  }
};

export default App;
