import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { apiGetMovieById } from '../../services/movies';

const Movie = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    apiGetMovieById(movieId)
      .then((data) => {
        setMovie(data);
      });
  }, [movieId]);

  return (
    <div>
      <img src={`${process.env.TMDB_IMAGES}w500${movie.backdrop_path}`} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
};

export default Movie;
