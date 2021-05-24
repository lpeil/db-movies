import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ImageIcon from '@material-ui/icons/Image';

const Image = ({ path, alt, size }) => {
  const [loaded, setLoaded] = useState(!path);

  return (
    <div className="image-container">
      {
        path
          ? (
            <img
              src={`${process.env.TMDB_IMAGES}${size}${path}`}
              alt={alt}
              className={!loaded ? 'hidden' : null}
              onLoad={() => setLoaded(true)}
            />
          )
          : (
            <div className="no-image">
              <ImageIcon />
            </div>
          )
      }
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
