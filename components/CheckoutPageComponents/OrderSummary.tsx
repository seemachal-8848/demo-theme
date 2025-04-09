import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import useOrderSummary from '../../hooks/CheckoutPageHook/useGetOrderSummary';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import style from '../../styles/components/orderCheckout.module.scss';
import CouponCode from './CouponCode';
import StoreCredit from './StoreCredit';
import { imageLoader } from '../../utils/image_loader';

const OrderSummary = ({ cartListingItems }: any) => {
  const quotationId = useSelector(selectCart).quotation_Id;
  const {
    orderSummaryLoading: isLoading,
    orderSummaryError: errorMessage,
    orderSummary,
    storeCredit,
    couponCode,
    handleChangeCouponCode,
    handleChangeStoreCredit,
    isCouponApplied,
    handleApplyCouponCode,
    handleApplyStoreCredit,
    handleRemoveCouponCode,
  } = useOrderSummary(quotationId);

  return (
    <div className="col-lg-4 col-12  order-lg-2 order-1">
      <div>
        <StoreCredit
          storeCredit={storeCredit}
          handleChangeStoreCredit={handleChangeStoreCredit}
          handleApplyStoreCredit={handleApplyStoreCredit}
        />
        <CouponCode
          couponCode={couponCode}
          handleChangeCouponCode={handleChangeCouponCode}
          handleApplyCouponCode={handleApplyCouponCode}
          handleRemoveCouponCode={handleRemoveCouponCode}
          isCouponApplied={isCouponApplied}
        />
      </div>
      <Card style={{ width: 'auto' }}>
        <Card.Body>
          <h5 className="fw-bold">Order Summary</h5>
          <div className="d-flex flex-column">
            {orderSummary?.values?.length > 0 &&
              orderSummary?.values
                ?.filter((val: any, i: any) => val.value && val.value != 0)
                .map((item: any, i: any) => (
                  <div className="d-flex justify-content-between" key={i}>
                    <p className={`m-0 ${style.p_tag} ${item.name === 'Total' ? style.p_tagBold : ''}`}>{item.name}</p>
                    <p className={`m-0 ${style.p_tag} ${item.name === 'Total' ? style.p_tagBold : ''}`}>
                      <LiaRupeeSignSolid />
                      {item.value}
                    </p>
                  </div>
                ))}
          </div>
          {cartListingItems?.categories?.map((val: any) => {
            return val.orders.map((item: any, i: any) => (
              <div className=" col-md-12" key={i}>
                <hr />
                <div className="row mt-3 ms-2">
                  <div className=" col-md-4">
                    <div style={{ textAlign: 'left' }}>
                      {item?.image_url && (
                        <Image
                          src={item?.image_url}
                          alt="product image"
                          width={90}
                          height={90}
                          loader={imageLoader}
                          className={style?.checkout_image}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className={`mb-0 ${style.product_item_title}`}>{item.item_name}</h6>
                    {item?.details?.map((val: any, i: any) => (
                      <div className="d-flex justify-content-between" key={i}>
                        <p className={`m-0 ${style.p_tag}`}>{val?.name}</p>
                        <p className={`m-0 ${style.p_tag}`}>
                          {Object.values(val).includes('Price') && <LiaRupeeSignSolid />}
                          {val.value}
                        </p>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between">
                      <p className={`m-0 ${style.p_tag}`}>Qty</p>
                      <p className={`m-0 ${style.p_tag}`}>{item.qty}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className={`m-0 ${style.p_tag}`}>Total Item Price:</p>
                      <p className={`m-0 ${style.p_tag}`}>
                        <LiaRupeeSignSolid />
                        {item.amount}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className={`m-0 ${style.p_tag}`}>Total Item Tax:</p>
                      <p className={`m-0 ${style.p_tag}`}>{item.tax}</p>
                    </div>
                  </div>
                </div>
              </div>
            ));
          })}
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderSummary;
