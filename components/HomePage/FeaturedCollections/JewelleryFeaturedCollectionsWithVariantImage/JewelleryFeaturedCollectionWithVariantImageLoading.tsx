import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import ProductCardSkeleton from '../../../../cards/ProductCardSkeleton';

const JewelleryFeaturedCollectionWithVariantImageLoading = () => {
  return (
    <div className="custom-container-xl px-2 mt-3">
      {[...Array(3)].map((_, index) => (
        <div className="row" key={index}>
          <Placeholder as={Card.Text} animation="glow" className="ps-3 ms-1">
            <Placeholder style={{ width: '25%', marginTop: '20px' }} />
          </Placeholder>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="col-sm-6 col-lg-3 col-xl-3 col-xxl-3 text-center mb-4">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default JewelleryFeaturedCollectionWithVariantImageLoading;
