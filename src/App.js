import React, { Component } from 'react';

import './App.css';


class App extends Component {

  constructor(props){

    super(props)

    this.state = {

      gifName: '',

      images: []
    }
  }
  handleChange = (evt) => {
    
    this.setState({
    
      [evt.target.id]: evt.target.value
    })
  }
  handleSubmit = (evt) => {
    
    evt.preventDefault()
    
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_APIKEY}&q=${evt.target.gifName.value}`
    
    fetch(url).then(response => {
    
      return response.json()
    
    }).then(json => {
    
      this.setState({
    
        images: json.data
      })
    }).catch(err => {
      console.log(err)
    })
  }
  render(){
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            id="gifName"
            type="text"
            value={this.state.gifName}
            onChange={this.handleChange}/>
          <button type="submit">Find this gif</button>
        </form>
        {
          this.state.images.map(image => {
            return <img src={image.images.original.url} alt="giphy gif"/>
          })
        }
      </div>
    );
  }
}

export default App;