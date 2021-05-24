import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ type, data, size }) => (
  <div className={`card ${type} size-${size}`}>
    <img src={`${process.env.TMDB_IMAGES}w300${data.poster_path}`} alt={data.title} />
    {
      type === 'movie'
        ? (
          <div className="bottom-name">
            <span>{data.title}</span>
          </div>
        )
        : null
    }
  </div>
);

Card.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Card.defaultProps = {
  size: 'medium',
};

export default Card;
