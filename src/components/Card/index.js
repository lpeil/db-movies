import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Image from '../Image';

const Card = ({
  type, data, size, loading,
}) => {
  const history = useHistory();

  const navigate = () => {
    history.push(`/${type}/${data.id}`);
  };

  return (
    <button
      type="button"
      className={`card ${type} size-${size}`}
      onClick={navigate}
    >
      {
      loading
        ? null
        : <Image path={data.poster_path} alt={type === 'movie' ? data.title : data.name} />
    }
      {
      ['movie', 'tv'].includes(type)
        ? (
          <div className="bottom-name">
            <span>{type === 'movie' ? data.title : data.name}</span>
          </div>
        )
        : null
    }
    </button>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
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
