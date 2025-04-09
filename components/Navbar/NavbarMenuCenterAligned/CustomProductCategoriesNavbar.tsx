import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Overlay, Placeholder, Popover } from 'react-bootstrap';
import stylesHeader from '../../../styles/components/header.module.scss';

function CustomProductCategoriesNavbar({
  navbarData,
  isLoading,
  errorMessage,
  multiLanguagesData,
  selectedLang,
  handleLanguageChange,
}: any) {
  const [showPopoverIndex, setShowPopoverIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowPopoverIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (index: number) => {
    setShowPopoverIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle popover
  };

  const skeletonLoader = (
    <div className="py-3">
      <Placeholder animation="glow">
        <Placeholder xs={6} style={{ height: '20px', width: '20%' }} />
      </Placeholder>

      <hr style={{ width: '30%' }} />
      {[1, 2, 3].map((item: any) => (
        <div className="mt-1">
          <Placeholder animation="glow">
            <Placeholder xs={6} style={{ height: '20px', width: '25%' }} />
          </Placeholder>
        </div>
      ))}

      <Placeholder as="div" animation="wave" className="mb-2" style={{ width: '80%' }} />
      <Placeholder as="div" animation="wave" className="mb-2" style={{ width: '60%' }} />
      <Placeholder as="div" animation="wave" style={{ width: '90%' }} />
    </div>
  );

  const popoverBottom = (item: any) => (
    <Popover
      id={`popover-${item.label}`}
      className={`p-2 ${stylesHeader.category_popover} shadow rounded`}
      style={{
        maxWidth: '900px', // Maximum width for responsiveness
        // width: '100%', // Full width for smaller screens
        width: '1105px', // Maximum width for responsiveness
        position: 'absolute',
        // top: '100%', // Position below the nav bar
        top: '26px', // Position below the nav bar
        left: '50%', // Center horizontally
        transform: 'translateX(-50%)', // Center alignment
        zIndex: 1050, // Ensure it's above other elements
      }}
    >
      {isLoading ? (
        skeletonLoader
      ) : (
        <div className="row">
          {item?.values?.length > 0 &&
            item?.values.map((itemL2: any, index: number) => {
              const columnCount = Math.ceil(itemL2?.values?.length / 8);
              return (
                <div key={index} className="col">
                  <div className={` w-25`}>
                    <Link
                      href={{
                        pathname: `${itemL2?.url}`,
                        query: { page: '1', currency: 'INR' },
                      }}
                      prefetch={true}
                      className={`label text-dark text-decoration-none ${stylesHeader.heading_category_custom_l2}`}
                      onClick={() => setShowPopoverIndex(null)}
                    >
                      {itemL2?.label}
                    </Link>
                    <hr className="grey" />
                  </div>
                  <div className={stylesHeader.col_container}>
                    {Array.from({ length: columnCount }, (_, columnIndex) => (
                      <div key={columnIndex} className={stylesHeader.column}>
                        {itemL2?.values?.slice(columnIndex * 8, (columnIndex + 1) * 8).map((itemL3: any, idx: number) => (
                          <div key={idx} className={`pb-3 ${stylesHeader.sub_menu}`}>
                            <Link
                              href={{
                                pathname: `${itemL3?.url}`,
                                query: { page: '1', currency: 'INR' },
                              }}
                              prefetch={true}
                              className={`${stylesHeader.heading_category_custom_l3} `}
                              onClick={() => setShowPopoverIndex(null)}
                            >
                              {itemL3?.label !== undefined ? itemL3?.label : `${idx}`}
                            </Link>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </Popover>
  );

  const handleDataRendering = () => {
    if (isLoading) {
      return <h4>Loading</h4>;
    }
    if (navbarData?.length > 0) {
      return (
        <header>
          <nav ref={ref} className="w-100 position-relative">
            <div className="theme-blue fw-bold fs-18">
              <div className="row w-100 d-flex justify-content-around">
                <div className="col-xl-10 col-lg-12">
                  <div className="d-flex">
                    {navbarData?.map((item: any, index: number) => (
                      <div key={index} className="cursor-pointer">
                        {navbarData === null ? (
                          <Placeholder xs={6} bg="dark" />
                        ) : (
                          <div
                            className={` d-flex align-items-center ${showPopoverIndex === index && 'theme-gold'} ${stylesHeader.navbar_category_items}`}
                            onClick={() => handleItemClick(index)}
                          >
                            {item.label}
                          </div>
                        )}
                        {showPopoverIndex === index && popoverBottom(item)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      );
    }
  };

  return <header>{handleDataRendering()}</header>;
}

export default CustomProductCategoriesNavbar;
