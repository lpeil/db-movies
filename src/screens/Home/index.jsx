import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ListCards } from '../../components';

import { apiGetTrending } from '../../services/trending';
import { addMoreMovies } from '../../store/modules/movies/actions';
import { addMoreTvShows } from '../../store/modules/tvShows/actions';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const tvShows = useSelector((state) => state.tvShows);

  const itemsPerPage = 14;

  useEffect(() => {
    apiGetTrending(1)
      .then((data) => {
        dispatch(addMoreMovies(data.results));
      });

    apiGetTrending(1, 'tv')
      .then((data) => {
        dispatch(addMoreTvShows(data.results));
      });
  }, []);

  return (
    <div className="home-screen">
      <ListCards
        type="movie"
        module="movies"
        title="Trending Movies"
        itemsPerPage={itemsPerPage}
        apiGet={apiGetTrending}
        listItems={movies}
        query="week"
      />
      <ListCards
        type="tv"
        module="tvShows"
        title="Trending TV Shows"
        itemsPerPage={itemsPerPage}
        apiGet={apiGetTrending}
        listItems={tvShows}
        query="week"
      />
    </div>
  );
};

export default Home;
