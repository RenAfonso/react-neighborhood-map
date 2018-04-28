import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
/* import Museums from './Museums' */
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';

class MapContainer extends Component {
    
    render() { 
        
        return (
            <Map 
            google={this.props.google}
            style={{width: '50%', height: '50%', position: 'relative'}}
            zoom={14}
            initialCenter={{
            lat : 38.7222524,
            lng : -9.1393366
            }}>
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'Museu João de Deus'}
                    position={{lat: 38.7158734, lng: -9.1583819}} />
                <Marker
                    name={'Dolores park'}
                    position={{lat: 37.759703, lng: -122.428093}} />
                <Marker
                    name={'Your position'}
                    position={{lat: 37.762391, lng: -122.439192}} />
            </Map>
        )
    }
}

export default MapContainer