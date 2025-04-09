import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NoImage from '../../public/assets/images/no_image.png';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';
import { imageLoader } from '../../utils/image_loader';

function OrderCardDetails({ data, selectedMultiLangData }: any) {
  const { query } = useRouter();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const [isDealer, setIsDealer] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      const checkIsDealer = localStorage.getItem('isDealer');
      if (checkIsDealer === 'true') {
        setIsDealer(true);
      }
    }
  }, []);

  return (
    <>
      {data?.order_details?.map((detail: any) => (
        <div className=" card-body " key={detail?.item_name}>
          {!query?.orderId && (
            <div className="d-flex mb-2 pb-0">
              <div className="flex-fill">
                <h6
                  className={`text-capitalize mb-0 mt-2 d-inline-flex ${
                    query?.status === 'completed-orders' ? 'text-success' : 'text-danger'
                  } `}
                >
                  <b>
                    <div>{selectedMultiLangData?.status} </div>
                  </b>
                  <b>
                    <div>&nbsp;: {data?.payment_status}</div>
                  </b>
                </h6>
              </div>
            </div>
          )}
          <div className="d-flex align-items-center row">
            <div className="mb-3 mb-sm-0 col-lg-2 col-md-2 col-4 mt-0">
              <div className="text-center">
                <Image
                  src={detail?.img ? detail?.img : NoImage}
                  loader={imageLoader}
                  className="img-fluid"
                  alt="product-img"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className=" col-lg-6 col-md-7 col-8">
              <div className="d-flex ">
                <div className="flex-fill">
                  <Link href="#" legacyBehavior>
                    <a className="text-decoration-none text-black">
                      <b>{detail?.item_name}</b>
                    </a>
                  </Link>
                  <table width="100%" className="mt-1 table table-borderless ">
                    <tbody>
                      <tr className=" ">
                        <td className="p-0 m-0">
                          <p className="text-capitalize m-0  ">{selectedMultiLangData?.item_code}</p>
                        </td>
                        <td width="85%" className="p-0 m-0">
                          <p className="text-capitalize m-0  ">: {detail?.name}</p>
                        </td>
                      </tr>

                      <tr className=" ">
                        <td className="p-0 m-0">
                          <p className="text-capitalize m-0">{selectedMultiLangData?.price}</p>
                        </td>
                        <td width="85%" className="p-0 m-0">
                          <p className="text-capitalize m-0  ">
                            {detail?.prod_info[1]?.value !== 0 ? (
                              <p className=" p-0 m-0">
                                {' '}
                                : {data?.currency_symbol} {detail.prod_info[1]?.value}
                              </p>
                            ) : (
                              <p className="border m-0">{selectedMultiLangData?.price_on_request}</p>
                            )}
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-0 py-0 pb-0 ">
                          <p className="text-capitalize m-0  ">{selectedMultiLangData?.quantity}</p>
                        </td>
                        <td width="85%" className="px-0 py-0 pb-0 ">
                          <p className="text-capitalize m-0  ">: {detail?.prod_info[2]?.value}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {isDealer && (
              <div className="col-lg-4 col-md-7 col-8">
                {data.shipping_method.transporter === null ||
                data?.shipping_method?.door_delivery === null ||
                data?.shipping_method?.godown_delivery === null ||
                data?.shipping_method?.location === null ||
                data?.shipping_method?.remarks === null ||
                data?.shipping_method?.transport_charges === null ? (
                  ''
                ) : (
                  <h5 className=" mb-1">{selectedMultiLangData?.shipping_method}</h5>
                )}

                <div>
                  {data.shipping_method.transporter === null ? (
                    ' '
                  ) : (
                    <p className="mb-0">
                      {selectedMultiLangData?.transporter} : {data.shipping_method.transporter}
                    </p>
                  )}

                  {data?.shipping_method?.door_delivery === 0 && data?.shipping_method?.godown_delivery === 0 ? (
                    <p className="mb-0"> {selectedMultiLangData?.door_delivery_yes}</p>
                  ) : (
                    ''
                  )}
                  {data?.shipping_method?.door_delivery === 0 && data?.shipping_method?.godown_delivery !== 0 ? (
                    <>
                      <p className="mb-0"> {selectedMultiLangData?.godown_delivery}</p>
                      {data?.shipping_method.location === null ? (
                        ''
                      ) : (
                        <p className="mb-0">
                          {selectedMultiLangData?.location} : {data?.shipping_method?.location}
                        </p>
                      )}
                    </>
                  ) : (
                    ''
                  )}

                  {data?.shipping_method?.remarks === null ? (
                    ''
                  ) : (
                    <p className="mb-0">
                      {selectedMultiLangData?.remark} : {data?.shipping_method?.remarks}
                    </p>
                  )}
                </div>
              </div>
            )}

            {isDealer ? (
              <div className="col-lg-4 col-md-2 col-12 ">
                <button className="btn btn-link text-decoration-none mb-2  text-uppercase ">
                  <Link href={`${detail?.product_url}?currency=INR`} legacyBehavior>
                    <a className="text-decoration-none"> {selectedMultiLangData?.view_product}</a>
                  </Link>
                </button>
              </div>
            ) : (
              <>
                <div className="col-lg-4 col-md-2 col-12 text-center text-md-end ">
                  <button className=" btn btn-link text-decoration-none mb-2 text-uppercase ">
                    <Link href={`${detail?.product_url}?currency=INR`} legacyBehavior>
                      <a className="text-decoration-none fs-14">
                        {' '}
                        <b>{selectedMultiLangData?.view_product}</b>
                      </a>
                    </Link>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
export default OrderCardDetails;
