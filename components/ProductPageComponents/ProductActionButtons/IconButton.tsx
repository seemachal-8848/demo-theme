import React from 'react';
import { FiHeart } from 'react-icons/fi';
import styles from '../../../styles/components/productPage.module.scss';
import { IoMdShuffle } from 'react-icons/io';

const IconButton = () => {
  return (
    <div className="d-flex ">
      <button className={`${styles.iconButton} ms-3 ms-sm-0 me-sm-3`}>
        <FiHeart className={`${styles.icon}`} />
      </button>
      <button className={`${styles.iconButton} ms-3 ms-sm-0 me-3 `}>
        <IoMdShuffle className={`${styles.icon}`} />
      </button>
    </div>
  );
};

export default IconButton;
