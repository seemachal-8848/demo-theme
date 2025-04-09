import styles from '../../styles/components/checkout.module.scss';
function StoreCredit({ storeCredit, handleChangeStoreCredit, handleApplyStoreCredit }: any) {
  return (
    <div>
      <label>
        <b>Store Credit :</b>
      </label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control px-3"
          placeholder="Enter store credit here"
          value={storeCredit}
          onChange={(e) => handleChangeStoreCredit(e.target.value)}
        />
        <button className={`btn  ${styles.summary_btn}`} type="button" id="store-credit" onClick={handleApplyStoreCredit}>
          Apply
        </button>
      </div>
    </div>
  );
}
export default StoreCredit;
