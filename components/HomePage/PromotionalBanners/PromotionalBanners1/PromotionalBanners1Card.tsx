import Image from 'next/image';
import React from 'react';
import styles from '../../../../styles/components/home.module.scss';
import { imageLoader } from '../../../../utils/image_loader';

function PromotionalBanners1Card({ data }: any) {
  return (
    <>
      {data?.sequence === 1 ? (
        <div className={`position-relative ${styles.promotional_banner_image_container}`}>
          <Image
            loader={imageLoader}
            className={`w-100 ${styles.promotional_banner_image} `}
            src={data.image}
            alt={'banner_image'}
            objectFit="cover"
            width={100}
            height={300}
            loading="eager"
            priority={true}
          />
          <div className={`${styles.featured_banner_info} text-center`}>
            <p className={`m-0 mb-1 ${styles.featured_banner_title1}`}>{data?.title}</p>
            <p className={`${styles.featured_banner_heading} ${styles.featured_banner_description1} m-0 mb-2`}>{data?.description}</p>
          </div>
        </div>
      ) : (
        <div className={`position-relative ${styles.promotional_banner_image_container}`}>
          <Image
            loader={imageLoader}
            className={`w-100 ${styles.promotional_banner_image} `}
            src={data.image}
            alt={'banner_image'}
            objectFit="cover"
            width={100}
            height={300}
            loading="eager"
            priority={true}
          />
          <div className={`${styles.featured_banner_info} text-center`}>
            <p className={`m-0 mb-1 ${styles.featured_banner_title2}`}>{data?.title}</p>
            <p className={`${styles.featured_banner_heading} ${styles.featured_banner_description2} fw-bold  m-0 mb-2`}>
              {data?.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
export default PromotionalBanners1Card;
