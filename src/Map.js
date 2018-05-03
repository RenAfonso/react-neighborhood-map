import React, { Component } from 'react';
import {Map, InfoWindow, Marker} from 'google-maps-react'
import { mapStyles } from './mapStyles';
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

    onListClick = (props, marker, e) =>
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

        const { google, showingMuseums, clickedMuseum, foursquareError } = this.props;      
        
        return (
            <Map 
            className="map"
            google={ google }
            containerStyle={ {width: '100%', height: '84vh', position: 'relative'} }
            styles={ mapStyles }
            zoom={12}
            initialCenter={{
            lat : 38.7222524,
            lng : -9.1393366
            }}
            onClick={this.onMapClicked}>
                {(clickedMuseum) ? 
                    (<Marker
                    key={ clickedMuseum[0].id }
                    title={ clickedMuseum[0].name }
                    location={ clickedMuseum[0].location.address}
                    position={{lat: `${clickedMuseum[0].location.lat}`, lng: `${clickedMuseum[0].location.lng}`}}
                    onClick={this.onMarkerClick}/>) :
                    ((!foursquareError) ? (showingMuseums.map((museum, index) => 
                        <Marker
                        key={ museum.id }
                        title={ museum.name }
                        location={ museum.location.address}
                        position={{lat: `${museum.location.lat}`, lng: `${museum.location.lng}`}}
                        onClick={this.onMarkerClick}/>
                        )) : console.log('Foursquare data missing. Markers not loaded'))
                }
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    className="infoWindow">
                        <div>
                            <h3>{this.state.activeMarker.title}</h3>
                            <p>{this.state.activeMarker.location}</p>
                        </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default MapContainer