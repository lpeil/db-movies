import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ path, alt }) => {
  return (
    <img src={`${process.env.TMDB_IMAGES}w300${path}`} alt={alt} />
  )
}

Image.propTypes = {
  path: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
