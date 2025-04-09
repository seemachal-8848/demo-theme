import React from 'react';
import Image from 'next/image';
// import image from '../public/assets/images/no-data.png';
import { useRouter } from 'next/router';
import image from '../public/assets/images/no-data-found.svg';
import styles from '../styles/components/noData.module.scss';

const NoDataFound = ({ title, message }: any) => {
  const router = useRouter();

  return (
    <>
      <div className={styles.no_data_state}>
        <div className={styles.no_data_content}>
          <div className={styles.no_data_icon}>
            {/* <Image src={image} width={250} height={250} alt="No Data Image" /> */}
            <Image src={image} width={178} height={178} alt="No Data Image" />
          </div>
          <div className={`${styles.no_data_state_message} `}>{title}</div>
          <div className={styles.no_data_state_help}>{message}</div>
          <button className={`${styles.no_data_found_btn} mt-4`} onClick={() => router.push('/')}>
            <div className={`${styles.no_data_found_btn_text} font-poppins`}>Back to Home</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default NoDataFound;
