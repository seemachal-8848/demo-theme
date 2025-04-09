import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import ProductCardSkeleton from '../../../../cards/ProductCardSkeleton';

const FeaturedCollectionWithVariantColourLoading = () => {
  return (
    <div className="custom-container-xl px-2 mt-3">
      {/* {[...Array(3)].map((_, index) => ( */}
      <div className="row">
        <Placeholder as={Card.Text} animation="glow" className="ps-3 ms-1 d-flex justify-content-center ">
          <Placeholder style={{ width: '25%', marginTop: '20px' }} />
        </Placeholder>
        {[...Array(8)].map((_, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3 text-center mb-4 mt-3">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
      {/* ))} */}
    </div>
  );
};
export default FeaturedCollectionWithVariantColourLoading;
