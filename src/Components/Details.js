import React from 'react';
import Constants from '../Constants/Constants';
import '../CSS/Details.css';

const Details = ({ vehicle }) => {
    var total = 0;
    return (
        <div className="wrapper-details">
            <h3 className="location-name">{Constants.LocationName}</h3><br />
            <p>
                { vehicle.length !== 0 &&
                    vehicle.map(count => {
                        total += count.vehicleCount; 
                    })
                }
            </p>
            {<span>{total}EV</span>}
            <nav className="list-item">
                <li>{Constants.Activity}</li>
                <li>{Constants.Running}</li>
                <li>{Constants.Docked}</li>
            </nav>
        </div>
    )
}

export default Details;
