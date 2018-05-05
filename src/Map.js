import React, { Component } from 'react';
import {Map, InfoWindow, Marker} from 'google-maps-react';
import { mapStyles } from './mapStyles';
import PropTypes from 'prop-types';

class MapContainer extends Component {

    static propTypes = {
        showingMuseums: PropTypes.array.isRequired,
        foursquareError: PropTypes.bool.isRequired,
        google: PropTypes.object.isRequired
    }
    
    state = {
        showingInfoWindow: false, // Boolean to determine infowindow visibility
        activeMarker: {}, // Object that stores marker that will display infowindow
        selectedPlace: {} // Object that stores museum info from above marker
    };

    // Function that toggles an infowindow open upon marker's click
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
    });
 
    // Function that toggles infowindow off if the map is clicked
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false
            })
        }
    };


    render() {

        const { google, showingMuseums, clickedMuseum, foursquareError } = this.props;
        
        /*
         * Map displayed with ternary operators. If a museum is selected from the list, the map will center on that marker,
         * that marker will bounce and it will zoom in on it.
         * A second ternary operator, also for for a selected museum, will display all listed museum's markers or the selected museum marker.
         * The museum's list is extensive and they are nearby, hence this choice to improve map readability.
         * Another ternary operator ensures that the infowindow component isn't displayed if a museum is selected 
         * (that info is already in the banner, avoiding info duplication)
         */
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