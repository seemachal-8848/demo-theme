import Image from 'next/image';
import { GrView } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';
import CartQuantityInput from '../components/Cart/ApparelCartPage/CartQuantityInput';
import styles from '../styles/components/cartlist.module.scss';
import { imageLoader } from '../utils/image_loader';
import { useRouter } from 'next/router';

interface CartCardPropsTypes {
  orderData: any;
  RemoveItemCartAPIFunc: any;
  quotationId: string;
  setCartListingItems: any;
  handleQtyBlur: any;
  handleQtyInputChange: any;
  handleQtyButtonClick: any;
}

const CartCard = ({
  orderData,
  RemoveItemCartAPIFunc,
  quotationId,
  setCartListingItems,
  handleQtyBlur,
  handleQtyInputChange,
  handleQtyButtonClick,
}: CartCardPropsTypes) => {
  const router = useRouter();
  const getPriceFromDetails = (details: any) => {
    const priceDetail = details.find((detail: any) => detail.name === 'Price');
    return priceDetail ? priceDetail?.value : 'N/A';
  };
  const handleRemoveItem = (itemCode: any) => {
    const params = {
      item_code: itemCode,
      quotation_id: quotationId,
    };
    RemoveItemCartAPIFunc(params, setCartListingItems);
  };

  const handleProductView = () => {
    router.push('/');
  };

  return (
    <div className={`${styles.cart_card} mb-3 m-xl-0 w-100`}>
      <div className="row py-xl-3 px-xl-2 ">
        <div className="col-xl-5">
          <div className="d-flex align-items-center">
            <div>
              {orderData?.image_url && (
                <Image
                  src={orderData?.image_url}
                  className="img-fluid"
                  alt="product-image"
                  loader={imageLoader}
                  width={120}
                  height={100}
                ></Image>
              )}
            </div>
            <div className="ms-3 ">
              <p className="fw-bold m-0">{orderData?.item_name}</p>
              {orderData?.variant_attributes?.length > 0 &&
                orderData?.variant_attributes?.map((attr: any) => (
                  <p className="m-0 text-secondary">
                    {attr?.attribute} : <span className="fw-bold">{attr?.attribute_value}</span>
                  </p>
                ))}
              <div>
                {/* <span className={`${styles.cart_action_icons} pe-2`}>
                  <GrView />
                </span> */}
                <span className={`${styles.cart_action_icons} pe-2`} onClick={() => handleRemoveItem(orderData?.item_code)}>
                  <RiDeleteBinLine />
                </span>
              </div>
            </div>
          </div>
          <hr className="d-xl-none m-0 " />
        </div>
        <div className="col-xl-2 col-4 py-sm-3 py-2 text-secondary d-flex align-items-center justify-content-xl-start justify-content-center">
          {orderData?.currency_symbol}
          {getPriceFromDetails(orderData?.details)}
        </div>

        <div className="col-xl-3 col-4 py-sm-3 py-2 d-flex justify-content-center align-items-center">
          <CartQuantityInput
            orderData={orderData}
            handleQtyInputChange={handleQtyInputChange}
            handleQtyBlur={handleQtyBlur}
            handleQtyButtonClick={handleQtyButtonClick}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
        <div className="col-xl-2 col-4 py-sm-3 py-2 d-flex justify-content-xl-end justify-content-center align-items-center">
          <div>
            {orderData?.currency_symbol}
            {orderData?.amount}
          </div>
        </div>
      </div>
      <hr className="m-0 my-xl-3 d-none d-xl-block" />
    </div>
  );
};

export default CartCard;
