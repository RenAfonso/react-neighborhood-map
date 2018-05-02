import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';

class List extends Component {

    render() {

        const { google, showingMuseums, getClass, name, foursquareError } = this.props;

        return(
            <ol className="museums-list" >
                {(showingMuseums instanceof Array) ? (showingMuseums.map((museum, index) => 
                    <li 
                    key={ '.$' + museum.id }
                    className="museums-list-item"
                    name={ museum.name } 
                    onClick={ getClass }> {museum.name} </li> //REPLACE THE FUNCTION FOR THE COMMENT
                )) : (
                    <li 
                    className="museums-list-item"
                    name="error loading the database"> Unable to load Foursquare data. Please try again... </li> //REPLACE THE FUNCTION FOR THE COMMENT
                )}
            </ol>
        )
    }
}

export default List