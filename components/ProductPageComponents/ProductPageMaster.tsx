import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useProductDetail from '../../hooks/ProductDetailPageHooks/useProductDetail';
import BreadCrumbs from '../BreadCrumbs';
import ProductDetailSkeleton from './ProductDetailSkeleton';
import ProductDetailDescribtionSection from './ProductDetailDescribtionSection';
const ReviewMaster = dynamic(() => import('../Reviews/ReviewMaster'));
const MatchingProductsWithVariantsCard = dynamic(() => import('./MatchingProductWithVariantCard'));
const StockAvailabilityTable = dynamic(() => import('./StockAvailabilityTable'));
const ProductDetailSpecsAndTech = dynamic(() => import('./ProductDetailSpecsAndTech'));
import styles from '../../styles/components/productDetail.module.scss';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import { componentsListFromReduxStore } from '../../store/slices/general_slices/components-slice';
import ImageGalleryMaster from './ProductImageGallery/ImageGalleryMaster';

function ProductPageMaster() {
  const {
    productDetailData,
    productVariantData,
    isLoading,
    errorMessage,
    handleMultipleQtyChange,
    itemList,
    qty,
    handleQtyModificationOnInputEdit,
    handleQtyModificationOnButtonClick,
    handleStockAvailabilityData,
    stockAvailabilityData,
    userEnteredPinCode,
    getPincodesList,
    checkPinCodeExists,

    validPinCode,
  } = useProductDetail();
  const [tab, setTab] = useState('SPECIFICATION');
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  const cartData = useSelector(selectCart).items;
  const { componentsList }: any = useSelector(componentsListFromReduxStore);
  const SelectedLangDataFromStore: any = useSelector(SelectedFilterLangDataFromStore);
  useEffect(() => {
    if (Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  if (isLoading) {
    return (
      <div className={`container ${styles.detailContainer} `}>
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (Object?.keys(productDetailData)?.length > 0) {
    return (
      <div className={`container-fluid ${styles.detailContainer} w-100 ps-lg-5 pe-lg-4 `}>
        <div className="my-2">
          <BreadCrumbs />
        </div>
        <div className="row">
          <div className="col-md-6 p-4 h-100">
            <div className="">{productDetailData?.slide_img && <ImageGalleryMaster slideShowImages={productDetailData?.slide_img} />}</div>
          </div>
          <div className="col-md-6 p-4">
            <ProductDetailDescribtionSection
              productDetailData={productDetailData}
              pinCode={userEnteredPinCode}
              getPincodesList={getPincodesList}
              checkPinCodeExists={checkPinCodeExists}
              validPinCode={validPinCode}
              handleQtyModificationOnInputEdit={handleQtyModificationOnInputEdit}
              handleQtyModificationOnButtonClick={handleQtyModificationOnButtonClick}
              productVariantData={productVariantData}
              handleStockAvailabilityData={handleStockAvailabilityData}
              itemList={itemList}
              handleMultipleQtyChange={handleMultipleQtyChange}
              qty={qty}
              selectedMultiLangData={selectedMultiLangData}
              cartData={cartData}
            />
          </div>
          <div className="col-12 mt-4">
            <StockAvailabilityTable stockAvailabilityData={stockAvailabilityData} />
          </div>
          <div className="col-12 mt-4">
            <div className="row">
              <ProductDetailSpecsAndTech productDetailData={productDetailData} tab={tab} setTab={setTab} />
            </div>
          </div>
        </div>
        <ReviewMaster selectedMultiLangData={selectedMultiLangData} />
        <MatchingProductsWithVariantsCard />
      </div>
    );
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return <></>;
}

export default ProductPageMaster;
