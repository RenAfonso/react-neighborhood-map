import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
/* import Museums from './Museums' */
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';

class MapContainer extends Component {
    
    render() {

        const { google, showingMuseums } = this.props;
        
        return (
            <Map 
            className="map"
            google={google}
            containerStyle={{width: '100%', height: '100vh', position: 'relative'}}
            zoom={12}
            initialCenter={{
            lat : 38.7222524,
            lng : -9.1393366
            }}>
                {showingMuseums.map((museum, index) => 
                    <Marker
                    key={ museum.id }
                    name={ museum.name }
                    position={{lat: `${museum.location.lat}`, lng: `${museum.location.lng}`}} />
                )}
            </Map>
        )
    }
}

export default MapContainer