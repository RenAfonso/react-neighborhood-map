import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import Map from './Map.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {


    render() {

        return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <section className="sidebar">
                <div className="searchbar">
                    <input className="search-text" type="text" placeholder="Search"/>
                    <button className="search-button">Search</button>
                </div>
            </section>
            <section className="map-window">
                <div>
                    <Map google={this.props.google} />
                </div>
            </section>
        </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCChB_hbF67MQWbbw44sjHvv0qgPaERIuQ'
    //libraries: ['visualization']
  })(App)
