import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ListCards } from '../../components';

import { apiSearchMovies } from '../../services/search';

const Home = () => {
  const { text } = useParams();

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  const itemsPerPage = 14;

  useEffect(() => {
    if (!movies.length) {
      apiSearchMovies(1, 'movie', text)
        .then((data) => {
          setMovies(data.results);
        });
    }

    if (!tvShows.length) {
      apiSearchMovies(1, 'tv', text)
        .then((data) => {
          setTvShows(data.results);
        });
    }
  }, []);

  return (
    <div className="home-screen">
      <ListCards
        type="movie"
        module="disable"
        title="Search Movies"
        itemsPerPage={itemsPerPage}
        apiGet={apiSearchMovies}
        listItems={movies}
      />
      <ListCards
        type="tv"
        module="disable"
        title="Search TV Shows"
        itemsPerPage={itemsPerPage}
        apiGet={apiSearchMovies}
        listItems={tvShows}
      />
    </div>
  );
};

export default Home;
