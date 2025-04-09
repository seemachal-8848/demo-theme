import React from 'react';
import { Placeholder } from 'react-bootstrap';

function PromotionalBannersLoder() {
  return (
    <div className="custom-container-xl px-3">
      <div className="row">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="col-md-6 col-12 rounded ">
            <Placeholder animation="glow">
              <Placeholder style={{ width: '100%', height: 350 }} className="mt-3" />
            </Placeholder>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromotionalBannersLoder;
