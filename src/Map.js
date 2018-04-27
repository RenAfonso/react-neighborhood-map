import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class Map extends Component {
    
    componentDidUpdate() {
        this.initMap(); // call loadMap function to load the google map
    }

    initMap() {

        const { google } = this.props;
        // Constructor creates a new map - only center and zoom are required.
        this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 13
        })
    }
    
    render() {

        return (
            <div id="map"></div>
        )
    }
}

export default Map