import Container from 'react-bootstrap/Container';
import Placeholder from 'react-bootstrap/Placeholder';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomeBannerLoading = () => {
  return (
    <>
      <Container fluid className="d-none d-md-block">
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={12} className="px-0">
            <Placeholder as="div" animation="glow">
              <Placeholder className="w-100 " style={{ height: '700px' }} />
            </Placeholder>
          </Col>
        </Row>
      </Container>

      <Container fluid className="d-block d-md-none">
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={12} className="px-0">
            <Placeholder as="div" animation="glow">
              <Placeholder className="w-100 " style={{ height: '250px' }} />
            </Placeholder>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeBannerLoading;
