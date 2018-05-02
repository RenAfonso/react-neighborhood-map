import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft'
import MapContainer from './Map'
import List from './List'
import lisbonlogo from './lisbonlogo.svg'
import foursquare from './foursquare.svg'
import './App.css';

class App extends Component {

    state = {
        museums: [],
        teststring: 'a string',
        query: '',
        museumName: '',
        sidebarVisible: false
    }

    componentDidMount() {
        this.getMuseums();
    }

    getClass = (event) => {
        //console.log(event.target.getAttribute('class'));
        let listName = event.target.getAttribute('name');
        this.setState({
            museumName: listName
        });
        //console.log(listName + ' ' + this.state.teststring);
        //return listName;
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

    toggleSidebar = (sidebarVisible) => {
        if (this.state.sidebarVisible) {
            this.setState({
                sidebarVisible: false
            });
        } else {
            this.setState({
                sidebarVisible: true
            });
        }
    }

    hideSidebar = (sidebarVisible) => {
        if (this.state.sidebarVisible) {
            this.setState({
                sidebarVisible: false
            })
        }
    }

    render() {

        const { sidebarVisible } = this.state;

        let showingMuseums;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingMuseums = this.state.museums.filter((museum) => match.test(museum.name));
        } else {
            showingMuseums = this.state.museums;
        }

        showingMuseums.sort(sortBy('name'));

        return (
        <div className="app">
            <header className="app-header">
                <div
                className="app-search" 
                id="app-search"
                onClick={this.toggleSidebar}>
                    <FontAwesomeIcon icon={ sidebarVisible ? faArrowLeft : faSearch }/>
                </div>
                <h1 className="app-title">Lisbon Museums</h1>
            </header>
            <main className="main">
                <section 
                className={ sidebarVisible ? "sidebar open" : "sidebar close" }
                id="sidebar">
                    <div className="searchbar">
                        <input 
                        className="search-text" 
                        type="text" 
                        placeholder="Search" 
                        value={this.state.query} 
                        onChange={(event) => this.updateQuery(event.target.value)}/>
                        <List google={this.props.google} showingMuseums={showingMuseums} getClass={this.getClass} />
                    </div>
                </section>
                <section className="map-window">
                    <div>
                        <MapContainer google={this.props.google} showingMuseums={showingMuseums} museumName={this.state.museumName} />
                    </div>
                </section>
            </main>
            <footer className="footer">
                <p className="footer-text">Lisbon Museums is powered by Foursquare</p>
                <img src={foursquare} className="footer-logo" alt="This app is powered by foursquare" />
            </footer>
        </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCChB_hbF67MQWbbw44sjHvv0qgPaERIuQ'
    //libraries: ['visualization']
  })(App)
