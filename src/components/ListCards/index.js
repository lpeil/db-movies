import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Grid, Button } from '@material-ui/core';
import Card from '../Card';

import { addMoreMovies } from '../../store/modules/movies/actions';
import { addMoreTvShows } from '../../store/modules/tvShows/actions';

const ListCards = ({
  itemsPerPage, type, title, module, apiGet, listItems, query,
}) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  const [loadedAll, setLoadedAll] = useState(false);

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

  const loadMore = () => {
    if (items.length < itemsPerPage * (page + 1)) {
      apiGet((apiPage + 1), type, query)
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

    setPage(page + 1);
  };

  return (
    <div className="list-cards">
      <h1>{title}</h1>
      {
        items.length
          ? (
            <>
              <Grid container direction="row" spacing={2}>
                {items.slice(0, (itemsPerPage * page)).map((item) => (
                  <Grid item key={item.id}>
                    <Card data={item} type={type} />
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
                  Load More
                </Button>
              </Grid>
            </>
          )
          : <h1 className="no-data">No data</h1>
      }
    </div>
  );
};

ListCards.propTypes = {
  itemsPerPage: PropTypes.number,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  apiGet: PropTypes.func.isRequired,
  listItems: PropTypes.array,
  query: PropTypes.string,
};

ListCards.defaultProps = {
  itemsPerPage: 14,
  listItems: [],
  query: '',
};

export default ListCards;
