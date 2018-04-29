import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
/* import Museums from './Museums' */
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';

class MapContainer extends Component {
    
    render() {

        const { google, museums } = this.props;
        
        return (
            <Map 
            google={google}
            style={{width: '90%', height: '50%', position: 'relative'}}
            zoom={14}
            initialCenter={{
            lat : 38.7222524,
            lng : -9.1393366
            }}>
                {museums.map((museum, index) => 
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