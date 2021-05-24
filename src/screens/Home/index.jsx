import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ListSection from './listSection';

import { apiGetTrending } from '../../services/trending';
import { addMoreMovies } from '../../store/modules/movies/actions';
import { addMoreTvShows } from '../../store/modules/tvShows/actions';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const tvShows = useSelector((state) => state.tvShows);
  const itemsPerPage = 14;

  useEffect(() => {
    if (!movies.length) {
      apiGetTrending(1)
        .then((data) => {
          dispatch(addMoreMovies(data.results));
        });
    }

    if (!tvShows.length) {
      apiGetTrending(1, 'tv')
        .then((data) => {
          dispatch(addMoreTvShows(data.results));
        });
    }
  }, []);

  return (
    <div className="home-screen">
      <ListSection
        type="movie"
        module="movies"
        title="Trending Movies"
        itemsPerPage={itemsPerPage}
      />
      <ListSection
        type="tv"
        module="tvShows"
        title="Trending TV Shows"
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Home;
