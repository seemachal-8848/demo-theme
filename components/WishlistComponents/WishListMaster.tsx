import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import useAddToCartHook from '../../hooks/CartPageHook/useAddToCart';
import useWishlist from '../../hooks/WishlistHooks/useWishlistHook';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import ProductCardVariantColour from '../../cards/ProductCardVariantColour';
const NoDataFound = dynamic(() => import('../NoRecordFound'));
const ProductCard = dynamic(() => import('../../cards/ProductCard'));
const ProductCardSkeleton = dynamic(() => import('../../cards/ProductCardSkeleton'));

const WishlistMaster = () => {
  const { wishlistData, isLoading } = useWishlist();
  const { addToCartItem, getPartyName } = useAddToCartHook();
  const cartData = useSelector(selectCart)?.items;
  const handleDataRendering = () => {
    if (isLoading) {
      return (
        <div className="row">
          {[...Array(10)].map((_, index: number) => (
            <div className="col-sm-6 col-lg-4 col-xl-3 col-xxl-3 text-center mb-4 px-3" key={index}>
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      );
    }
    if (wishlistData?.length > 0) {
      return (
        <div className=" row">
          {wishlistData?.length > 0 &&
            wishlistData?.map((item: any, index: number) => (
              // <div key={index} className="col-sm-6 col-lg-4 col-xl-3 col-xxl-3 text-center mb-4 px-3">
              //   <ProductCard
              //     data={item}
              //     wishlistData={wishlistData}
              //     btnAction={'Add'}
              //     cartData={cartData}
              //     addToCartItem={addToCartItem}
              //     getPartyName={getPartyName}
              //   />
              // </div>
              <div className="col-sm-6 col-lg-4 col-xl-3 col-xxl-3 mb-4 px-3">
                <div className={'h-100'}>
                  <ProductCardVariantColour
                    data={item}
                    cartData={cartData}
                    addToCartItem={addToCartItem}
                    getPartyName={getPartyName}
                    wishlistData={wishlistData}
                  />
                </div>
              </div>
            ))}
        </div>
      );
    }
    if (wishlistData?.length === 0) {
      return <NoDataFound title="Wishlist list is empty !!" message="Add Items to wishlist to view wishlist list." />;
    }
  };
  return (
    <div>
      <div className="text-center py-4 bg-blue text-light mb-5">
        <h4 className="m-0">Wishlist</h4>
        <p className="m-0">View your wishlist products</p>
      </div>
      <div className="container">{handleDataRendering()}</div>
    </div>
  );
};

export default WishlistMaster;
