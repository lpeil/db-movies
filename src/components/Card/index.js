import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';

const Card = ({
  type, data, size, loading,
}) => (
  <div className={`card ${type} size-${size}`}>
    {
      loading
        ? null
        : <Image path={data.poster_path} alt={type === 'movie' ? data.title : data.name} />
    }
    {
      ['movie', 'serie'].includes(type)
        ? (
          <div className="bottom-name">
            <span>{type === 'movie' ? data.title : data.name}</span>
          </div>
        )
        : null
    }
  </div>
);

Card.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  size: PropTypes.string,
  type: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Card.defaultProps = {
  size: 'medium',
  loading: false,
};

export default Card;
