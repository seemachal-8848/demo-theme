import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaCheckCircle, FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import useAddToWishlist from '../hooks/WishlistHooks/useAddToWishlistHook';
import noImage from '../public/assets/images/no_image.png';
import styles from '../styles/components/productCardListView.module.scss';
import { imageLoader } from '../utils/image_loader';
import ProductActionButtonsMaster from '../components/ProductPageComponents/ProductActionButtons/ProductActionButtonsMaster';
import ProductListViewActionButtons from '../components/ProductCategoriesComponents/ProductListView/ProductListViewActionButtons';
import FeaturedCollectionWithVariantProductCardColour from '../components/HomePage/FeaturedCollections/FeaturedCollectionWithVariantColour/FeaturedCollectionWithVariantProductCardColour';

interface ProductListViewCardVariantPropsTypes {
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

const ProductListViewCardVariantColour = ({
  data,
  wishlistData,
  cartData,
  addToCartItem,
  getPartyName,
  isSuperAdmin,
  handleDeleteCatalogItem,
  handleShowCatalogModal,
}: ProductListViewCardVariantPropsTypes) => {
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
  return (
    <div className="p-3 d-flex w-100">
      <div>
        {data?.image ? (
          <Image src={data?.image} alt="product-image" className={`${styles.card_img}`} loader={imageLoader} width={180} height={230} />
        ) : (
          <Image src={noImage} alt="product-image" className={`${styles.card_img}`} width={180} height={230} />
        )}
      </div>
      <div className="w-100 d-flex justify-content-sm-between align-items-center">
        <div className="w-100 pe-3">
          <strong>{data?.item_name}</strong>
          <p className="m-0 text-secondary w-100">
            <span className="me-2">
              {data?.currency_symbol}
              {data?.price}
            </span>
            <span className="text-decoration-line-through">
              {data?.currency_symbol}
              {data?.mrp_price}
            </span>
          </p>
          <p className="m-0 text-secondary d-md-block d-none">{data?.short_description}</p>
          <div className="py-2">
            <FeaturedCollectionWithVariantProductCardColour
              data={data}
              handleSelectVariant={handleSelectVariant}
              handleRedirectToProductDetailPage={handleRedirectToProductDetailPage}
              selectedItem={selectedItem}
            />
          </div>
        </div>
        <div>
          <ProductListViewActionButtons
            handleRedirectToProductDetailPage={handleRedirectToProductDetailPage}
            handleAddToProductData={handleAddToProductData}
            handleRenderCartBtnText={handleRenderCartBtnText}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListViewCardVariantColour;
