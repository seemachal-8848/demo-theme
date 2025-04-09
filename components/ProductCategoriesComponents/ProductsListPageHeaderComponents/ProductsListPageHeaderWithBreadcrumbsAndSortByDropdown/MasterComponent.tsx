import UseBreadCrumbsHook from '../../../../hooks/GeneralHooks/useBreadcrumbs';
import BreadCrumbs from '../../../BreadCrumbs';
import HorizantalFilterMaster from '../../HorizantalFilter/HorizantalFilterMaster';

function MasterComponent() {
  const { breadCrumbData, isLoading, errorMessage } = UseBreadCrumbsHook();

  return (
    <div className="container-fluid d-flex justify-content-between w-100 ps-lg-5 pe-lg-5 px-sm-4 ">
      <div className="w-50 list-toggle-rtl">
        <BreadCrumbs />
      </div>
      <HorizantalFilterMaster />
    </div>
  );
}

export default MasterComponent;
