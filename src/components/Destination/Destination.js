import React, { useState } from 'react';
import { useParams } from 'react-router';
import rides from '../../ridesData/ridesData';
import Header from '../Header/Header';
import './Destination.css';
import SearchDestination from './SearchDestination';
import RideBook from './RideBook';
import GoogleMap from '../GoogleMap/GoogleMap';

const Destination = () => {
    const [searchDestination, setSearchDestination] = useState(true)
    const [getDestination, setGetDestination] = useState({})
    const {rideType} = useParams()
    const rideInfo = rides.find(ride => ride.name === rideType)
    return (
        <div>
            <Header></Header>
            <div className="destination-container">
                {searchDestination ? <SearchDestination setSearchDestination={setSearchDestination} setGetDestination={setGetDestination}></SearchDestination>
                    : <RideBook rideInfo={rideInfo} setSearchDestination={setSearchDestination} getDestination={getDestination}></RideBook>
                }
                <div className="map">
                    <GoogleMap></GoogleMap>
                </div>
            </div>
        </div>
    );
};

export default Destination;