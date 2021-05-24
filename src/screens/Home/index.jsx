import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    <div>
      {movies.map((movie) => (
        <Card key={movie.id} data={movie} type="movie" />
      ))}
    </div>
  );
};

export default Home;
