import AddToCartBtn from './AddToCartBtn';
import IconButton from './IconButton';
import CustomQuantityInputField from './ProductQuantityInput';

interface ProductActionButtonsMasterPropTypes {
  qty: number | string;
  handleQtyModificationOnInputEdit: (e: any) => void;
  handleQtyModificationOnButtonClick: (action: string) => void;
  handleAddToSingleProductData: () => void;
  addToCartLoaderBtn: boolean;
  handleRenderBtnText: () => string;
}

const ProductActionButtonsMaster = ({
  qty,
  handleQtyModificationOnInputEdit,
  handleQtyModificationOnButtonClick,
  handleAddToSingleProductData,
  addToCartLoaderBtn,
  handleRenderBtnText,
}: ProductActionButtonsMasterPropTypes) => {
  return (
    <div className="d-flex flex-wrap">
      <div className="order-sm-1">
        <CustomQuantityInputField
          qty={qty}
          handleQtyModificationOnInputEdit={handleQtyModificationOnInputEdit}
          handleQtyModificationOnButtonClick={handleQtyModificationOnButtonClick}
        />
      </div>
      <div className="order-sm-2 order-3 ">
        <AddToCartBtn
          handleAddToSingleProductData={handleAddToSingleProductData}
          addToCartLoaderBtn={addToCartLoaderBtn}
          handleRenderBtnText={handleRenderBtnText}
        />
      </div>
      <div className="order-sm-2 order-2">
        <IconButton />
      </div>
    </div>
  );
};

export default ProductActionButtonsMaster;
