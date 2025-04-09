import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { imageLoader } from '../../../../utils/image_loader';
import styles from '../../..//../styles/components/jewelleryProductCard.module.scss';
interface VariantsWithImagesPropTypes {
  data: any;
  handleRedirectToProductDetailPage: () => string;
  selectedItem: any;
  handleSelectVariant: (data: any) => void;
}
function VariantsWithImages({ data, handleRedirectToProductDetailPage, selectedItem, handleSelectVariant }: VariantsWithImagesPropTypes) {
  return (
    <>
      <div className="d-flex justify-content-start mb-4">
        {data?.variant?.length > 0 &&
          data?.variant?.map((variantItem: any) => (
            <Link href={handleRedirectToProductDetailPage()} onMouseEnter={() => handleSelectVariant(variantItem)}>
              {variantItem?.image && (
                <Image
                  src={variantItem?.image[0]}
                  className={styles.tabProductVariantImage}
                  // className={`${styles.tabProductVariantImage} ${
                  //   selectedItem?.colour_attr_colour === colour ? styles?.borderActive : styles?.borderInactive
                  // }`}
                  alt="variant-image"
                  width={0}
                  height={0}
                  loader={imageLoader}
                />
              )}
            </Link>
          ))}
      </div>
    </>
  );
}

export default VariantsWithImages;
