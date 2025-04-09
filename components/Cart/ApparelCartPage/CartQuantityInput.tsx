import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import styles from '../../../styles/components/cartlist.module.scss';
import { RiDeleteBinLine } from 'react-icons/ri';

interface CartQuantityPropsTypes {
  orderData: any;
  handleQtyBlur: any;
  handleQtyInputChange: any;
  handleQtyButtonClick: any;
  handleRemoveItem: any;
}

const CartQuantityInput = ({
  orderData,
  handleQtyBlur,
  handleQtyInputChange,
  handleQtyButtonClick,
  handleRemoveItem,
}: CartQuantityPropsTypes) => {
  return (
    <>
      <div className={`position-relative d-flex align-items-center ${styles.qty_container}`}>
        {orderData?.qty <= 1 ? (
          <span className={`cursor-pointer ${styles.qty_decrease}`} onClick={() => handleRemoveItem(orderData?.item_code)}>
            <RiDeleteBinLine />
          </span>
        ) : (
          <FaMinus
            className={`cursor-pointer ${styles.qty_decrease}`}
            onClick={() => {
              handleQtyButtonClick(orderData.item_code, orderData.qty - 1);
            }}
          />
        )}
        <input
          className={`rounded-5 fw-bold w-100 text-center ${styles.qty_field}`}
          id="productQuantity"
          name="quantity"
          value={orderData?.qty}
          onChange={(e) => handleQtyInputChange(orderData.item_code, e.target.value)}
          onBlur={(e) => handleQtyBlur(orderData.item_code, e.target.value)}
        />
        <FaPlus
          className={`cursor-pointer ${styles.qty_increase}`}
          onClick={() => handleQtyButtonClick(orderData.item_code, orderData.qty + 1)}
        />
      </div>
    </>
  );
};

export default CartQuantityInput;
