import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Placeholder, Popover } from 'react-bootstrap';
import stylesHeader from '../../styles/components/header.module.scss';

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

  const popoverBottom = (item: any) => (
    <Popover
      id={`popover-${item.label}`}
      className={`p-2 ${stylesHeader.category_popover} shadow rounded`}
      style={{
        maxWidth: '900px', // Maximum width for responsiveness
        width: '100%', // Full width for smaller screens
        width: '100% ', // Full width for smaller screens
        position: 'absolute',
        top: '100%', // Position below the nav bar
        left: '50%', // Center horizontally
        transform: 'translateX(-50%)', // Center alignment
        // left: '50%', // Center horizontally
        // transform: 'translateX(-50%)', // Center alignment
        zIndex: 1050, // Ensure it's above other elements
      }}
    >
      <div className="row">
        {item?.values?.length > 0 &&
          item?.values.map((itemL2: any, index: number) => {
            const columnCount = Math.ceil(itemL2?.values?.length / 8);
            return (
              <div key={index} className="col">
                <div className={stylesHeader.heading_category_l2}>
                  <Link
                    href={{
                      pathname: `${itemL2?.url}`,
                      query: { page: '1', currency: 'INR' },
                    }}
                    prefetch={true}
                    className="label text-dark text-decoration-none navbar_category"
                    onClick={() => setShowPopoverIndex(null)}
                  >
                    {itemL2?.label}
                  </Link>
                </div>
                <div className={stylesHeader.col_container}>
                  {Array.from({ length: columnCount }, (_, columnIndex) => (
                    <div key={columnIndex} className={stylesHeader.column}>
                      {itemL2?.values?.slice(columnIndex * 8, (columnIndex + 1) * 8).map((itemL3: any, idx: number) => (
                        <div key={idx}>
                          <Link
                            href={{
                              pathname: `${itemL3?.url}`,
                              query: { page: '1', currency: 'INR' },
                            }}
                            prefetch={true}
                            className={`${stylesHeader.heading_category_l3} `}
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
    </Popover>
  );

  const handleDataRendering = () => {
    if (isLoading) {
      return <h4>Loading</h4>;
    }
    if (navbarData?.length > 0 && navbarData[0]?.values && navbarData[0]?.values?.length > 0) {
      return (
        <header>
          <nav ref={ref} className="w-100 position-relative">
            <div className="theme-blue fw-bold fs-18">
              <div className="row w-100 d-flex justify-content-around">
                <div className="col-xl-10 col-lg-12">
                  <div className="d-flex">
                    {navbarData[0]?.values?.map((item: any, index: number) => (
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
