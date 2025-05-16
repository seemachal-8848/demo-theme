import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaCartPlus, FaCircleCheck, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import useAddToWishlist from '../hooks/WishlistHooks/useAddToWishlistHook';
import noImage from '../public/assets/images/no_image.png';
import ProductCardStyles from '../styles/components/productCardWithEditableQty.module.scss';
import { FaCheckCircle } from 'react-icons/fa';
import { imageLoader } from '../utils/image_loader';
import ProductQuantityInput from '../components/ProductCategoriesComponents/ProductListActionButtons/ProductQuantityInput';
import StarRating from '../components/ProductPageComponents/StarRating';

const ProductCardWithEditableQuantity = ({
  data,
  wishlistData,
  cartData,
  addToCartItem,
  getPartyName,
  isSuperAdmin,
  handleDeleteCatalogItem,
  handleShowCatalogModal,
}: any) => {

  const [qty, setQty] = useState<number>(data?.min_order_qty || 1);

  // Read roles from localStorage and parse them
  const userRoles = JSON.parse(localStorage.getItem('user_role') || '[]');

  const isB2BSalesPerson = userRoles.includes('Sales Person');
  const isB2CSalesPerson = userRoles.includes('POS Sales Person');

  const type = isB2BSalesPerson ? 'B2B' : isB2CSalesPerson ? 'B2C' : null;

  // Need to handle qty increase of product
  const handleQtyModificationOnButtonClick = (actionType: string) => {
    if (actionType === 'increase') {
      setQty(qty + 1);
    } else if (actionType === 'decrease') {
      if (type === 'B2B') {
        if (qty > (data?.min_order_qty ?? 1)) {
          setQty(qty - 1);
        }
      } else {
        if (qty > 1) {
          setQty(qty - 1);
        }
      }
    }
  };


  const handleQtyModificationOnInputEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: any = e.target;
    const newQty = Number(value);
    setQty(newQty);
  };
  const router = useRouter();
  const { handleAddToWishList, handleRemoveFromWishList } = useAddToWishlist();
  const [addToCartLoaderBtn, setAddToCartLoaderBtn] = useState<boolean>(false);

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
        <span className={`${ProductCardStyles.wishlist_icon} text-danger `}>
          <FaRegHeart onClick={() => handleAddToWishList(data)} />
        </span>
      );
    } else {
      if (router?.asPath?.startsWith('/wishlist')) {
        return (
          <span className={`${ProductCardStyles.wishlist_icon} text-secondary `}>
            <RxCross2 onClick={() => handleRemoveFromWishList(data?.name)} />
          </span>
        );
      } else {
        return (
          <span className={`${ProductCardStyles.wishlist_icon} text-danger `}>
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
          <ProductQuantityInput
            qty={qty}
            handleQtyModificationOnInputEdit={handleQtyModificationOnInputEdit}
            handleQtyModificationOnButtonClick={handleQtyModificationOnButtonClick}
          />
          <Button
            type="button"
            className={`btn ml-3 fs-6 ${ProductCardStyles.carListingBtn}`}
            style={{ backgroundColor: '#7B189F', border: '1px solid #7B189F' }}
            onClick={handleAddToProductData}
            disabled={addToCartLoaderBtn}
          >
            {!addToCartLoaderBtn ? (
              <>

                <span>ADD</span>
                <FaCartPlus className={`${ProductCardStyles.cardBtn}`} />
              </>
            ) : (
              <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
            )}
          </Button>
        </>
      );
    } else {
      return (
        <Button type="button" className={`btn ml-3 fs-6 ${ProductCardStyles.carListingBtn_added}`}>
          {!addToCartLoaderBtn ? (
            <>
              <span>ADDED</span>
              <FaCheckCircle className={`mb-1 ${ProductCardStyles.cardBtn}`} />
            </>
          ) : (
            <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
          )}
        </Button>
      );
    }
  };
  const handleAddToProductData = async () => {
    setAddToCartLoaderBtn(true);
    const addToCartParams = {
      currency: 'INR',
      item_list: [{ item_code: data.name, quantity: qty }],
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

  const handleRenderAddToCatalogBtn: any = () => {
    if (isSuperAdmin === 'true') {
      return (
        <div className="d-flex justify-content-center">
          {router?.asPath?.startsWith('/catalog') ? (
            <button
              className={`rounded me-2 fs-6 ${ProductCardStyles.carListingBtn}`}
              onClick={() => handleDeleteCatalogItem(router?.query?.category, data?.name)}
            >
              <RiDeleteBin2Fill />
            </button>
          ) : (
            <Button className={`rounded me-2 fs-6 ${ProductCardStyles.carListingBtn}`} onClick={() => handleShowCatalogModal(data?.name)}>
              Add to catalog
            </Button>
          )}
        </div>
      );
    }
  };

  return (
    <Card className={` ${ProductCardStyles.product_card} pt-2`}>
      <div className={`${ProductCardStyles.tabimageContainer}`}>
        <div className={` ${ProductCardStyles.product_card_img} `}>
          {handleRenderIcon()}
          <Link href={`${data?.url}`} className="text-decoration-none text-dark">
            <Image
              loader={data.image ? imageLoader : undefined}
              src={data.image ? data.image : noImage}
              width={1200}
              height={900}
              alt="Item Image"
              className={`${ProductCardStyles.product_code_img}`}
              style={{ width: '100%', height: '100%' }}
              priority={true}
            />
          </Link>
        </div>
        <Card.Body className={`${ProductCardStyles.content_wrap}`}>
          <div className={`${ProductCardStyles.cornerTag} 
          ${data?.item_classification === 'A'
              ? ProductCardStyles.greenBg
              : data?.item_classification === 'B'
                ? ProductCardStyles.yellowBg
                : ProductCardStyles.redBg
            }`}>
            <span className='ms-2'>{data?.item_classification}</span></div>
          <div className={`${ProductCardStyles.product_content_wrap}`}>
            <Link href={`${data?.url}`} className={`text-dark text-decoration-none ${ProductCardStyles.product_name}`}>
              <Card.Title className={`my-0 ${ProductCardStyles.product_name} mb-0`}>{data?.oem_part_number}</Card.Title>
            </Link>
            <Link href={`${data?.url}`} className={`text-dark text-decoration-none ${ProductCardStyles.product_name}`}>
              <Card.Title className={`my-0 ${ProductCardStyles.product_name} mb-0`}>{data?.item_name}</Card.Title>
            </Link>
            <div className='mt-1 mb-1'>
              <StarRating rating={0.6} />
            </div>
            <div>
              <Card.Text className={`my-0 py-0 fw-bold ${ProductCardStyles.product_card_text} `}>
                {data?.currency_symbol}
                {data.price}{' '}
                <span className={`text-decoration-line-through ${ProductCardStyles.mrpPrice}`}>
                  {data?.currency_symbol}
                  {data.mrp_price}
                </span>
              </Card.Text>
            </div>
            <div className="mb-2" style={{ fontSize: '15px' }}>
              {isB2BSalesPerson ? (
                <div className='d-flex justify-content-between wrap gap-3 mt-1'>
                  {data?.monthly_target_qty && <div><strong>MTD Qty</strong> ₹{data?.monthly_target_qty}</div>}
                  {data?.taget_qty && <div><strong>Target Qty</strong> ₹{data?.taget_qty}</div>}
                </div>
              ) : (
                data?.loyalty_points && <div><strong>Loyalty Points</strong> {data?.loyalty_points}</div>
              )}
            </div>
            <div className='d-flex justify-content-between mt-3'>{handleRenderCartBtnText()}</div>
            <div>{isSuperAdmin === 'true' && handleRenderAddToCatalogBtn()}</div>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default ProductCardWithEditableQuantity;
