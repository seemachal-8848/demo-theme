import React from 'react'
import useAddToCartHook from '../../../../hooks/CartPageHook/useAddToCart';
import useFetchCartItems from '../../../../hooks/CartPageHook/useFetchCartItems';
import NoDataFound from '../../../NoRecordFound';
import CartCardContainer from '../../ApparelCartPage/CartCardContainer';
import CartSubtotal from '../../ApparelCartPage/CartSubtotal';

function MasterComponent() {
    const { cartListingItems, setCartListingItems, isLoading, errorMessage } = useFetchCartItems();
    const { addToCartItem, cLearCartAPIFunc, RemoveItemCartAPIFunc }: any = useAddToCartHook();
  
    const message = `
      Before proceeding to checkout, you must add some products to your shopping cart.
      You will find a lot of interesting products on our Home page.
    `;
    const handleDataRendering = () => {
      if (isLoading) {
        return (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status" />
          </div>
        );
      }
      if (!isLoading && Object.keys(cartListingItems)?.length !== 0) {
        return (
          <>
            <div className="text-uppercase py-5 text-center bg-blue text-light ">
              <h5 className="m-0">Shopping Cart</h5>
            </div>
            <div className="container-xl p-lg-3">
              <CartCardContainer
                cartListingItems={cartListingItems}
                RemoveItemCartAPIFunc={RemoveItemCartAPIFunc}
                setCartListingItems={setCartListingItems}
                addToCartItem={addToCartItem}
              />
              <CartSubtotal cartListingItems={cartListingItems} />
            </div>
          </>
        );
      }
      if (!isLoading && Object.keys(cartListingItems)?.length === 0) {
        return <NoDataFound title={'YOUR CART IS EMPTY.'} const message={message} />;
      }
    };
    return <>{handleDataRendering()}</>;
}

export default MasterComponent
