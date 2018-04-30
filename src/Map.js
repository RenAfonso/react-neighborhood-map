import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
/* import Museums from './Museums' */
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';

class MapContainer extends Component {
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
    });
 
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false
            })
        }
    };

    render() {

        const { google, showingMuseums } = this.props;
        
        return (
            <Map 
            className="map"
            google={google}
            containerStyle={{width: '100%', height: '100vh', position: 'relative'}}
            zoom={13}
            initialCenter={{
            lat : 38.7222524,
            lng : -9.1393366
            }}
            onClick={this.onMapClicked}>
                {showingMuseums.map((museum, index) => 
                    <Marker
                    key={ museum.id }
                    name={ museum.name }
                    location={ museum.location.address}
                    position={{lat: `${museum.location.lat}`, lng: `${museum.location.lng}`}}
                    onClick={this.onMarkerClick}/>
                    )}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                        <div>
                            <h3>{this.state.activeMarker.name}</h3>
                            <p>{this.state.activeMarker.location}</p>
                        </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default MapContainer