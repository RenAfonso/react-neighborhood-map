import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {

    static propTypes = {
        showingMuseums: PropTypes.array.isRequired,
        getName: PropTypes.func.isRequired,
        foursquareError: PropTypes.bool.isRequired,
        museumName: PropTypes.string.isRequired
    }


    render() {

        const { showingMuseums, getName, foursquareError, museumName } = this.props;

        /*
         * if there's no database error, it creates a list of buttons with a button per museum. A ternary operator
         * toggles the button class to highlight it if clicked.
         * The main ternary operator sets the list as a single element with an error message
         */
        return(
            <div className="museums-list" >
                { (!foursquareError) || (showingMuseums instanceof Array) ?
                (showingMuseums.map((museum, index) => 
                    <button 
                    key={ '.$' + museum.id }
                    className={ (museumName === museum.name) ? "museums-list-item selected" : "museums-list-item"}
                    tabIndex="1"
                    name={ museum.name }
                    onClick={ getName }> {museum.name} </button> 
                )) : (
                    <div 
                    className="museums-list-item"
                    tabIndex="1"
                    name="error loading the database"> Unable to load Foursquare data. Please try again... </div> 
                )}
            </div>
        )
    }
}

export default List