import React from 'react';
import './Movies.scss';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="p-5">
            <Row>
                <Col sm={12} lg={2}>
                    Filter
                </Col>
                <Col sm={12} lg={10}>
                    Content
                </Col>
            </Row>
        </div>
    );
};

export default Home;
