import Link from 'next/link';
import { ReactNode } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { GrCatalogOption } from 'react-icons/gr';
import { IoEyeOutline } from 'react-icons/io5';
import styles from '../../../../styles/components/jewelleryProductCard.module.scss';

interface JewelleryVariantImageCardActionButtonsPropTypes {
  handleRedirectToProductDetailPage: () => string;
  handleAddToProductData: () => void;
  handleRenderCartBtnText: () => ReactNode;
  handleRenderIcon: () => any;
}

const JewelleryVariantImageCardActionButtons = ({
  handleRedirectToProductDetailPage,
  handleAddToProductData,
  handleRenderCartBtnText,
  handleRenderIcon,
}: JewelleryVariantImageCardActionButtonsPropTypes) => {
  const tooltip = (name: string) => (
    <Tooltip id="tooltip">
      <strong>{name}</strong>
    </Tooltip>
  );

  return (
    <div className={styles.button_container}>
      <Link href={handleRedirectToProductDetailPage()}>
        <OverlayTrigger placement="top" overlay={tooltip('Quick View')}>
          <div className={`${styles.icon_btn_container} me-1 mx-md-2`}>
            <IoEyeOutline />
          </div>
        </OverlayTrigger>
      </Link>
      <div onClick={handleAddToProductData}>
        <OverlayTrigger placement="top" overlay={tooltip('Quick Shop')}>
          <div className={`${styles.icon_btn_container} me-1 mx-md-2`}>{handleRenderCartBtnText()}</div>
        </OverlayTrigger>
      </div>
      <OverlayTrigger placement="top" overlay={tooltip('Add To Wishlist')}>
        <div className={`${styles.icon_btn_container} me-1 mx-md-2`}>{handleRenderIcon()}</div>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={tooltip('Add To Catalog')}>
        <div className={`${styles.icon_btn_container} me-1 mx-md-2`}>
          <GrCatalogOption />
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default JewelleryVariantImageCardActionButtons;
