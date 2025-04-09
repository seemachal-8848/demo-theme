import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from 'react-bootstrap/Placeholder';

const PersonalizedCategoriesLoading = () => {
  return (
    <div className="custom-container-xl px-3  mt-2">
      <Row className="justify-content-center">
        <Col xs={12} md={5} lg={5} className="mt-3">
          <Placeholder as="div" animation="glow">
            <Placeholder className="w-100" style={{ height: '600px', borderRadius: '10px' }} />
          </Placeholder>
        </Col>
        <Col xs={12} md={4} lg={4} className="mt-3">
          <Placeholder as="div" animation="glow">
            <Placeholder className="w-100 mb-2" style={{ height: '292px', borderRadius: '10px' }} />
            <Placeholder className="w-100 mt-2" style={{ height: '292px', borderRadius: '10px' }} />
          </Placeholder>
        </Col>
        <Col xs={12} md={3} lg={3} className="mt-3">
          <Placeholder as="div" animation="glow">
            <Placeholder className="w-100" style={{ height: '600px', borderRadius: '10px' }} />
          </Placeholder>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalizedCategoriesLoading;
