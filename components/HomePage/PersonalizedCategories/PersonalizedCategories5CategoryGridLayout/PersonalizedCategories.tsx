import Link from 'next/link';
import Image from 'next/image';
import style from '../../../../styles/components/personalizedCategoriesShowcaseLayout.module.scss';
import { Button } from 'react-bootstrap';
import { imageLoader } from '../../../../utils/image_loader';

const PersonalizedCategories = ({ homeTopCategories }: any) => {
  return (
    <div className="custom-container-xl px-4 mt-3 mt-md-5 ">
      <div className={`row mt-3 mb-5 ${style.jewellery_personalized_categories_main_container}`}>
        <div className="col-lg-3">
          <div className="d-flex flex-lg-column ">
            <div className={`position-relative w-100 w-md-50 mb-lg-2 ${style.jewellery_personalized_categories_small_container}`}>
              <Link
                href={`${homeTopCategories[0]?.category_url}`}
                className="banner-title text-white text-capitalize ls-25 homecategory_btnlink"
              >
                <Image
                  loader={imageLoader}
                  className={`w-100 ${style.showcase_image_1}`}
                  src={homeTopCategories?.length > 0 && homeTopCategories[0]?.product_img}
                  alt={homeTopCategories[0]?.label}
                  width={500}
                  height={500}
                  loading="eager"
                  priority={true}
                />
              </Link>
              <div className={style.showCaseContainerButton}>
                <Button variant="dark" className={style.showCase_btn}>
                  {homeTopCategories[0]?.label}
                </Button>
              </div>
            </div>
            <div className={`position-relative mt-lg-4 w-100 w-md-50  ${style.jewellery_personalized_categories_small_container}`}>
              <Link
                href={`${homeTopCategories[1]?.category_url}`}
                className="banner-title text-white text-capitalize ls-25 homecategory_btnlink"
              >
                <Image
                  loader={imageLoader}
                  className={`w-100 ${style.showcase_image_1}`}
                  src={homeTopCategories?.length > 0 && homeTopCategories[1]?.product_img}
                  alt={homeTopCategories[1]?.label}
                  width={500}
                  height={500}
                  loading="eager"
                  priority={true}
                />
              </Link>
              <div className={style.showCaseContainerButton}>
                <Button variant="dark" className={style.showCase_btn}>
                  {homeTopCategories[1]?.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="d-flex flex-column px-md-2">
            <div className={`mb-lg-2  ${style.jewellery_personalized_categories_small_container}`}>
              <Link
                href={`${homeTopCategories[2]?.category_url}`}
                className="banner-title text-white text-capitalize ls-25 homecategory_btnlink"
              >
                <Image
                  loader={imageLoader}
                  className={`w-100 ${style.showcase_image_1}`}
                  src={homeTopCategories?.length > 0 && homeTopCategories[2]?.product_img}
                  alt={homeTopCategories[2]?.label}
                  width={500}
                  height={500}
                  loading="eager"
                  priority={true}
                />
              </Link>
            </div>
            <div className={`position-relative mt-lg-4 ${style.jewellery_personalized_categories_small_container}`}>
              <Link
                href={`${homeTopCategories[3]?.category_url}`}
                className="banner-title text-white text-capitalize ls-25 homecategory_btnlink"
              >
                <Image
                  loader={imageLoader}
                  className={`w-100 ${style.showcase_image_1}`}
                  src={homeTopCategories?.length > 0 && homeTopCategories[3]?.product_img}
                  alt={homeTopCategories[3]?.label}
                  width={500}
                  height={500}
                  loading="eager"
                  priority={true}
                />
              </Link>
              <div className={style.showCaseContainerButton}>
                <Button variant="dark" className={style.showCase_btn}>
                  {homeTopCategories[3]?.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 position-relative" style={{ height: '536px' }}>
          <Link
            href={`${homeTopCategories[4]?.category_url}`}
            className="banner-title text-white text-capitalize ls-25 homecategory_btnlink"
          >
            <Image
              loader={imageLoader}
              className={`w-100 ${style.showcase_image_acc}`}
              src={homeTopCategories?.length > 0 && homeTopCategories[4]?.product_img}
              alt={homeTopCategories[4]?.label}
              width={500}
              height={500}
              loading="eager"
              priority={true}
            />
          </Link>
          <div className={style.showCaseContainerButton}>
            <Button variant="dark" className={style.showCase_btn}>
              {homeTopCategories[4]?.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedCategories;
