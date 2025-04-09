import React from 'react';
import { MdOutlineStar, MdOutlineStarHalf, MdOutlineStarBorder } from 'react-icons/md';
type Props = {};

const StarRating = (props: any) => {
  const { rating }: any = props;
  const fullStars: any = (rating * 10) / 2;
  const emptyStars: any = 5 - fullStars;
  const renderStar: any = (type: string) => {
    if (type === 'full') {
      return <MdOutlineStar style={{ color: '#f3b409', fontSize: '25px' }} />;
    } else if (type === 'half') {
      return <MdOutlineStarHalf style={{ color: '#f3b409', fontSize: '25px' }} />;
    } else {
      return <MdOutlineStarBorder style={{ color: '#f3b409', fontSize: '25px' }} />;
    }
  };
  return (
    <div className="star-rating">
      {rating !== null && (
        <>
          {fullStars % 1 === 0 ? (
            <>
              {[...Array(fullStars)].map((e: any, i: any) => (
                <span key={i} className="me-2">
                  {renderStar('full')}
                </span>
              ))}
              {[...Array(emptyStars)].map((e: any, i: any) => (
                <span key={i} className="me-2">
                  {renderStar('empty')}
                </span>
              ))}
            </>
          ) : (
            <>
              {[...Array(Math.floor(fullStars))].map((e: any, i: any) => (
                <span key={i} className="me-2 ">
                  {renderStar('full')}
                </span>
              ))}
              {<span className="me-2 ">{renderStar('half')}</span>}
              {[...Array(Math.floor(emptyStars))].map((e: any, i: any) => (
                <span key={i} className="me-2 ">
                  {renderStar('empty')}
                </span>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StarRating;
