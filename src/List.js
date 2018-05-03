import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class List extends Component {

    render() {

        const { showingMuseums, getClass, foursquareError, museumName } = this.props;

        return(
            <ol className="museums-list" >
                { (!foursquareError) || (showingMuseums instanceof Array) ? (showingMuseums.map((museum, index) => 
                    <li 
                    key={ '.$' + museum.id }
                    className={ (museumName === museum.name) ? "museums-list-item selected" : "museums-list-item"}
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