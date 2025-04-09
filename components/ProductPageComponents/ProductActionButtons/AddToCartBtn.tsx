import style from '../../../styles/components/productPage.module.scss';

interface AddToCartBtnPropTypes {
  handleAddToSingleProductData: () => void;
  addToCartLoaderBtn: boolean;
  handleRenderBtnText: () => string;
}

const AddToCartBtn = ({ handleAddToSingleProductData, addToCartLoaderBtn, handleRenderBtnText }: AddToCartBtnPropTypes) => {
  return (
    <div className="px-sm-3  ">
      <button className={`${style?.addToCartBtn}`} onClick={handleAddToSingleProductData}>
        {addToCartLoaderBtn ? (
          <div className="spinner-border spinner-border-sm " role="status"></div>
        ) : (
          <span>{handleRenderBtnText()}</span>
        )}
      </button>
    </div>
  );
};

export default AddToCartBtn;
