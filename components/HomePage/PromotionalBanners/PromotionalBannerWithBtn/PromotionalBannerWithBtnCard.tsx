import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';
import styles from '../../../../styles/components/promotionalBanner.module.scss';
import { imageLoader } from '../../../../utils/image_loader';

function PromotionalBannerWithBtnCard({ data }: any) {
  return (
    <>
      <div className={styles.banner_img_container}>
        <Image
          src={data?.image}
          alt="banner-img"
          className={`w-100 h-100 ${styles.banner_img}`}
          width={100}
          height={100}
          loader={imageLoader}
        />

        <div className={`${styles.featured_banner_info}`}>
          <p className="m-0 mb-2">{data.description}</p>
          <p className={`${styles.featured_banner_heading} fw-bold m-0 mb-3`}>{data.title}</p>
          <button className={`${styles.featured_shop_now_btn} px-4`}>
            <span>Shop Now</span>
            <span className="ps-2">
              <FaArrowRightLong />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default PromotionalBannerWithBtnCard;
