"use client"
import { useState } from "react"
import SubProductList from "./SubProductList";
import CategoryMenuListSkeleton from './CategoryMenuListSkeleton'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import style from '../../../../styles/components/ProductCategoryMenuList.module.scss';

const ProductCategoryMenuList = ({ navbarData, isLoading }: any) => {
  const [activeCategory, setActiveCategory] = useState("")
  const [subMenuList, setSubMenuList] = useState<any>([])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const handleMouseEnter = (item: any) => {
    setActiveCategory(item?.label)
    setSubMenuList(item?.values)
  }

  if (isLoading) {
    return <CategoryMenuListSkeleton />;
  }

  return (
    <div className="w-100">
      {/* Main Navigation Bar */}
      <div className="border-bottom">
        <div className={`container position-relative py-2 px-0 product_category_container`}>
          <Carousel
            responsive={responsive}
            arrows={true}
            infinite={false}
            draggable={true}
            swipeable={true}
            keyBoardControl={true}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-10-px"
          >
            {navbarData?.length > 0 && navbarData.map((item: any, index: number) => {
              const isActive = activeCategory === item?.label;
              const isSale = item?.label.toLowerCase() === "sale";
              return (
                <div
                  key={index}
                  className={`px-3 py-2 text-nowrap fw-medium ${style.category_tab} ${isSale ? "text-danger" : isActive ? style.active_tab : "text-dark"
                    }`}
                  onMouseEnter={() => handleMouseEnter(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item?.label}
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
      {/* Mega Menu Dropdown */}
      <SubProductList subMenuList={subMenuList} />
    </div>
  )
}

export default ProductCategoryMenuList;




