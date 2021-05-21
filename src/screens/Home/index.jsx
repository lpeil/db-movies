import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { apiGetTrending } from '../../services/trending';
import { addMoreMovies } from '../../store/modules/movies/actions';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  useEffect(() => {
    apiGetTrending()
      .then((data) => {
        dispatch(addMoreMovies(data.results));
      });
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <h1>{movie.title}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Home;
