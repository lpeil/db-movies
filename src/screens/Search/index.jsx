import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ListCards } from '../../components';

import { apiSearchMovies } from '../../services/search';

const Home = () => {
  const { text } = useParams();

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingTvShows, setLoadingTvShows] = useState(true);

  const itemsPerPage = 14;

  useEffect(() => {
    apiSearchMovies(1, 'movie', text)
      .then((data) => {
        setMovies(data.results);
        setLoadingMovies(false);
      });

    apiSearchMovies(1, 'tv', text)
      .then((data) => {
        setTvShows(data.results);
        setLoadingTvShows(false);
      });
  }, [text]);

  return (
    <div className="home-screen">
      <ListCards
        type="movie"
        module="disable"
        title="Search Movies"
        itemsPerPage={itemsPerPage}
        apiGet={apiSearchMovies}
        listItems={movies}
        query={text}
        loading={loadingMovies}
      />
      <ListCards
        type="tv"
        module="disable"
        title="Search TV Shows"
        itemsPerPage={itemsPerPage}
        apiGet={apiSearchMovies}
        listItems={tvShows}
        query={text}
        loading={loadingTvShows}
      />
    </div>
  );
};

export default Home;
