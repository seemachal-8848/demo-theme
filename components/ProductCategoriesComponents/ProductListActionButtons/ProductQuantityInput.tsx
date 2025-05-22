import React from 'react';
import styles from '../../../styles/components/customQuantityInputField.module.scss';
import { FaMinus, FaPlus } from 'react-icons/fa6';

interface ProductQuantityInputPropTypes {
  qty: number | string;
  handleQtyInputBlur: (e: any) => void;
  handleQtyModificationOnInputEdit: (e: any) => void;
  handleQtyModificationOnButtonClick: (action: string) => void;
}

const ProductQuantityInput = ({
  qty,
  handleQtyModificationOnInputEdit,
  handleQtyInputBlur,
  handleQtyModificationOnButtonClick,
}: ProductQuantityInputPropTypes) => {
  return (
    <>
      <div className={`pb-2`}>
        <FaMinus className={`cursor-pointer ${styles.quantity_decrease}`} onClick={() => handleQtyModificationOnButtonClick('decrease')} />
        <input
          className={`rounded-5 fw-bold ${styles.quantity_input}`}
          style={{ width: '90px', height: '35px' }}
          id="productQuantity"
          name="quantity"
          value={qty}
          onChange={(e) => handleQtyModificationOnInputEdit(e)}
          onBlur={(e) => handleQtyInputBlur(e)}
        />
        <FaPlus className={`cursor-pointer ${styles.quantity_increase}`} onClick={() => handleQtyModificationOnButtonClick('increase')} />
      </div>
    </>
  );
};

export default ProductQuantityInput;