import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  OutlinedInput, Button, Menu, MenuItem, InputAdornment, FormControl, InputLabel,
} from '@material-ui/core';
import {
  ExpandMore, Search as SearchIcon,
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
          <FormControl>
            <InputLabel htmlFor="input-search">{t('inputs.search')}</InputLabel>
            <OutlinedInput
              htmlFor="input-search"
              inputRef={searchInput}
              name="search"
              label={t('inputs.search')}
              variant="outlined"
              onChange={((e) => searchContent(e.target.value))}
              endAdornment={(
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
            )}
            />
          </FormControl>
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
