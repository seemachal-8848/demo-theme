import Link from 'next/link';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';
import CarouselCaption from 'react-bootstrap/CarouselCaption';
import CarouselItem from 'react-bootstrap/CarouselItem';
import style from '../../../../styles/components/banner.module.scss';
import { imageLoader } from '../../../../utils/image_loader';

const BannerCarousel = ({ bannersList }: any) => {
  return (
    <div className={style.overlay}>
      <Carousel controls={false} className="h-100">
        {bannersList?.map((banners: any, index: number) => {
          return (
            <CarouselItem key={index} className="h-100">
              <Link href={`${banners.button_1_url}`} className=" h-100">
                <Image
                  loader={imageLoader}
                  className={` ${style.catagoryImg} h-100`}
                  style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                  src={banners?.img}
                  alt="Banner Images"
                  loading="eager"
                  priority={true}
                  layout="responsive"
                  width={100}
                  height={100}
                />
                <CarouselCaption className={` ${index === 1 ? style.corousel_caption_center : style.corousel_caption_left}`}>
                  <div className={`${style.banner_content_container}`} key={index}>
                    <p className={`${style.banner_p_tag_left}`}>{banners?.description}</p>
                    <h2 className={`${style.bannerTitle_left}`}>{banners?.heading}</h2>
                    <a href={banners.button_1_url} className="text-white">
                      <span className={`btn btn-primary ${style.banner_btn}`}>
                        {banners?.button_1_title} &nbsp; <i className="fa fa-forward text-light align-items-center"></i>
                      </span>
                    </a>
                  </div>
                </CarouselCaption>
              </Link>
            </CarouselItem>
          );
        })}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
