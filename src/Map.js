import React, { Component } from 'react';
import {Map, InfoWindow, Marker} from 'google-maps-react'
import { mapStyles } from './mapStyles';
import PropTypes from 'prop-types';

class MapContainer extends Component {

    static propTypes = {
        showingMuseums: PropTypes.array.isRequired,
        foursquareError: PropTypes.bool.isRequired,
        google: PropTypes.object.isRequired
    }
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
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

        const { google, showingMuseums, clickedMuseum, foursquareError } = this.props;
        
        return (
            <Map 
            className="map"
            google={ google }
            containerStyle={ {width: '100%', height: '84vh', position: 'relative'} }
            styles={ mapStyles }
            zoom={ (clickedMuseum) ? 15 : 12 }
            center={ (clickedMuseum) ? {lat: `${clickedMuseum[0].location.lat}`, lng: `${clickedMuseum[0].location.lng}`} : {lat : 38.7222524, lng : -9.1493366} }
            onClick={ this.onMapClicked }>
                { (clickedMuseum) ? 
                    (<Marker
                    key={ clickedMuseum[0].id }
                    title={ clickedMuseum[0].name }
                    location={ clickedMuseum[0].location.address }
                    position={ {lat: `${clickedMuseum[0].location.lat}`, lng: `${clickedMuseum[0].location.lng}`} }
                    animation={ google.maps.Animation.BOUNCE }
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
                    visible={(clickedMuseum) ? false : this.state.showingInfoWindow}>
                        <div>
                            <h4>{this.state.activeMarker.title}</h4>
                            <p>{this.state.activeMarker.location}</p>
                        </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default MapContainer