import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class Info extends Component {

    render() {

        const { clickedMuseum } = this.props;

        return(
                (clickedMuseum) ? (<div className="list-info display">
                    <h3>{ clickedMuseum[0].name }</h3>
                    <p>{ clickedMuseum[0].location.address }</p>
                    <p>Latitude: { clickedMuseum[0].location.lat.toFixed(4) }, Longitude: { clickedMuseum[0].location.lng.toFixed(4) }</p>
                </div>) : 
                (<div className="list-info">
                </div>)
        )
    }
}

export default Info