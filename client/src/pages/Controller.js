import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Input } from 'reactstrap';
import { ReactComponent as RocketLogo } from '../img/rocket.svg';
import { SpaceDataContext } from '../contexts/SpaceDataContext';

function SpaceAirport() {

    let spaceDataCtx = useContext(SpaceDataContext);
    let { setSpaceDataState } = spaceDataCtx;
    const [landingPadId, setLandingPadId] = useState('');
    const [buttonDisable, setButtonDisabled] = useState(true);

    const capsulesButtonHandler = () => {
        const url = "/api/capsules";
        axios.get(url)
        .then(res => {
            console.log(res.data);
            setSpaceDataState(res.data);
        });
        // TODO: add .catch()
        // Display error message in console.
    }

    const landingButtonHandler = () => {
        const url = "/api/landpad/" + landingPadId ;
        axios.get(url)
        .then(res => {
            console.log(res.data);
            setSpaceDataState(res.data);
        });
        // TODO: add .catch()
        // Display error message in console.
    }

    const handleLandingPadIDInput = (id) => {
        // Disable Landing Pad button if input box is empty
        if (!id || id.length === 0) {
            setButtonDisabled(true);
        } else { 
            // Reset Landing Pad button state (Disabled/Enabled)
            setButtonDisabled(false);
        }

        setLandingPadId(id);

        // Disable button when one of these character is entered. 
        const invalidChars = ['#', '$', '%', '&'] ;
        for (let i=0; i<invalidChars.length; i++){
            if (id.includes(invalidChars[i])) {
                setButtonDisabled(true);
                break;
            }
        }
    }

    return (
        <>
            <Row className="controller">
                <Col xs="12" lg="3" className="capsules-section">
                    <Button onClick={capsulesButtonHandler}>
                        Capsules
                    </Button>
                </Col>
                <Col xs="12" lg="3" className="logo-section">
                    <RocketLogo />
                </Col>
                <Col xs="12" lg="3" className="landing-pad-input-section">
                    <Input 
                        type="text" 
                        maxLength="15"
                        onChange={e => handleLandingPadIDInput(e.target.value)}
                        value={landingPadId}
                    />
                </Col>
                <Col xs="12" lg="3" className="landing-pad-button-section">
                    <Button onClick={landingButtonHandler} disabled={buttonDisable} >
                        Landing Pad
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default SpaceAirport;
