import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating';

import { Star, StarOutline } from '@material-ui/icons';

import { Image } from '../../components';

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
    <div className="movie-screen">
      <div className="banner">
        <Image path={movie.backdrop_path} alt={movie.title} size="original" />
        <div className="banner-infos">
          <h1>{movie.title}</h1>
          <Rating
            initialRating={movie.vote_average / 2}
            readonly
            fullSymbol={<Star />}
            emptySymbol={<StarOutline />}
          />
        </div>
      </div>
      <div className="banner-size" />
      <p>{movie.overview}</p>
    </div>
  );
};

export default Movie;
