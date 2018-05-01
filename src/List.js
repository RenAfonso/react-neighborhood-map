import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';

class List extends Component {

    state = {
        museumName: ''
    } //COMMENT 
    
    getMuseumName = (event) => {
        let text = event.target.name;
        this.props.onClick(this.props.id)
    }

    render() {

        const { google, showingMuseums, toggleWindow, name } = this.props;

        return(
            <ol className="museums-list" >
                {showingMuseums.map((museum, index) => 
                    <li 
                    key={ '.$' + museum.id } 
                    name={ museum.name } 
                    onClick={ () => this.setState({
                        museumName: museum.name
                    }) /* toggleWindow(this.name) */ }> {museum.name} </li> //REPLACE THE FUNCTION FOR THE COMMENT
                )}
            </ol>
        )
    }
}

export default List