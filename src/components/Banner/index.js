import React from 'react';
import PropTypes from 'prop-types';

import { Star, StarOutline } from '@material-ui/icons';
import Rating from 'react-rating';

import Image from '../Image';

const Banner = ({
  backdropPath, title, voteAverage, voteCount, loading,
}) => (
  <>
    <div className={`banner${loading ? ' loading' : ''}`}>
      <Image path={backdropPath} alt={title} size="original" />
      <div className="banner-infos">
        {
          loading
            ? <div className="loader h1" />
            : <h1>{title}</h1>
        }
        {
          loading
            ? <div className="loader rating" />
            : (
              <div className="rating">
                <Rating
                  initialRating={voteAverage}
                  readonly
                  fullSymbol={<Star />}
                  emptySymbol={<StarOutline />}
                />
                <span className="vote-count">{`(${voteCount})`}</span>
              </div>
            )
        }
      </div>
    </div>
    <div className="banner-size" />
  </>
);

Banner.propTypes = {
  backdropPath: PropTypes.string,
  title: PropTypes.string,
  voteAverage: PropTypes.number,
  voteCount: PropTypes.number,
  loading: PropTypes.bool,
};

Banner.defaultProps = {
  backdropPath: '',
  title: '',
  voteAverage: 0,
  voteCount: 0,
  loading: false,
};

export default Banner;
