import React from 'react';
import { Link } from 'react-router-dom';
import './Ride.css';

const Ride = (props) => {
    const {name, img} = props.rideInfo;
    const url = `/destination/${name}`;
    return (
        <Link to={url} className="link">
            <div className="ride">
                <img src={img} alt="Ride" />
                <h2>{name}</h2>
            </div>
        </Link>
    );
};

export default Ride;