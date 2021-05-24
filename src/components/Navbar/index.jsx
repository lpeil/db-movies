import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  TextField, Button,
} from '@material-ui/core';

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
      <Link to="/" className="brand-name">Site Name</Link>
      <TextField
        ref={searchInput}
        name="search"
        variant="outlined"
        placeholder="Search"
        onChange={((e) => searchContent(e.target.value))}
      />
      <Button>EN</Button>
    </div>
  );
};

export default Navbar;
