import React, { useContext } from 'react';
import { SpaceDataContext } from '../contexts/SpaceDataContext';

function Display() {
    let spaceDataCtx = useContext(SpaceDataContext);
    let { spaceData } = spaceDataCtx;

    return (
        <div className="scroll">
            <div className="contents text-warning">
                <pre>
                    {JSON.stringify(spaceData, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default Display;
