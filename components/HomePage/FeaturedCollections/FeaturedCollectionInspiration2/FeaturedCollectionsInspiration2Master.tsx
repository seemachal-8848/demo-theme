import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectWishlist } from '../../../../store/slices/wishlist-slices/wishlist-local-slice';
import useFeaturedCollections from '../../../../hooks/HomePageHooks/useFeaturedCollections';
import useAddToCartHook from '../../../../hooks/CartPageHook/useAddToCart';
import FeaturedCollectionsInspiration2Data from './FeaturedCollectionsInspiration2Data';
import FeaturedCollectionsInspiration2Loading from './FeaturedCollectionsInspiration2Loading';
import ErrorImage from '../../../../public/assets/images/error-icon.png';

type Props = {};

const FeaturedCollectionsInspiration2Master = ({ componentProperties }: any) => {
  const { allTagsData, fetchDisplayTagsDataFunction, isLoading, errorMessage } = useFeaturedCollections(componentProperties);
  const { addToCartItem, getPartyName } = useAddToCartHook();
  const wishlistData = useSelector(selectWishlist).items;

  if (isLoading) {
    return <FeaturedCollectionsInspiration2Loading />;
  }

  if (allTagsData && allTagsData?.length > 0) {
    return (
      <div className="card border-0 my-5">
        <FeaturedCollectionsInspiration2Data
          data={allTagsData}
          addToCartItem={addToCartItem}
          getPartyName={getPartyName}
          wishlistData={wishlistData}
        />
      </div>
    );
  }
  if (errorMessage) {
    return (
      <div className="p-3 d-flex justify-content-center align-items-center" style={{ fontSize: '40px' }}>
        <Image src={ErrorImage} width={250} height={250} alt="Error Image" />
      </div>
    );
  }

  return <></>;
};
export default FeaturedCollectionsInspiration2Master;
