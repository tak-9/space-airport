import React, {createContext, useState} from 'react';

export const SpaceDataContext = createContext();

function SpaceDataProvider(props) {

    const [spaceData, setSpaceData] = useState();

    const setSpaceDataState = (data) => {
        console.log("*** setSpaceData(data) ***" , data);
        setSpaceData(data);
    }

    return (
        <SpaceDataContext.Provider value={{spaceData, setSpaceDataState: setSpaceDataState}}>
            {props.children}
        </SpaceDataContext.Provider>
    );

}
 
export default SpaceDataProvider;
