import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import style from '../../styles/components/orderCheckout.module.scss';
import BillingAddress from './BillingAndShippingAddress/BillingAddress';
import ShippingAddress from './BillingAndShippingAddress/ShippingAddress';
import OrderSummery from './OrderSummary';
import ShippingMethods from './ShippingMethods';
import useFetchCartItems from '../../hooks/CartPageHook/useFetchCartItems';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import StoreCredit from './StoreCredit';
import CouponCode from './CouponCode';
import styles from '../../styles/components/checkout.module.scss';

const CheckOutAddress = ({
  shippingAddress,
  billingAddress,
  stateList,
  handlePlaceOrder,
  handleEditShippingAddressChange,
  handleEditBillingAddressChange,
  setEditShippingAddress,
  editShippingAddress,
  editBillingAddress,
  cityList,
  setEditBillingAddress,
  handlePostAddress,
  handleCreateAddressChange,
  handleUserAddressChange,
  emptyAddressFields,
  setEmptyAddressFields,
  shippingAddressLoading,
  billingAddressLoading,
  shippingAddressError,
  billingAddressError,
  showLocation,
  show,
  showCreateAddModal,
  showBilling,
  showCreateBillingAddModal,
  setShowCreateAddModal,
  setShowBilling,
  setShow,
  setShowCreateBillingAddModal,
}: any) => {
  const [showAccordion, setShowAccordion] = useState(false);
  const [showBillingAccordion, setShowBillingAccordion] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(true);
  const [showSelectedAddress, setShowSelectedAddress] = useState<any>({});
  const [showSelectedBillingAddress, setShowSelectedBillingAddress] = useState<any>({});
  const [addressId, setAddressId] = useState<number | string>();
  const [billingAddressId, setBillingAddressId] = useState<any>();
  const [conditionCheck, setConditionCheck] = useState<any>(false);
  const [placeOrderLoader, setPlacePrderLoader] = useState(false);
  const { cartListingItems } = useFetchCartItems();
  const partyName = localStorage.getItem('party_name');

  const handleShowAccordion = (type: string) => {
    if (type === 'shipping') {
      setShowAccordion((prev) => !prev);
    } else {
      setShowBillingAccordion((prev) => !prev);
    }
  };

  const handleShowBillingAddress = () => {
    setShowBillingAddress((prev) => !prev);
  };
  const handleSelectAddress = (id: number | string, address: any) => {
    setAddressId(id);
    const getSelectedAddress = address?.find((val: any, i: number) => val.address_id === id);
    setShowSelectedAddress(getSelectedAddress);
  };
  const handleBillingSelectAddress = (id: number | string, address: any) => {
    setBillingAddressId(id);
    const getSelectedAddress = address?.find((val: any, i: number) => val.address_id === id);
    setShowSelectedBillingAddress(getSelectedAddress);
  };
  const defaultAddress = shippingAddress?.length > 0 && shippingAddress?.find((item: any, val: any) => item?.set_as_default === true);

  useEffect(() => {
    if (defaultAddress) {
      setAddressId(defaultAddress.address_id);
      setShowSelectedAddress(defaultAddress);
    }
  }, [defaultAddress]);
  const handleRenderDefaultShippingAddress: any = () => {
    return (
      Object?.keys(showSelectedAddress)?.length > 0 && (
        <ul>
          <li className={`fw-bold ml-2 ${style.address_list}`}>{showSelectedAddress.address_id} </li>
          <li className={style.address_list}>{showSelectedAddress.user_id}</li>
          <li className={style.address_list}>{showSelectedAddress.full_address}</li>
        </ul>
      )
    );
  };

  const handleRenderDefaultBillingAddress: any = (address: any) => {
    const defaultBillingAddress = address?.length > 0 && address?.find((item: any, i: any) => item?.set_as_default === true || address[0]);

    useEffect(() => {
      if (defaultBillingAddress) {
        setBillingAddressId(defaultBillingAddress.address_id);
        setShowSelectedBillingAddress(defaultBillingAddress);
      }
    }, [defaultBillingAddress]);
    return (
      Object?.keys(showSelectedBillingAddress)?.length > 0 && (
        <ul>
          <li className={`fw-bold ml-2 ${style.address_list}`}>{showSelectedBillingAddress.address_id} </li>
          <li className={style.address_list}>{showSelectedBillingAddress.user_id}</li>
          <li className={style.address_list}>{showSelectedBillingAddress.full_address}</li>
        </ul>
      )
    );
  };

  return (
    <div className={`container-md my-5`}>
      <h4 className="fw-bold text-center"> Order Checkout</h4>
      {cartListingItems && Object.keys(cartListingItems).length > 0 ? (
        <div className="row">
          {!partyName ? (
            <div className="col-lg-8 order-2 order-lg-1 mt-3 mt-lg-0">
              <ShippingAddress
                handleRenderDefaultShippingAddress={handleRenderDefaultShippingAddress}
                handleShowAccordion={handleShowAccordion}
                showAccordion={showAccordion}
                shippingAddress={shippingAddress}
                addressId={addressId}
                handleSelectAddress={handleSelectAddress}
                stateList={stateList}
                setEditShippingAddress={setEditShippingAddress}
                handleEditShippingAddressChange={handleEditShippingAddressChange}
                editShippingAddress={editShippingAddress}
                cityList={cityList}
                handlePostAddress={handlePostAddress}
                handleCreateAddressChange={handleCreateAddressChange}
                emptyAddressFields={emptyAddressFields}
                setEmptyAddressFields={setEmptyAddressFields}
                shippingAddressLoading={shippingAddressLoading}
                shippingAddressError={shippingAddressError}
                show={show}
                showCreateAddModal={showCreateAddModal}
                setShowCreateAddModal={setShowCreateAddModal}
                setShow={setShow}
              />
            </div>
          ) : (
            <div className="col-lg-8 order-2 order-lg-1 mt-3 mt-lg-0">
              <div className="">
                <ShippingAddress
                  handleRenderDefaultShippingAddress={handleRenderDefaultShippingAddress}
                  handleShowAccordion={handleShowAccordion}
                  showAccordion={showAccordion}
                  shippingAddress={shippingAddress}
                  addressId={addressId}
                  handleSelectAddress={handleSelectAddress}
                  stateList={stateList}
                  setEditShippingAddress={setEditShippingAddress}
                  handleEditShippingAddressChange={handleEditShippingAddressChange}
                  editShippingAddress={editShippingAddress}
                  cityList={cityList}
                  handlePostAddress={handlePostAddress}
                  handleCreateAddressChange={handleCreateAddressChange}
                  emptyAddressFields={emptyAddressFields}
                  setEmptyAddressFields={setEmptyAddressFields}
                  shippingAddressLoading={shippingAddressLoading}
                  shippingAddressError={shippingAddressError}
                  show={show}
                  showCreateAddModal={showCreateAddModal}
                  setShowCreateAddModal={setShowCreateAddModal}
                  setShow={setShow}
                />
                <Form className="mt-2">
                  <div key={`default-checkbox`} className="mb-3">
                    <Form.Check // prettier-ignore
                      type="checkbox"
                      checked={showBillingAddress}
                      onChange={handleShowBillingAddress}
                      id={`default-checkbox`}
                      label={`Use the same address for Billing`}
                    />
                  </div>
                </Form>
                {!showBillingAddress && (
                  <BillingAddress
                    handleRenderDefaultBillingAddress={handleRenderDefaultBillingAddress}
                    handleShowAccordion={handleShowAccordion}
                    showBillingAccordion={showBillingAccordion}
                    billingAddress={billingAddress}
                    billingAddressId={billingAddressId}
                    handleBillingSelectAddress={handleBillingSelectAddress}
                    stateList={stateList}
                    handleEditBillingAddressChange={handleEditBillingAddressChange}
                    cityList={cityList}
                    editBillingAddress={editBillingAddress}
                    setEditBillingAddress={setEditBillingAddress}
                    handlePostAddress={handlePostAddress}
                    handleCreateAddressChange={handleCreateAddressChange}
                    emptyAddressFields={emptyAddressFields}
                    setEmptyAddressFields={setEmptyAddressFields}
                    billingAddressLoading={billingAddressLoading}
                    billingAddressError={billingAddressError}
                    showBilling={showBilling}
                    showCreateBillingAddModal={showCreateBillingAddModal}
                    setShowBilling={setShowBilling}
                    setShowCreateBillingAddModal={setShowCreateBillingAddModal}
                  />
                )}
              </div>
              <ShippingMethods handleUserAddressChange={handleUserAddressChange} showLocation={showLocation} />
              <h5 className=" fw-bolder mt-2 ">Final Review</h5>
              <div className="d-flex justify-content-between w-50 ">
                <p className={`m-0 ${style.p_tag} fw-bolder`}>Sub total:</p>
                <p className={`m-0 ${style.p_tag} fw-bolder`}>
                  <LiaRupeeSignSolid />
                  {cartListingItems.grand_total_excluding_tax}
                </p>
              </div>
              <div className="d-flex justify-content-between w-50 ">
                <p className={`m-0 ${style.p_tag} fw-bolder`}>Order Total Including Tax:</p>
                <p className={`m-0 ${style.p_tag} fw-bolder`}>
                  <LiaRupeeSignSolid />
                  {cartListingItems.grand_total_excluding_tax}
                </p>
              </div>
              <Form className="mt-2 ">
                <div key={`default-checkbox`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    checked={conditionCheck}
                    onChange={(e) => setConditionCheck(!conditionCheck)}
                    id={`default-checkbox`}
                    label={`By placing the order, I am confirming that I have read and agreed with the Terms and Conditions`}
                  />
                </div>
              </Form>
              <Button
                // variant="primary"
                className={` w-100 ${styles.place_order_btn}`}
                disabled={!conditionCheck}
                onClick={() => handlePlaceOrder(billingAddressId, addressId, showBillingAddress, setPlacePrderLoader)}
              >
                {placeOrderLoader ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  <span>Place Order</span>
                )}
              </Button>
            </div>
          )}

          <OrderSummery cartListingItems={cartListingItems} />
        </div>
      ) : (
        <h5 className="col-12 text-center mt-3 w-100">Please add products to place your order.</h5>
      )}
    </div>
  );
};

export default CheckOutAddress;
