import React, { useState } from 'react';

const SearchDestination = ({setSearchDestination, setGetDestination}) => {
    const [destination, setDestination] = useState({pickFrom: '', pickTo: ''})

    const handleSearch = (e) => {
        const inputName = e.target.name
        const inputValue = e.target.value
        if(inputName === 'pickFrom'){
            const destinationFrom = {...destination}
            destinationFrom[inputName] = inputValue
            setDestination(destinationFrom)
        }
        if(inputName === 'pickTo'){
            const destinationTo = {...destination}
            destinationTo[inputName] = inputValue
            setDestination(destinationTo)
        }
    }

    const handleDestinationSearch = (e) => {
        if(destination.pickFrom && destination.pickTo){
            setSearchDestination(false)
            setGetDestination(destination)
        }
        else {
            alert('Give Destination Information Correctly')
        }
        e.preventDefault()
    }

    return (
        <div className="destination-search-container">
            <form onSubmit={handleDestinationSearch} className="destination-form">
                <label htmlFor="PickFrom">Pick From</label>
                <input type="text" name="pickFrom" onBlur={handleSearch} placeholder="Mirpur 1"/>
                <label htmlFor="PickTo">Pick To</label>
                <input type="text" name="pickTo" onBlur={handleSearch} placeholder="Danmondi"/>
                <input type="submit" value="Search" id="destination-submit"/>
            </form>
        </div>
    );
};

export default SearchDestination;