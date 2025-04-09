import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';
import ProductCardSkeleton from '../../cards/ProductCardSkeleton';
import ProductCardVariantColour from '../../cards/ProductCardVariantColour';
import useAddToCartHook from '../../hooks/CartPageHook/useAddToCart';
import useMatchingProduct from '../../hooks/ProductDetailPageHooks/useMatchingProduct';
import { selectWishlist } from '../../store/slices/wishlist-slices/wishlist-local-slice';

const MatchingProductsWithVariantsCard = () => {
  const { isLoading, matchingProducts } = useMatchingProduct();
  const { addToCartItem, getPartyName } = useAddToCartHook();
  const wishlistData = useSelector(selectWishlist).items;
  const responsive: any = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const renderMatchingProducts: any = () => {
    if (isLoading) {
      return (
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="col-md-2 col-12">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      );
    }
    if (matchingProducts?.length > 0) {
      return matchingProducts?.map((item: any, i: any) => (
        <div key={i} className="carousel-section">
          {item?.values?.length > 0 && <h3 className="mb-4 mt-5 text-center">{`${item.name} Products`}</h3>}
          <Carousel responsive={responsive}>
            {item?.values?.length > 0 &&
              item?.values?.map((val: any, j: any) => (
                <div key={`${i}-${j}`} className="card-wrapper px-2 h-100">
                  <ProductCardVariantColour
                    data={val}
                    addToCartItem={addToCartItem}
                    getPartyName={getPartyName}
                    wishlistData={wishlistData}
                  />
                </div>
              ))}
          </Carousel>
        </div>
      ));
    }
  };
  return <div className=" w-100 mt-5 mb-3">{renderMatchingProducts()}</div>;
};

export default MatchingProductsWithVariantsCard;
