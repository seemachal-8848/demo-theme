import BreadCrumbs from '../../../BreadCrumbs';

function MasterComponent() {
  return (
    <div className="container-fluid d-flex justify-content-between w-100 ps-lg-5 pe-lg-5 px-sm-4 ">
      <div className="w-100 list-toggle-rtl">
        <BreadCrumbs />
      </div>
    </div>
  );
}

export default MasterComponent;
