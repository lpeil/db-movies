import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Button } from '@material-ui/core';
import { Card } from '../../components';

import { apiGetTrending } from '../../services/trending';
import { addMoreMovies } from '../../store/modules/movies/actions';
import { addMoreTvShows } from '../../store/modules/tvShows/actions';

const ListSection = ({
  itemsPerPage, type, title, module,
}) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state[module]);

  const [page, setPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);

  const loadMore = () => {
    if (items.length < itemsPerPage * (page + 1)) {
      apiGetTrending((apiPage + 1), type)
        .then((data) => {
          if (type === 'movie') {
            dispatch(addMoreMovies(data.results));
          } else {
            dispatch(addMoreTvShows(data.results));
          }
          setApiPage(apiPage + 1);
        });
    }

    setPage(page + 1);
  };

  return (
    <>
      <h1>{title}</h1>
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
        >
          Load More
        </Button>
      </Grid>
    </>
  );
};

ListSection.propTypes = {
  itemsPerPage: PropTypes.number,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
};

ListSection.defaultProps = {
  itemsPerPage: 14,
};

export default ListSection;
