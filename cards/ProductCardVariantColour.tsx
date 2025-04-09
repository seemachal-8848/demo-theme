import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { IoCartOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import VariantProductCardsButton from '../components/ButtonComponent/VariantProductCardsButton';
import FeaturedCollectionWithVariantProductCardColour from '../components/HomePage/FeaturedCollections/FeaturedCollectionWithVariantColour/FeaturedCollectionWithVariantProductCardColour';
import useAddToWishlist from '../hooks/WishlistHooks/useAddToWishlistHook';
import noImage from '../public/assets/images/no_image.png';
import styles from '../styles/components/variantProductCards.module.scss';
import { imageLoader } from '../utils/image_loader';
import Link from 'next/link';

interface ProductCardVariantPropsTypes {
  data: any;
  wishlistData: any;
  cartData?: any;
  addToCartItem: (item: any, props: any) => void;
  getPartyName: string | null;
  isSuperAdmin?: string;
  handleDeleteCatalogItem?: (category: string | string[] | undefined, name: string) => void;
  handleShowCatalogModal?: (name: string) => void;
}

interface VariantTypes {
  image?: string[];
  variant_code?: string;
  slug?: string;
  Colour?: string;
  colour_attr_colour?: string;
  stock?: boolean;
}

const ProductCardVariantColour = ({
  data,
  wishlistData,
  cartData,
  addToCartItem,
  getPartyName,
  isSuperAdmin,
  handleDeleteCatalogItem,
  handleShowCatalogModal,
}: ProductCardVariantPropsTypes) => {
  const router = useRouter();
  const { handleAddToWishList, handleRemoveFromWishList } = useAddToWishlist();
  const [addToCartLoaderBtn, setAddToCartLoaderBtn] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<VariantTypes>({});

  const handleRedirectToProductDetailPage = () => {
    if (selectedItem?.slug) {
      const splitedUrl = data?.url?.split('/');
      splitedUrl?.pop(); // Remove last segment (slug)
      return `${splitedUrl?.join('/')}/${selectedItem?.slug}`;
    }
    return data?.url;
  };

  const handleSelectVariant = (colour: string) => {
    const variant = data?.variant?.find((v: VariantTypes) => v.colour_attr_colour === colour);
    if (variant) {
      setSelectedItem(variant);
    }
  };

  let wishProducts: any;
  const handleRenderIcon = () => {
    {
      wishlistData?.length > 0 &&
        wishlistData?.map((item: any) => {
          if (item.name === data?.name) {
            wishProducts = item?.name;
          }
        });
    }
    if (!wishProducts) {
      return (
        <span className={` text-black `}>
          <FaRegHeart onClick={() => handleAddToWishList(data)} />
        </span>
      );
    } else {
      if (router?.asPath?.startsWith('/wishlist')) {
        return (
          <span className={` text-secondary `}>
            <RiDeleteBinLine onClick={() => handleRemoveFromWishList(data?.name)} />
          </span>
        );
      } else {
        return (
          <span className={` text-black `}>
            <FaHeart onClick={() => handleRemoveFromWishList(data?.name)} />
          </span>
        );
      }
    }
  };
  let cartProducts: any;
  const handleRenderCartBtnText = () => {
    {
      cartData?.length > 0 &&
        cartData?.map((item: any) => {
          if (item === data?.name) {
            cartProducts = item;
          }
        });
    }
    if (!cartProducts) {
      return (
        <>
          {addToCartLoaderBtn ? (
            <div className={`spinner-border spinner-border-sm `} role="status"></div>
          ) : (
            <>
              <span className={styles.quickShop}>Quick Shop</span>
              <span className={styles.quickIcon}>
                <IoCartOutline />
              </span>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          {addToCartLoaderBtn ? (
            <div className={`spinner-border spinner-border-sm `} role="status"></div>
          ) : (
            <>
              <span className={styles.quickShop}>Added</span>
              <span className={styles.quickIcon}>
                <FaCheckCircle />
              </span>
            </>
          )}
        </>
      );
    }
  };
  const handleAddToProductData = async () => {
    setAddToCartLoaderBtn(true);
    const addToCartParams = {
      currency: 'INR',
      item_list: [{ item_code: data.name, quantity: 1 }],
      party_name: getPartyName,
    };

    try {
      await addToCartItem(addToCartParams, null);
    } catch (error) {
      console.error('Error adding to cart', error);
    } finally {
      setAddToCartLoaderBtn(false);
    }
  };

  // const handleRenderAddToCatalogBtn: any = () => {
  //   if (isSuperAdmin === 'true') {
  //     return (
  //       <div className="d-flex justify-content-center">
  //         {router?.asPath?.startsWith('/catalog') ? (
  //           <button
  //             className={`rounded me-2 fs-6 ${ProductCardStyles.carListingBtn}`}
  //             onClick={() => handleDeleteCatalogItem(router?.query?.category, data?.name)}
  //           >
  //             <RiDeleteBin2Fill />
  //           </button>
  //         ) : (
  //           <Button className={`rounded me-2 fs-6 ${ProductCardStyles.carListingBtn}`} onClick={() => handleShowCatalogModal(data?.name)}>
  //             Add to catalog
  //           </Button>
  //         )}
  //       </div>
  //     );
  //   }
  // };

  return (
    <>
      <Card className={`${styles.tabcardContainer} h-75 `}>
        {selectedItem?.image ? (
          <>
            {selectedItem?.image && selectedItem?.image?.length > 0 ? (
              <div className={`${styles.tabimageContainer}`}>
                <Image
                  src={selectedItem?.image[0]}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  alt="Product Image"
                  loading="eager"
                  priority={true}
                  width={303}
                  height={303}
                  loader={imageLoader}
                />
              </div>
            ) : (
              <div className={`${styles.tabimageContainer}`}>
                <Image
                  src={noImage}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                  alt="Product Image"
                  loading="eager"
                  priority={true}
                  width={303}
                  height={303}
                />
              </div>
            )}
          </>
        ) : (
          <>
            {data?.image ? (
              <div className={`${styles.tabimageContainer}`}>
                <Image
                  src={data?.image}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  alt="Product Image"
                  loading="eager"
                  priority={true}
                  width={303}
                  height={303}
                  loader={imageLoader}
                />
              </div>
            ) : (
              <div className={`${styles.tabimageContainer}`}>
                <Image
                  src={noImage}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                  alt="Product Image"
                  loading="eager"
                  priority={true}
                  width={303}
                  height={303}
                />
              </div>
            )}
          </>
        )}
        <VariantProductCardsButton
          handleRedirectToProductDetailPage={handleRedirectToProductDetailPage}
          handleAddToProductData={handleAddToProductData}
          handleRenderCartBtnText={handleRenderCartBtnText}
        />
        <div className={`${styles.wishlistIcon} cursor-pointer`}>
          {/* <FaRegHeart /> */}
          {handleRenderIcon()}
        </div>
      </Card>
      <Link href={handleRedirectToProductDetailPage()} className="cursor-pointer text-decoration-none text-black">
        <h6 className={`${styles.tabProductTitle} fs-14 font-poppins `}>{data?.item_name?.split(' ').slice(0, 4).join(' ')}</h6>
      </Link>
      <div>
        <h6 className={`${styles.tabProductTitle} ${styles.tabProductPrice}`}>
          <span className={`${styles.tabProductPrice} fs-14 font-poppins`}>₹{data?.price}</span>
          <span className={`${styles.tabProductmrpPrice} fs-14 font-poppins`}>₹{data?.mrp_price}</span>
        </h6>
      </div>
      <FeaturedCollectionWithVariantProductCardColour
        data={data}
        handleSelectVariant={handleSelectVariant}
        handleRedirectToProductDetailPage={handleRedirectToProductDetailPage}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default ProductCardVariantColour;
