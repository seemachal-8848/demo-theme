import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

function BlogSectionLoader() {
  return (
    <div className="custom-container-xl px-2 mb-5 ">
      <div className="d-md-block d-none">
        <Placeholder as={Card.Text} animation="glow" className="ps-3 ms-1 d-flex justify-content-center ">
          <Placeholder style={{ width: '25%', marginTop: '20px' }} />
        </Placeholder>
        <div className="row mt-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="col-md-4 col-12 px-1">
              <Card className={`text-left mx-2 h-100 p-0 mb-3`}>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder style={{ width: '100%', height: 252 }} />
                </Placeholder>
                <Card.Body className="text-left pz-1">
                  <Placeholder as={Card.Text} animation="glow" style={{ marginBottom: '8px' }}>
                    <Placeholder style={{ width: '50%' }} />
                  </Placeholder>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder style={{ width: '75%' }} />
                  </Placeholder>
                  {[...Array(3)].map((_, index) => (
                    <Placeholder as={Card.Text} animation="glow" style={{ marginBottom: '2px' }}>
                      <Placeholder style={{ width: '92%' }} />
                    </Placeholder>
                  ))}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="row d-md-none d-block mt-5">
        <Placeholder as={Card.Text} animation="glow" className="ps-3 ms-1 d-flex justify-content-center ">
          <Placeholder style={{ width: '25%', marginTop: '20px' }} />
        </Placeholder>
        <div className="col-md-4 col-sm-6 col-12 px-3 mt-4">
          <Card className={`text-left mx-2 h-100 p-0 mb-3`}>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder style={{ width: '100%', height: 252 }} />
            </Placeholder>
            <Card.Body className="text-left pz-1">
              <Placeholder as={Card.Text} animation="glow" style={{ marginBottom: '8px' }}>
                <Placeholder style={{ width: '50%' }} />
              </Placeholder>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder style={{ width: '75%' }} />
              </Placeholder>
              {[...Array(3)].map((_, index) => (
                <Placeholder as={Card.Text} animation="glow" style={{ marginBottom: '2px' }}>
                  <Placeholder style={{ width: '92%' }} />
                </Placeholder>
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BlogSectionLoader;
