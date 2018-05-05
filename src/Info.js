import React, { Component } from 'react';

class Info extends Component {

    render() {

        const { clickedMuseum } = this.props;

        // A ternary operator checks if there's a museum selected or not. Coordinates are rounded.
        // It displays that museum's info in a banner over the map.
        return(
            (clickedMuseum) ? 
                (<div className="list-info display">
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