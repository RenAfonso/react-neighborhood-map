import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';
import MapContainer from './Map';
import List from './List';
import Info from './Info';
import foursquare from './foursquare.svg';
import './App.css';

class App extends Component {

    state = {
        museums: [], // array to store venues
        query: '', // stores search
        museumName: '', // stores museum name of clicked museum on sidebar list
        sidebarVisible: false, // boolean that stores if sidebar is visible or not (for mobile)
        foursquareError: false, // boolean that stores if the Foursquare API loaded
    }

    // On mount, fetches Foursquare info
    componentDidMount() {
        this.getMuseums();
    }

    // Support function that checks the name of the clicked museum
    getName = (event) => {
        let listName = event.target.getAttribute('name');
        this.setState({
            museumName: listName,
        });
    }

    /* Fetches the Foursquare data. Lisbon's City Hall info is more complete but, with small name differences and a lack of coordinates
     * the only way to cross reference all data and insert markers on Google Maps is to do it manually. If Lisbon's City Hall API get
     * coordinates or Foursquare inserts a description for each museum, this app will be updated.
     */
    getMuseums() {
        fetch(`https://api.foursquare.com/v2/venues/search?ll=38.7222524,-9.1493366&client_id=DKAUJUD2JV421KQCJENSDWHWBVALP1QWWMF3KKKP1CDWPPKE&client_secret=FBBD413XCHSBJFX5D2DWZUTVYBVOOWLSVM3G3SWEOJQPRA35&v=20180323&categoryId=4bf58dd8d48988d181941735&radius=6000&limit=50`)
        .then(response => response.json())
        .then(data => data.response.venues)
        .catch(err => {
            this.setState({
                foursquareError: true
            })
        })
            .then(museums => {
                this.setState({
                    museums: museums
                })}
            )
            
    }

    // Function that sets state of query, allowing immediate display
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    // Function that allows sidebar to show (or not) in mobile display
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

    // Function that deselects a listed museum by setting a variable to empty
    updateMarker() {
        this.setState({
            museumName: ''
        })
    }

    render() {

        const { sidebarVisible } = this.state;

        // Creates a new array from the full venue array, based on query
        let showingMuseums;
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingMuseums = this.state.museums.filter((museum) => match.test(museum.name));
        } else {
            showingMuseums = this.state.museums;
        }

        // Sorts returned array by name
        if (showingMuseums instanceof Array) {
            showingMuseums.sort(sortBy('name'));
        }

        // Filters displayed array of venues, to store the venue matching the one the user clicked on the sidebar
        let clickedMuseum;
        if (this.state.museumName) {
            clickedMuseum = showingMuseums.filter((museum) => (museum.name === this.state.museumName));            
        }

        /*
         * Main render function. Ternary operators are used to set classname, displayed icon and aria-label depending on sidebar visibility
         * Child components called are:
         * - List, that will generate the sidebar's list of museums
         * - MapContainer, from google-maps-react, that will generate the map. Google props are defined by this same library.
         * - Info, that generates the small banner with museum info
         */
        return (
        <div className="app">
            <header className="app-header">

                <button
                className="app-search" 
                id="app-search"
                tabIndex="1"
                aria-label={ sidebarVisible ? "back arrow" : "search icon" }
                onClick={ this.toggleSidebar }>
                    <FontAwesomeIcon icon={ sidebarVisible ? faArrowLeft : faSearch }/>
                </button>
                
                <h1 className="app-title" tabIndex="-1">Lisbon's Museums</h1>
            </header>

            <main className="main">
                <section 
                className={ sidebarVisible ? "sidebar open" : "sidebar close" }
                id="sidebar">
                    <div className="searchbar">

                        <input 
                        className="search-text" 
                        type="text" 
                        placeholder="Search by museum"
                        tabIndex="1"
                        value={ this.state.query }
                        onClick={ () => this.updateMarker() }
                        onChange={ (event) => this.updateQuery(event.target.value) }/>

                        <List 
                        google={ this.props.google } 
                        showingMuseums={ showingMuseums } 
                        museumName={ this.state.museumName }
                        getName={ this.getName } 
                        foursquareError={ this.state.foursquareError } />

                    </div>
                </section>

                <section className="map-window">
                    <div>
                        <MapContainer 
                        google={ this.props.google } 
                        showingMuseums={ showingMuseums } 
                        clickedMuseum={ clickedMuseum }
                        foursquareError={ this.state.foursquareError } />

                        <Info
                        clickedMuseum={ clickedMuseum } />
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p className="footer-text">Lisbon Museums is powered by Foursquare</p>
                <img src={foursquare} className="footer-logo" alt="Foursquare logo" />
            </footer>
        </div>
        );
    }
}

// Personal google maps API key used as google-maps-react library suggests
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCChB_hbF67MQWbbw44sjHvv0qgPaERIuQ'
  })(App)
