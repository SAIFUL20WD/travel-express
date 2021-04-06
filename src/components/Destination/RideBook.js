import React from 'react';
import peopleIcon from '../../images/people-icon.png';

const RideBook = ({rideInfo, setSearchDestination, getDestination}) => {
    const {name, img} = rideInfo;
    const rideAvailable = [1, 2, 3]
    return (
        <div className="ride-book-container">
            <div className="destination-name">
                <ul>
                    <li><h3>{getDestination.pickFrom}</h3></li>
                    <li><h3>{getDestination.pickTo}</h3></li>
                </ul> 
            </div>
            {
                rideAvailable.map(ride => {
                   return (<div className="ride-info-container">
                        <div className="ride-details">
                            <div className="ride-image-container">
                                <img src={img} alt={name}/>
                            </div>
                            <div className="ride-name">
                                <p>{name}</p>
                            </div>
                            <div className="ride-capacity-image">
                                <img src={peopleIcon} alt="people icon"/>
                            </div>
                            <div className="ride-capacity-count">
                                <p>4</p>
                            </div>
                        </div>
                        <div className="ride-rent">
                            <p>$60</p>
                        </div>
                    </div>)
                })
            }
            <button onClick={() => setSearchDestination(true)} className="back-btn">Go Back</button>
        </div>
    );
};

export default RideBook;