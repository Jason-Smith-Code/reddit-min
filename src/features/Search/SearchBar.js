import React from 'react';

const SearchBar = () => {
    return (
        <form id="search"> 
            <input 
                type="search" 
                id="query" 
                name="q" 
                placeholder="Search...">        
            </input>
            <button
                type="submit"
            >Search</button>
        </form>
    )
}

export default SearchBar;
