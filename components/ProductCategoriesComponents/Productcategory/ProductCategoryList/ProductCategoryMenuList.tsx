"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  resetBreadcrumb,
  setLevel,
  setSelectedCategory,
  setSelectedSubCategory,
  setSelectedSubSubCategory,
} from "../../../../store/slices/category-breadcrumb-slice/category-breadcrumb-slice";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Link from "next/link";
import style from "../../../../styles/components/sliderNavbar.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CategoryMenuListSkeleton from "./CategoryMenuListSkeleton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ProductCategoryMenuList = ({ navbarData, isLoading }: any) => {
  const dispatch = useDispatch();
  const {
    level,
    selectedCategory,
    selectedSubCategory,
    selectedSubSubCategory,
  } = useSelector((state: any) => state.categoryBreadcrumb);

  const router = useRouter();
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);
  const { asPath, query } = router;

  // Ref to track if the navigation was triggered manually
  const manualSelectRef = useRef({
    top: false,
    sub: false,
    subsub: false,
  });

  useEffect(() => {
    if (!asPath.startsWith("/product-category")) {
      dispatch(resetBreadcrumb());
      return;
    }
    if (!navbarData || navbarData.length === 0) return;

    // Skip auto sync if a manual navigation was done
    if (
      manualSelectRef.current.top ||
      manualSelectRef.current.sub ||
      manualSelectRef.current.subsub
    ) {
      manualSelectRef.current = { top: false, sub: false, subsub: false };
      return;
    }

    const slug = asPath.split("/product-category/")[1]?.split("?")[0];
    if (!slug) return;

    for (const category of navbarData) {
      if (category.slug === slug) {
        dispatch(setSelectedCategory(category));
        dispatch(setLevel("top"));
        return;
      }

      if (category.values?.length) {
        for (const sub of category.values) {
          if (sub.slug === slug) {
            dispatch(setSelectedCategory(category));
            dispatch(setSelectedSubCategory(sub));
            dispatch(setLevel("sub"));
            return;
          }

          if (sub.values?.length) {
            for (const subsub of sub.values) {
              if (subsub.slug === slug) {
                dispatch(setSelectedCategory(category));
                dispatch(setSelectedSubCategory(sub));
                dispatch(setSelectedSubSubCategory(subsub));
                dispatch(setLevel("subsub"));
                return;
              }
            }
          }
        }
      }
    }
  }, [asPath, navbarData, dispatch]);

  const navigateTo = (item: any) => {
    const baseUrl = item?.url
      ? item.url
      : "/product-category/" + item?.slug;
    const queryParams = new URLSearchParams({
      page: "1",
      currency: "INR",
      ...(query.vehicle_filters && { vehicle_filters: query.vehicle_filters as string }),
    }).toString();
    const url = `${baseUrl}?${queryParams}`;
    router.push(url);
  };

  const handleTopCategoryClick = (item: any) => {
    manualSelectRef.current.top = true;
    dispatch(setSelectedCategory(item));
    dispatch(setSelectedSubCategory(null));
    dispatch(setSelectedSubSubCategory(null));
    dispatch(setLevel("sub"));
    navigateTo(item);
  };

  const handleSubCategoryClick = (subItem: any) => {
    manualSelectRef.current.sub = true;
    dispatch(setSelectedSubCategory(subItem));
    dispatch(setSelectedSubSubCategory(null));
    dispatch(setLevel("subsub"));
    navigateTo(subItem);
  };

  const handleSubSubCategoryClick = (subSubItem: any) => {
    manualSelectRef.current.subsub = true;
    dispatch(setSelectedSubSubCategory(subSubItem));
    navigateTo(subSubItem);
  };

  const renderItems = () => {
    const queryParams = new URLSearchParams({
      page: "1",
      currency: "INR",
      ...(query.vehicle_filters && { vehicle_filters: query.vehicle_filters as string }),
    }).toString();

    if (level === "top") {
      return (
        navbarData?.length > 0 &&
        navbarData.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Link
              href={`${item?.url}?${queryParams}`}
              className={`d-flex align-items-center text-decoration-none mb-2 btn ${style.capsule_btn}`}
              onClick={() => handleTopCategoryClick(item)}
            >
              {item?.label}
            </Link>
          </SwiperSlide>
        ))
      );
    }

    if (level === "sub" && selectedCategory) {
      return selectedCategory?.values?.map((subItem: any, index: number) => (
        <SwiperSlide key={index}>
          <Link
            href={`${subItem?.url}?${queryParams}`}
            className={`d-flex align-items-center text-decoration-none mb-2 btn ${style.capsule_btn}`}
            onClick={() => handleSubCategoryClick(subItem)}
          >
            {subItem?.label}
          </Link>
        </SwiperSlide>
      ));
    }

    if (level === "subsub" && selectedSubCategory) {
      return selectedSubCategory?.values?.map((subSubItem: any, index: number) => (
        <SwiperSlide key={index}>
          <Link
            href={`${subSubItem?.url}?${queryParams}`}
            className={`d-flex align-items-center text-decoration-none mb-2 btn ${style.capsule_btn}`}
            onClick={() => handleSubSubCategoryClick(subSubItem)}
          >
            {subSubItem?.label}
          </Link>
        </SwiperSlide>
      ));
    }

    return null;
  };

  if (isLoading) {
    return (
      <>
        <CategoryMenuListSkeleton />
      </>
    );
  }

  return (
    <div className="w-100">
      <div className="container position-relative py-2 px-0 product_category_container"
        style={{ width: "80%", marginLeft: "70px",}}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={6}
          slidesPerGroup={2}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              slidesPerGroup: 1,
            },
            464: {
              slidesPerView: 3,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: 6,
              slidesPerGroup: 2,
            },
          }}
          className="mySwiper"
        >
          {renderItems()}

          <div className="swiper-button-prev position-absolute start-0 top-50 translate-middle-y zindex-10 bg-light rounded-circle p-2">
            <FiChevronLeft size={50} className="text-white" />
          </div>

          <div className="swiper-button-next position-absolute end-0 top-50 translate-middle-y zindex-10 bg-light rounded-circle p-2">
            <FiChevronRight size={32} className="text-white" />
          </div>
        </Swiper>
      </div>
    </div>

  );
};

export default ProductCategoryMenuList;