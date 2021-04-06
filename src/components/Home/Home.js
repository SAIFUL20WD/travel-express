import React from 'react';
import './Home.css';
import background from '../../images/home-bg.png';
import Header from '../Header/Header';
import rides from '../../ridesData/ridesData';
import Ride from '../Ride/Ride';

const Home = () => {
    return (
        <div className="home-container" style={{backgroundImage: `url(${background})`}}>
            <Header></Header>
            <div className="rides-container">
                {
                    rides.map(ride => <Ride rideInfo={ride} key={ride.id}></Ride>)
                }
            </div>
        </div>
    );
};

export default Home;