import Image from 'next/image';
import React from 'react';
import styles from '../styles/components/home.module.scss';
import { dateFormat } from '../utils/dataFormat';
import { imageLoader } from '../utils/image_loader';
function BlogCard({ blog }: any) {
  return (
    <>
      <div className={`${styles.blog_banner_image_container}`}>
        <Image
          src={blog.custom_image}
          loader={imageLoader}
          alt="blog-image"
          className={`w-100 cursor-pointer ${styles.blog_banner_image} `}
          width={100}
          height={277.5}
          objectFit="cover"
          loading="eager"
          priority={true}
        />
      </div>
      <div className="">
        <p className={`${styles.blog_heading1}`}>
          <span className="text-secondary fs-14">on</span> {dateFormat(blog?.published_on)}
        </p>
        <p className={`m-0  ${styles.blog_heading2} font-poppins`}>{blog?.title}</p>
      </div>
      <div className={`${styles?.blog_description} `}>
        <p>{blog?.blog_intro}</p>
      </div>
    </>
  );
}

export default BlogCard;
