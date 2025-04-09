import React, { useCallback, useState } from 'react';
import CartCard from '../../../cards/CartCard';

interface CartCardContainerPropTypes {
  cartListingItems: any;
  RemoveItemCartAPIFunc: any;
  setCartListingItems: any;
  addToCartItem: any;
}

const CartCardContainer = ({ cartListingItems, RemoveItemCartAPIFunc, setCartListingItems, addToCartItem }: CartCardContainerPropTypes) => {
  const allOrders = cartListingItems?.categories?.flatMap((category: any) => category?.orders);

  const handleUpdateCart = useCallback((updatedList: any) => {
    const params = {
      currency: 'INR',
      party_name: cartListingItems?.party_name,
      item_list: updatedList,
    };
    addToCartItem(params, setCartListingItems);
  }, []);

  const handleQtyInputChange = (item_code: string, value: string) => {
    const newQty = Number(value.replace(/\D/, ''));
    if (newQty > 0) {
      const updatedItems = cartListingItems?.categories?.map((category: any) => ({
        ...category,
        orders: category.orders.map((item: any) => {
          if (item.item_code === item_code) {
            return { ...item, qty: newQty };
          }
          return item;
        }),
      }));
      setCartListingItems((prevItems: any) => ({ ...prevItems, categories: updatedItems }));
    }
  };

  const handleQtyBlur = (item_code: string, value: string) => {
    const newQty = Number(value);
    if (newQty > 0) {
      const updatedCartItems = [{ item_code, quantity: newQty }];
      handleUpdateCart(updatedCartItems);
    }
  };

  const handleQtyButtonClick = (item_code: string, newQty: number) => {
    if (newQty > 0) {
      const updatedItems = cartListingItems?.categories?.map((category: any) => ({
        ...category,
        orders: category.orders.map((item: any) => {
          if (item.item_code === item_code) {
            return { ...item, qty: newQty };
          }
          return item;
        }),
      }));
      const updatedCartItems = [{ item_code, quantity: newQty }];
      setCartListingItems((prevItems: any) => ({ ...prevItems, categories: updatedItems }));
      handleUpdateCart(updatedCartItems);
    }
  };

  return (
    <div className=" mt-5 w-100">
      <div className="row text-uppercase d-none d-xl-flex fw-bold">
        <div className="col-xl-5">product</div>
        <div className="col-xl-2 text-start">price</div>
        <div className="col-xl-3 text-center">quantity</div>
        <div className="col-xl-2 text-end">total</div>
      </div>
      <hr className="m-0 my-xl-3 d-none d-xl-block" />
      <div>
        {allOrders?.length > 0 &&
          allOrders?.map((order: any) => (
            <CartCard
              orderData={order}
              RemoveItemCartAPIFunc={RemoveItemCartAPIFunc}
              quotationId={cartListingItems?.name}
              setCartListingItems={setCartListingItems}
              handleQtyInputChange={handleQtyInputChange}
              handleQtyBlur={handleQtyBlur}
              handleQtyButtonClick={handleQtyButtonClick}
            />
          ))}
      </div>
    </div>
  );
};

export default CartCardContainer;
