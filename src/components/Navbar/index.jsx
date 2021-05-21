import React from 'react';
import { Debounce } from 'react-throttle';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();

  const searchContent = (e) => {
    const searchValue = e.target.value;

    if (searchValue) {
      return history.push(`/search/${searchValue}`);
    }

    return history.push('/');
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Debounce time="500" handler="onChange">
        <input
          name="search"
          onChange={searchContent}
        />
      </Debounce>
    </div>
  );
};

export default Navbar;
