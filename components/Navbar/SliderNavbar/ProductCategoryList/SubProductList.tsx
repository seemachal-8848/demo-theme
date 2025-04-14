import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import style from '../../../../styles/components/ProductCategoryMenuList.module.scss';

const SubProductList = ({ SubMenuList }: any) => {
  return (
    <div className="border-bottom shadow-sm bg-white">
      <div className="container py-4">
        <div className="row g-4">
          {SubMenuList.map((section: any, index: any) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="d-flex align-items-center mb-2">
                <h6 className={`fw-bold ${style.text_purple} mb-0`}>{section.title}</h6>
                <FaChevronRight className={`ms-1 ${style.text_purple}`} size={12} />
              </div>
              <ul className="list-unstyled">
                {section.links.map((link: string, idx: number) => {
                  const isSale = link.toLowerCase().includes('sale');
                  return (
                    <li key={idx} className={`mb-1`}>
                      <Link
                        href="#"
                        className={`d-block text-decoration-none ${isSale ? 'text-danger fw-normal' : 'text-dark'
                          }`}
                        style={{
                          fontWeight: isSale ? 'normal' : '400',
                          fontSize: isSale ? '0.9rem' : '0.95rem',
                          color: isSale ? '#c41c1c' : undefined,
                        }}
                      >
                        {link}
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




