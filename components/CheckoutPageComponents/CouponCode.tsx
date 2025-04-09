import styles from '../../styles/components/checkout.module.scss';
function CouponCode({ couponCode, handleChangeCouponCode, isCouponApplied, handleApplyCouponCode, handleRemoveCouponCode }: any) {
  return (
    <div>
      <label>
        <b>Coupon Code :</b>
      </label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control px-3"
          placeholder="Enter coupon code here"
          value={couponCode}
          onChange={(e) => handleChangeCouponCode(e.target.value)}
          disabled={isCouponApplied}
        />
        {isCouponApplied ? (
          <button className="btn btn-outline-danger" type="button" id="cancel-coupon" onClick={handleRemoveCouponCode}>
            Cancel
          </button>
        ) : (
          <button className={`btn  ${styles.summary_btn}`} type="button" id="apply-coupon" onClick={handleApplyCouponCode}>
            Apply
          </button>
        )}
      </div>
    </div>
  );
}
export default CouponCode;
