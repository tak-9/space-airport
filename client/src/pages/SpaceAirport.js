import React from 'react';
import { Row, Col } from 'reactstrap';
import Controller from './Controller';
import Display from './Display';

function SpaceAirport() {
    return (
        <Row className="my-container">
            <Col xs="8" lg="12" className="display-area">
                <Display />
            </Col>
            <Col xs="4" lg="12" className="controller-area border">
                <Controller />
            </Col>
        </Row>
    );
}

export default SpaceAirport;
