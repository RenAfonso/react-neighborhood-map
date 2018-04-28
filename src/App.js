import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import MapContainer from './Map'
import logo from './logo.svg';
import './App.css';

class App extends Component {

    componentDidMount() {

        fetch(`https://services.arcgis.com/1dSrzEWVQn5kHHyK/arcgis/rest/services/POICultura/FeatureServer/3/query?where=1%3D1&outFields=*&f=pgeojson`)
            .then(response => response.json())
            .then(display);

        function display(data) {
            console.log(data);
        }
    }

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
                    <MapContainer google={this.props.google} />
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
