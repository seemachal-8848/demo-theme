import React from 'react';
import BlogCard from '../../../../cards/BlogCard';
import styles from '../../../../styles/components/home.module.scss';

function BlogSectionCardContainer({ blogData }: any) {
  return (
    <div className="custom-container-xl">
      <div className="my-5">
        <div className={`${styles.featuredCollectionTitle} fw-bold w-100 text-center`}>
          <span className={styles.horizontal_line}></span>
          <span className={`text-center  font-poppins text-uppercase ${styles.horizontal_space} fw-600`}>From The Blogs</span>
          <span className={styles.horizontal_line}></span>
        </div>
        <h6 className="text-secondary text-center mb-4 px-2 fs-14">The freshest and most exciting news</h6>

        <div className="row pt-2">
          {blogData?.length > 0 &&
            blogData?.map((blog: any, index: any) => (
              <div className="col-md-4 col-sm-6 col-12 px-3" key={index}>
                <BlogCard blog={blog} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BlogSectionCardContainer;
