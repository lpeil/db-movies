import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ListCards } from '../../components';

import { apiGetTrending } from '../../services/trending';
import { addMoreMovies, clearMovies } from '../../store/modules/movies/actions';
import { addMoreTvShows, clearTvShows } from '../../store/modules/tvShows/actions';

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const tvShows = useSelector((state) => state.tvShows);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingTvShows, setLoadingTvShows] = useState(true);
  const { t, i18n } = useTranslation();

  const itemsPerPage = 14;

  useEffect(() => {
    setLoadingTvShows(true);
    setLoadingMovies(true);

    if (movies.length) {
      dispatch(clearMovies());
    }
    if (tvShows.length) {
      dispatch(clearTvShows());
    }

    apiGetTrending(1)
      .then((data) => {
        dispatch(addMoreMovies(data.results));
        setLoadingMovies(false);
      });

    apiGetTrending(1, 'tv')
      .then((data) => {
        dispatch(addMoreTvShows(data.results));
        setLoadingTvShows(false);
      });
  }, [i18n.language]);

  return (
    <div className="home-screen">
      <ListCards
        type="movie"
        module="movies"
        title={t('titles.trending.movies')}
        itemsPerPage={itemsPerPage}
        apiGet={apiGetTrending}
        listItems={movies}
        query="week"
        loading={loadingMovies}
      />
      <ListCards
        type="tv"
        module="tvShows"
        title={t('titles.trending.tvShows')}
        itemsPerPage={itemsPerPage}
        apiGet={apiGetTrending}
        listItems={tvShows}
        query="week"
        loading={loadingTvShows}
      />
    </div>
  );
};

export default Home;
