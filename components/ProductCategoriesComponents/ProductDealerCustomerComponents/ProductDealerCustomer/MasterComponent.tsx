import ProductcategoryMaster from '../../Productcategory/ProductcategoryMaster';
import DealerCustomerList from './DealerCustomerList';
const MasterComponent = () => {
    return (
        <div className='container-fluid'>
            <div className="row border-bottom g-3 px-3 py-2 align-items-start flex-wrap">
                {/* Dealer/Customer Dropdown */}
                <div className="col-12 col-md-4 col-lg-3">
                    <DealerCustomerList />
                </div>
                {/* Right Category Section */}
                <div className="col-12 col-md-8 col-lg-9">
                    <ProductcategoryMaster />
                </div>
            </div>
        </div>
    )
}

export default MasterComponent