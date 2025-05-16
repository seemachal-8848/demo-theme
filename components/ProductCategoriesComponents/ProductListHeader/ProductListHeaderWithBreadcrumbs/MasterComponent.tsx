import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import UseBreadCrumbsHook from '../../../../hooks/GeneralHooks/useBreadcrumbs';
import { FaHome, FaAngleRight } from 'react-icons/fa';

function MasterComponent() {
  const { breadCrumbData, isLoading, errorMessage } = UseBreadCrumbsHook();
  const router = useRouter();
  const { query } = router;

  // Function to build query parameters, including vehicle_filters if present
  const buildQueryParams = () => {
    return new URLSearchParams({
      page: '1',
      ...(query.vehicle_filters && { vehicle_filters: query.vehicle_filters as string }),
    }).toString();
  };

  return (
    <div className="row ps-lg-5 pe-lg-4 px-md-3 px-3 ">
    <div className="col-12 col-sm-6  ">
      <div className="list-toggle-rtl">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/" legacyBehavior>
            <a>
              <FaHome className="mb-1" />
            </a>
          </Link>
        </li>
        {breadCrumbData?.length > 0 &&
          breadCrumbData?.map((item: any, index: number) => (
            <div key={index} className="d-flex">
              <FaAngleRight className="my-1" size={15} color="#999" />
              <li className="breadcrumb-item active text-secondary" aria-current="page">
                <Link
                  href={`${item?.link}?${buildQueryParams()}`}
                  legacyBehavior
                >
                  <a className="text-secondary">{item?.name}</a>
                </Link>
              </li>
            </div>
          ))}
      </ol>
    </nav>
    </div>
      </div>
      
    </div>
  );
}

export default MasterComponent;