import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Grid, Button } from '@material-ui/core';
import Card from '../Card';

import { addMoreMovies } from '../../store/modules/movies/actions';
import { addMoreTvShows } from '../../store/modules/tvShows/actions';

const ListCards = ({
  type, title, module, apiGet, listItems, query, lines, loading,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  const [loadedAll, setLoadedAll] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(14);
  const [loadingMore, setLoadingMore] = useState(false);
  const containerDiv = useRef();

  function setQuantityOfItems() {
    let cardsPerLine = Math.floor(containerDiv.current?.offsetWidth / 216);
    if (cardsPerLine > 10) cardsPerLine = 10;
    if (cardsPerLine < 1) cardsPerLine = 1;

    setItemsPerPage(cardsPerLine * lines);
  }

  useEffect(() => {
    if (listItems) {
      setItems(listItems);
      setLoadedAll(listItems.length < itemsPerPage);
    }
  }, [listItems]);

  useEffect(() => {
    setPage(1);
    setApiPage(1);
  }, [query]);

  useEffect(() => {
    window.addEventListener('resize', setQuantityOfItems);
  });

  useEffect(() => {
    setQuantityOfItems();
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);

    if (items.length < itemsPerPage * (page + 1)) {
      await apiGet((apiPage + 1), type, query)
        .then((data) => {
          if (module === 'disable') {
            setItems(items.concat(data.results));
          } else if (type === 'movie') {
            dispatch(addMoreMovies(data.results));
          } else {
            dispatch(addMoreTvShows(data.results));
          }

          setLoadedAll(data.total_pages === (apiPage + 1));
          setApiPage(apiPage + 1);
        });
    }

    setLoadingMore(false);
    setPage(page + 1);
  };

  const cardFlexBasis = () => ({
    flexBasis: `${Math.floor(100 / (itemsPerPage / 2))}%`,
  });

  return (
    <div className="list-cards" ref={containerDiv}>
      <h1>{title}</h1>
      {
        items.length || loading || loadingMore
          ? (
            <>
              <Grid container direction="row" justify="space-between">
                {items.slice(0, (itemsPerPage * page)).map((item) => (
                  <Grid
                    item
                    container
                    key={item.id}
                    style={cardFlexBasis()}
                    justify="center"
                    className="card-container"
                  >
                    <Card data={item} type={type} />
                  </Grid>
                ))}
                {(loading || loadingMore) && [...Array(itemsPerPage)].map((item, key) => (
                  <Grid
                    item
                    container
                    key={key}
                    style={cardFlexBasis()}
                    justify="center"
                    className="card-container"
                  >
                    <Card loading />
                  </Grid>
                ))}
              </Grid>
              <Grid container justify="center">
                <Button
                  onClick={loadMore}
                  color="primary"
                  variant="contained"
                  disabled={loadedAll}
                >
                  {t('inputs.loadMore')}
                </Button>
              </Grid>
            </>
          )
          : <h1 className="no-data">{t('errors.nodata')}</h1>
      }
    </div>
  );
};

ListCards.propTypes = {
  lines: PropTypes.number,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  apiGet: PropTypes.func.isRequired,
  listItems: PropTypes.array,
  query: PropTypes.string,
  loading: PropTypes.bool,
};

ListCards.defaultProps = {
  listItems: [],
  query: '',
  lines: 2,
  loading: false,
};

export default ListCards;
