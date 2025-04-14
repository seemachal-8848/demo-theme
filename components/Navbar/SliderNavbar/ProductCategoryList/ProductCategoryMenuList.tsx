"use client"
import { useState } from "react"
import SubProductList from "./SubProductList";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import style from '../../../../styles/components/ProductCategoryMenuList.module.scss';

const SubMenuList = [
    {
        title: "Wall Décor",
        links: [
            "Wall & Display Shelves",
            "Wall Accents",
            "Wallpaper",
            "Peel & Stick Wallpaper",
            "Tapestries",
            "Wall Decals",
            "Wall Décor Sale",
        ],
    },
    {
        title: "Art",
        links: [
            "All Wall Art",
            "Art by Subject",
            "Art by Type",
            "Art by Room",
            "Wall Art Sale",
        ],
    },
    {
        title: "Mirrors",
        links: [
            "All Mirrors",
            "Wall Mirrors",
            "Vanity & Dresser Mirrors",
            "Full Length Mirrors",
            "Mirrors Sale",
        ],
    },
    {
        title: "Home Accessories",
        links: [
            "Vases, Urns, Jars & Bottles",
            "Decorative Objects",
            "Decorative Trays",
            "Globes",
            "Decorative Boxes",
            "Home Accessories Sale",
        ],
    },
    {
        title: "Flowers & Plants",
        links: [
            "Faux Plants",
            "Faux Trees",
            "Faux Flowers",
            "Live Plants",
            "Indoor Planters",
            "Flowers & Plants Sale",
        ],
    },
    {
        title: "Window Treatments",
        links: [
            "Curtains & Drapes",
            "Blinds & Shades",
            "Window Treatments Sale",
        ],
    },
    {
        title: "Decorative Pillows & Blankets",
        links: [
            "Throw Pillows",
            "Throw Blankets",
            "Decorative Pillows & Blankets Sale",
        ],
    },
];

const mainCategories = [
    "Furniture",
    "Outdoor",
    "Bedding",
    "Rugs",
    "Pillows",
    "Lighting",
    "Organization",
    "Kitchen",
    "Baby",
    "Home",
    "Furniture",
    "Outdoor",
    "Bedding",
    "Rugs",
    "Pillows",
    "Lighting",
    "Organization",
    "Kitchen",
    "Baby",
    "Home",
]

const ProductCategoryMenuList = ({navbarData}:any) => {
    const [activeCategory, setActiveCategory] = useState("")

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 10,
          slidesToSlide: 2,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 5,
          slidesToSlide: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 3,
          slidesToSlide: 1,
        },
      };
      

   

    const handleMouseEnter = (menu: string) => {
        setActiveCategory(menu)
    }

    return (
        <div className="w-100">
            {/* Main Navigation Bar */}
            <div className="border-bottom position-relative">
      <div className={`container py-2 product_category_container`}>
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
          {mainCategories.map((category: string) => {
            const isActive = activeCategory === category;
            const isSale = category.toLowerCase() === "sale";
            return (
              <div
                key={category}
                className={`px-3 py-2 text-nowrap fw-medium ${style.category_tab} ${
                  isSale ? "text-danger" : isActive ? style.active_tab : "text-dark"
                }`}
                onMouseEnter={() => handleMouseEnter(category)}
                style={{ cursor: "pointer" }}
              >
                {category}
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>


            {/* Mega Menu Dropdown */}
            {activeCategory === "Pillows" && (
                <SubProductList SubMenuList={SubMenuList} />
            )}
        </div>
    )
}

export default ProductCategoryMenuList;




