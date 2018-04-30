import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
//import * as FourSquareAPI from './FourSquareAPI'
import MapContainer from './Map'
import List from './List'
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {
        museums: [],
        teststring: 'a fucking string',
        query: ''
    }

    componentDidMount() {
        this.getMuseums();
    }

    getMuseums() {
        fetch(`https://api.foursquare.com/v2/venues/search?ll=38.7222524,-9.1393366&client_id=DKAUJUD2JV421KQCJENSDWHWBVALP1QWWMF3KKKP1CDWPPKE&client_secret=FBBD413XCHSBJFX5D2DWZUTVYBVOOWLSVM3G3SWEOJQPRA35&v=20180323&categoryId=4bf58dd8d48988d181941735&radius=6000&limit=50`)
        .then(response => response.json())
        .then(data => data.response.venues)
            .then(museums => {
                this.setState({
                    museums: museums
                }, function () {
                    console.log(this.state.museums);
                })}
            )
        }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    render() {

        let showingMuseums;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingMuseums = this.state.museums.filter((museum) => match.test(museum.name));
        } else {
            showingMuseums = this.state.museums;
        }

        showingMuseums.sort(sortBy('name'));

        return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <main className="main">
                <section className="sidebar">
                    <div className="searchbar">
                        <input 
                        className="search-text" 
                        type="text" 
                        placeholder="Search" 
                        value={this.state.query} 
                        onChange={(event) => this.updateQuery(event.target.value)}/>
                        <List google={this.props.google} showingMuseums={showingMuseums} />
                    </div>
                </section>
                <section className="map-window">
                    <div>
                        <MapContainer google={this.props.google} showingMuseums={showingMuseums} />
                    </div>
                </section>
            </main>
        </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCChB_hbF67MQWbbw44sjHvv0qgPaERIuQ'
    //libraries: ['visualization']
  })(App)
