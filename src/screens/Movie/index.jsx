import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Banner, Cast, PosterInfos, Recommendations,
} from '../../components';

import {
  apiGetMovieById, apiGetMovieRecommendations, apiGetMovieCredits,
} from '../../services/movies';

const Movie = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [credits, setCredits] = useState({});
  const [loading, setLoading] = useState(true);

  const loadExtraInfos = () => {
    apiGetMovieRecommendations(movieId)
      .then((data) => {
        setRecommendations(data.results);
      });

    apiGetMovieCredits(movieId)
      .then((data) => {
        setCredits(data);
      });
  };

  useEffect(() => {
    setLoading(true);
    setMovie({});
    setRecommendations([]);
    setCredits({});
    window.scrollTo(0, 0);

    apiGetMovieById(movieId)
      .then((data) => {
        setMovie(data);
        setLoading(false);
        loadExtraInfos();
      });
  }, [movieId]);

  return (
    <div className="movie-screen">
      <Banner
        backdropPath={movie.backdrop_path}
        title={movie.title}
        voteAverage={movie.vote_average / 2}
        voteCount={movie.vote_count}
        loading={loading}
      />
      {
        loading
          ? <div className="loader sinopse" />
          : <p className="sinopse">{movie.overview}</p>
      }
      <PosterInfos
        type="movie"
        director={credits.crew && credits.crew.filter((crew) => crew.job === 'Director')[0]?.name}
        posterPath={movie.poster_path}
        title={movie.title}
        originalTitle={movie.original_title}
        genres={movie.genres}
        runtime={movie.runtime}
        releaseDate={movie.release_date}
        budget={movie.budget}
        revenue={movie.revenue}
        loading={loading}
      />
      <Cast cast={credits.cast} />
      <Recommendations recommendations={recommendations} type="movie" />
    </div>
  );
};

export default Movie;
