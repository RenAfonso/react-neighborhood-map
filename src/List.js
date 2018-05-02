import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';

class List extends Component {

    getMuseumName = (event) => {
        let text = event.target.name;
        this.props.onClick(this.props.id)
    }

    render() {

        const { google, showingMuseums, getClass, name } = this.props;

        return(
            <ol className="museums-list" >
                {showingMuseums.map((museum, index) => 
                    <li 
                    key={ '.$' + museum.id }
                    className="museums-list-item"
                    name={ museum.name } 
                    onClick={ /* () => this.setState({
                        museumName: museum.name
                    }) */ getClass.bind(this) }> {museum.name} </li> //REPLACE THE FUNCTION FOR THE COMMENT
                )}
            </ol>
        )
    }
}

export default List