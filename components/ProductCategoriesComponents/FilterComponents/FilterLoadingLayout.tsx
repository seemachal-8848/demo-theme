import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';
import { FaAlignJustify } from 'react-icons/fa6';

const FilterLoadingLayout = () => {
  return (
    <div className="h-100 " id="sidebar">
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <div>
            <Placeholder as="h6" animation="glow" style={{ marginTop: '15px' }}>
              <Placeholder style={{ width: '100%' }} />
            </Placeholder>
            <hr className="my-1" />

            <Placeholder as="div" animation="glow">
              <Placeholder style={{ width: '70%', minHeight: '10px' }} />
            </Placeholder>

            <Placeholder as="div" animation="glow">
              <Placeholder style={{ width: '47%', minHeight: '10px' }} />
            </Placeholder>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterLoadingLayout;
