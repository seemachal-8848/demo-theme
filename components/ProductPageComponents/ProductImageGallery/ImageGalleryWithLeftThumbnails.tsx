import ReactImageMagnify from 'react-image-magnify';
import Image from 'next/image';
import { CONSTANTS } from '../../../services/config/app-config';
import { ProductSlideshowImages } from '../../../interfaces/product-slideshow-images';
import imageStyle from '../../../styles/components/productImgMagnify.module.scss';
import useImageGallery from '../../../hooks/ProductImageGalleryHandler/useImageGallery';
import { imageLoader } from '../../../utils/image_loader';

const ImageGalleryWithLeftThumbnails = ({ slideShowImages }: any) => {
  const { enlargeImg, activeImgIndex, handleSelectedImage, generateSrcSet } = useImageGallery({ slideShowImages });
  const smallScreen = window.matchMedia('(max-width: 768px)');
  return (
    <div className={imageStyle.product_img_container}>
      <div className={imageStyle.img_container}>
        {/* Thumbnails */}
        <div className={`${imageStyle.thumbnail_left} `}>
          {slideShowImages?.length > 0 &&
            slideShowImages?.map((image: string, i: number) => (
              <div
                className={`${imageStyle.img_wrap} ${i === activeImgIndex ? `${imageStyle.active}` : ''}`}
                key={i}
                onClick={() => handleSelectedImage(image, i)}
              >
                <Image src={image} loader={imageLoader} alt={`Thumbnail image ${i + 1}`} width={100} height={100} />
              </div>
            ))}
        </div>

        {/* Magnified Image */}
        <div className={`${imageStyle.product_img} order-md-1 `}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: 'Product image',
                isFluidWidth: true,
                // width: 600,
                // height: 600,
                src: `${CONSTANTS.API_BASE_URL}/${enlargeImg}`,
                srcSet: generateSrcSet(enlargeImg), // Use srcSet to provide multiple resolutions
                sizes: `(max-width: 600px) 100vw, (max-width: 1200px) 90vw, 90vw`, // Define sizes for different screen widths
              },
              largeImage: {
                src: `${CONSTANTS.API_BASE_URL}/${enlargeImg}`,
                srcSet: generateSrcSet(enlargeImg), // Use srcSet for large image as well
                sizes: `(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 30vw`,
                width: 1200,
                height: 1200,
              },
              className: `${imageStyle.small_img}`,
              imageClassName: `${imageStyle.small_img}`,
              imageStyle: {
                objectFit: 'cover',
              },
              enlargedImageClassName: `${imageStyle.magnified_image}`,
              enlargedImagePosition: `${smallScreen?.matches ? 'over' : 'beside'}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryWithLeftThumbnails;
