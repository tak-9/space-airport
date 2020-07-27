import React from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import { ReactComponent as RocketLogo } from '../img/rocket.svg';

function SpaceAirport() {
    return (
        <>
            <Row className="controller">
                <Col xs="12" lg="3" className="capsules-section">
                    <Button>Capsules</Button>
                </Col>
                <Col xs="12" lg="3" className="logo-section">
                    <RocketLogo />
                </Col>
                <Col xs="12" lg="3" className="landing-pad-input-section">
                    <Input type="text" maxLength="15" />
                </Col>
                <Col xs="12" lg="3" className="landing-pad-button-section">
                    <Button>Landing Pad</Button>
                </Col>
            </Row>
        </>
    );
}

export default SpaceAirport;
