import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import style from '../../../../styles/components/ProductCategoryMenuList.module.scss';

const SubProductList = ({ subMenuList }: any) => {
  return (
    <div
    className="position-absolute start-0 end-0 shadow-sm bg-white product_menu_dropdown"
    style={{ top: '100%', zIndex: 1050,maxHeight:'400px',overflowX:'auto' }}
  >
    <div className="container py-4 px-5">
      <div className="row g-4">
        {subMenuList.map((subMenu: any, index: any) => (
          <div key={index} className="col-12 col-md-6 col-lg-3">
            <Link
              href={`${subMenu?.url}?page=1&currency=INR`}
              className="d-flex align-items-center text-decoration-none mb-2"
            >
              <h6 className={`fw-bold ${style.text_purple} mb-0`}>{subMenu?.label}</h6>
              <FaChevronRight className={`ms-1 ${style.text_purple}`} size={12} style={{ alignSelf: 'baseline', marginTop: '4px' }} />
            </Link>
            <ul className="list-unstyled">
              {subMenu?.values.map((item: any, index: number) => {
                const isSale = item?.label.toLowerCase().includes('sale');
                return (
                  <li key={index} className={`mb-1 ${style.sub_menu_items}`}>
                    <Link
                      href={`${item?.url}?page=1&currency=INR`}
                      className={`d-block text-decoration-none ${isSale ? 'text-danger fw-normal' : 'text-dark'}`}
                      style={{
                        fontWeight: isSale ? 'normal' : '400',
                        fontSize: isSale ? '0.9rem' : '0.95rem',
                        color: isSale ? '#c41c1c' : undefined,
                      }}
                    >
                      {item?.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default SubProductList;




