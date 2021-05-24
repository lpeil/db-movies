import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Button } from '@material-ui/core';

import { apiGetTrending } from '../../services/trending';
import { addMoreMovies } from '../../store/modules/movies/actions';

import { Card } from '../../components';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  useEffect(() => {
    if (!movies.length) {
      apiGetTrending()
        .then((data) => {
          dispatch(addMoreMovies(data.results));
        });
    }
  }, []);

  return (
    <div className="home-screen">
      <h1>Trending Movies</h1>
      <Grid container direction="row" spacing={2}>
        {movies.slice(0, 14).map((movie) => (
          <Grid item key={movie.id}>
            <Card data={movie} type="movie" />
          </Grid>
        ))}
      </Grid>
      <Grid container justify="center">
        <Button variant="contained" color="primary">Load More</Button>
      </Grid>
    </div>
  );
};

export default Home;
