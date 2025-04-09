import React, { ReactNode } from 'react';
import styles from '../../../styles/components/productCardListView.module.scss';
import Link from 'next/link';

interface ProductListViewActionButtonsPropTypes {
  handleRedirectToProductDetailPage: any;
  handleAddToProductData: () => void;
  handleRenderCartBtnText: () => ReactNode;
}
const ProductListViewActionButtons = ({
  handleRedirectToProductDetailPage,
  handleAddToProductData,
  handleRenderCartBtnText,
}: ProductListViewActionButtonsPropTypes) => {
  return (
    <div>
      <Link href={handleRedirectToProductDetailPage()}>
        <button className={`${styles.quick_shop_btn} mb-2 w-100`}>
          <span>Quick View</span>
        </button>
      </Link>
      <button className={`${styles.add_to_cart_btn} w-100`} onClick={handleAddToProductData}>
        {handleRenderCartBtnText()}
      </button>
    </div>
  );
};

export default ProductListViewActionButtons;
