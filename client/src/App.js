import React from 'react';
import SpaceAirport from './pages/SpaceAirport';
import SpaceDataContextProvider from './contexts/SpaceDataContext';

function App() {
    return (
        <SpaceDataContextProvider>
            <div className="top-space" />
                <SpaceAirport/>
            <div className="bottom-space" />
        </SpaceDataContextProvider>
    );
}

export default App;
