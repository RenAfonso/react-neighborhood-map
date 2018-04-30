import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';

class List extends Component {

    componentDidMount() {

        const itemList = document.getElementsByTagName('li');

        itemList.addEventListener('click', function(event) {
            
        })

    }

    render() {

        const { google, showingMuseums } = this.props;

        return(
            <ol className="museums-list">
                {showingMuseums.map((museum, index) => 
                    <li key={ '.$' + museum.id }> {museum.name} </li>
                )}
            </ol>
        )
    }
}

export default List