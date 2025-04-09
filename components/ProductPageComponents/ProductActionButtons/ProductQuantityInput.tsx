import React from 'react';
import styles from '../../../styles/components/customQuantityInputField.module.scss';
import { FaMinus, FaPlus } from 'react-icons/fa6';

interface ProductQuantityInputPropTypes {
  qty: number | string;
  handleQtyModificationOnInputEdit: (e: any) => void;
  handleQtyModificationOnButtonClick: (action: string) => void;
}

const ProductQuantityInput = ({
  qty,
  handleQtyModificationOnInputEdit,
  handleQtyModificationOnButtonClick,
}: ProductQuantityInputPropTypes) => {
  return (
    <>
      <div className={`pb-2`}>
        <FaMinus className={`cursor-pointer ${styles.quantity_decrease}`} onClick={() => handleQtyModificationOnButtonClick('decrease')} />
        <input
          className={`rounded-5 fw-bold ${styles.quantity_input}`}
          id="productQuantity"
          name="quantity"
          value={qty}
          onChange={(e) => handleQtyModificationOnInputEdit(e)}
        />
        <FaPlus className={`cursor-pointer ${styles.quantity_increase}`} onClick={() => handleQtyModificationOnButtonClick('increase')} />
      </div>
    </>
  );
};

export default ProductQuantityInput;
