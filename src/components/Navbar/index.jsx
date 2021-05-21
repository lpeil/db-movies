import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    <div>
      <Link to="/">Home</Link>
      <input
        ref={searchInput}
        name="search"
        onChange={((e) => searchContent(e.target.value))}
      />
    </div>
  );
};

export default Navbar;
