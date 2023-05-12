import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';

export default class App extends React.Component{
  render(){
    return(
      <div className="App">
        <HomePage/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
