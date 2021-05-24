import React from 'react';
import PropTypes from 'prop-types';

import { IconButton } from '@material-ui/core';

import { NavigateNext, NavigateBefore } from '@material-ui/icons';

const NextArrow = ({ onClick, direction }) => (
  <IconButton className={`arrow ${direction}`} onClick={onClick} component="span">
    {
      direction === 'prev'
        ? <NavigateBefore style={{ fontSize: 30 }} />
        : <NavigateNext style={{ fontSize: 30 }} />
    }
  </IconButton>
);

NextArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

NextArrow.defaultProps = {
  onClick: () => {},
};

export default NextArrow;
