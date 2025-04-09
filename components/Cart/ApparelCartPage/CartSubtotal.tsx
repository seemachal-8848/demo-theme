import React from 'react';
import styles from '../../../styles/components/cartlist.module.scss';
import { useRouter } from 'next/router';

interface CartSubtotalPropsTypes {
  cartListingItems: any;
}

const CartSubtotal = ({ cartListingItems }: CartSubtotalPropsTypes) => {
  const router = useRouter();
  const handleCartDisable = () => {
    let qtyError: any = [];
    cartListingItems?.categories?.map((category: any, idx: number) =>
      category?.orders?.map((item: any) => {
        qtyError = [...qtyError, item?.qty === 0];
      })
    );
    return qtyError?.filter((item: any) => item !== false)?.length !== 0;
  };
  const goToCheckout = () => {
    router.push('/checkout');
  };
  return (
    <div className="my-4">
      <div className="col-md-6">
        <div className="row">
          <div className="col-7">
            <span className="fw-bold text-uppercase">subtotal</span>
            <span>(including tax) </span>
          </div>
          <div className="col-4">: ₹{cartListingItems?.grand_total_including_tax}</div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-7">
            <span className="fw-bold text-uppercase">subtotal</span>
            <span>(excluding tax) </span>
          </div>
          <div className="col-4">: ₹{cartListingItems?.grand_total_excluding_tax}</div>
        </div>
      </div>
      <button className={`mt-3 ${styles.checkout_btn}`} disabled={handleCartDisable()} onClick={() => goToCheckout()}>
        Check out
      </button>
    </div>
  );
};

export default CartSubtotal;
