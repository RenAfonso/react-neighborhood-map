import React, { Component } from 'react';
import Map from './Map.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {


    render() {
        const google = window.google;

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
                    <Map google={ google } />
            </section>
        </div>
        );
    }
}

export default App
