import React from 'react';
import { Col, Container, Placeholder, Row } from 'react-bootstrap';

const HomeBannerLoading = () => {
  return (
    <Container fluid className="mt-3">
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12}>
          <Placeholder as="div" animation="glow">
            <Placeholder className="w-100" style={{ height: '400px', borderRadius: '10px' }} />
          </Placeholder>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeBannerLoading;
