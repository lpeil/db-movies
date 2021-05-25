import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  TextField, Button, Menu, MenuItem,
} from '@material-ui/core';
import {
  ExpandMore,
} from '@material-ui/icons';

import debounce from '../../utils/debounce';

const Navbar = () => {
  const searchInput = useRef();
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <Link to="/" className="brand-name">{t('site.name')}</Link>
        <div className="search-container">
          <TextField
            inputRef={searchInput}
            name="search"
            label={t('inputs.search')}
            variant="outlined"
            onChange={((e) => searchContent(e.target.value))}
          />
        </div>
        <Button
          variant="outlined"
          color="primary"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          {i18n.language.toLocaleUpperCase()}
          <ExpandMore />
        </Button>
        <Menu
          id="menu-navbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => changeLanguage('pt')}>Português</MenuItem>
          <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
