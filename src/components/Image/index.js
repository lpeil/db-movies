import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Image = ({ path, alt, size }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="image-container">
      <img
        src={`${process.env.TMDB_IMAGES}${size}${path}`}
        alt={alt}
        className={!loaded ? 'hidden' : null}
        onLoad={() => setLoaded(true)}
      />
      {
        !loaded
          ? <div className="loading" />
          : null
      }

    </div>
  );
};

Image.propTypes = {
  path: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Image.defaultProps = {
  size: 'w300',
};

export default Image;
