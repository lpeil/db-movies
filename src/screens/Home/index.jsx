import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Button } from '@material-ui/core';

import { apiGetTrending } from '../../services/trending';
import { addMoreMovies } from '../../store/modules/movies/actions';
import { addMoreSeries } from '../../store/modules/series/actions';

import { Card } from '../../components';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const series = useSelector((state) => state.series);
  const [pageMovie, setPageMovie] = useState(1);
  const [apiPageMovie, setApiPageMovie] = useState(1);
  const [pageSerie, setPageSerie] = useState(1);
  const [apiPageSerie, setApiPageSerie] = useState(1);
  const itemsPerPage = 14;

  useEffect(() => {
    if (!movies.length) {
      apiGetTrending(1)
        .then((data) => {
          dispatch(addMoreMovies(data.results));
        });
    }

    if (!series.length) {
      apiGetTrending(1, 'tv')
        .then((data) => {
          dispatch(addMoreSeries(data.results));
        });
    }
  }, []);

  const loadMore = (type) => {
    if (type === 'movie' && movies.length < itemsPerPage * (pageMovie + 1)) {
      apiGetTrending((apiPageMovie + 1), type)
        .then((data) => {
          dispatch(addMoreMovies(data.results));
          setApiPageMovie(apiPageMovie + 1);
        });
    } else if (series.length < itemsPerPage * (pageSerie + 1)) {
      apiGetTrending((apiPageSerie + 1), type)
        .then((data) => {
          dispatch(addMoreSeries(data.results));
          setApiPageSerie(apiPageSerie + 1);
        });
    }

    if (type === 'movie') {
      setPageMovie(pageMovie + 1);
    } else {
      setPageSerie(pageSerie + 1);
    }
  };

  return (
    <div className="home-screen">
      <h1>Trending Movies</h1>
      <Grid container direction="row" spacing={2}>
        {movies.slice(0, (itemsPerPage * pageMovie)).map((movie) => (
          <Grid item key={movie.id}>
            <Card data={movie} type="movie" />
          </Grid>
        ))}
      </Grid>
      <Grid container justify="center">
        <Button
          onClick={() => loadMore('movie')}
          color="primary"
          variant="contained"
        >
          Load More
        </Button>
      </Grid>
      <h1>Trending Series</h1>
      <Grid container direction="row" spacing={2}>
        {series.slice(0, (itemsPerPage * pageSerie)).map((movie) => (
          <Grid item key={movie.id}>
            <Card data={movie} type="serie" />
          </Grid>
        ))}
      </Grid>
      <Grid container justify="center">
        <Button
          onClick={() => loadMore('tv')}
          color="primary"
          variant="contained"
        >
          Load More
        </Button>
      </Grid>
    </div>
  );
};

export default Home;
