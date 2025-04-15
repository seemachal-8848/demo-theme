import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WebsiteInterfaceTypes } from '../../interfaces/website-interface-types';
import useProductDetail from '../../hooks/ProductDetailPageHooks/useProductDetail';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import ImageGalleryMaster from './ProductImageGallery/ImageGalleryMaster';
import ProductDetailDescribtionSection from './ProductDetailDescribtionSection';
import ProductDetailSkeleton from './ProductDetailSkeleton';
import styles from '../../styles/components/productDetail.module.scss';

type ProductPageComponentsTypes = {
  productPageComponents: WebsiteInterfaceTypes;
};

function ProductPageMaster({ productPageComponents }: ProductPageComponentsTypes) {
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
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  const cartData = useSelector(selectCart).items;
  const SelectedLangDataFromStore: any = useSelector(SelectedFilterLangDataFromStore);
  useEffect(() => {
    if (Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);

  function renderHeaderComponents() {
    if (productPageComponents?.top_section_component?.length === 0) return;

    if ((productPageComponents?.top_section_component ?? []).length > 0) {
      return productPageComponents?.top_section_component?.map((component: any) => {
        const Component = require(`./${component.section_name}/${component?.component_name}/MasterComponent`).default;
        return (
          <section key={component.component_name}>
            <div className="my-2">
              <Component key={component?.component_name} />
            </div>
          </section>
        );
      });
    }
  }

  function renderProductInformationComponents() {
    if (productPageComponents?.magnified_image_component) {
      return (
        <div className="col-md-6 p-4 h-100">
          <div className="">
            {productDetailData?.slide_img && (
              <ImageGalleryMaster
                imageGalleryComponent={productPageComponents?.magnified_image_component}
                slideShowImages={productDetailData?.slide_img}
              />
            )}
          </div>
        </div>
      );
    } else if (productPageComponents?.product_information_component) {
      if (productPageComponents?.product_information_component === 'Standard Product Information') {
        return (
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
        );
      } else {
        return null; // or a fallback component
      }
    }
  }

  function renderProductPageBottomSectionComponents() {
    if (productPageComponents?.bottom_section_component?.length === 0) return;

    if ((productPageComponents?.bottom_section_component ?? []).length > 0) {
      return (
        <div className="row">
          {productPageComponents?.bottom_section_component?.map((component: any) => {
            const Component = require(`./${component.section_name}/${component?.component_name}/MasterComponent`).default;
            return (
              <section key={component.component_name}>
                <div className="col-12 mt-3">
                  <Component key={component?.component_name} />
                </div>
              </section>
            );
          })}
        </div>
      );
    }
  }

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
        {renderHeaderComponents()}
        <div className="row">
          {renderProductInformationComponents()}
          {renderProductPageBottomSectionComponents()}
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return <></>;
}

export default ProductPageMaster;
