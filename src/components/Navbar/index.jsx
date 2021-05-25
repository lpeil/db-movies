import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  TextField, Button,
} from '@material-ui/core';
import {
  ExpandMore,
} from '@material-ui/icons';

import debounce from '../../utils/debounce';

const Navbar = () => {
  const searchInput = useRef();

  const history = useHistory();

  const searchContent = debounce((value) => {
    if (value) {
      history.push(`/search/${value}`);
    }
  }, 500);

  history.listen((location) => {
    if (!location.pathname.startsWith('/search/') && searchInput.current) {
      searchInput.current.value = '';
    }
  });

  return (
    <div className="navbar">
      <div className="navbar-content">
        <Link to="/" className="brand-name">Site Name</Link>
        <div className="search-container">
          <TextField
            inputRef={searchInput}
            name="search"
            label="Search"
            variant="outlined"
            onChange={((e) => searchContent(e.target.value))}
          />
        </div>
        <Button variant="outlined" color="primary">
          EN
          <ExpandMore />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
