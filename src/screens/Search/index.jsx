import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { apiSearchMovies } from '../../services/movies';

const SearchPage = () => {
  const { text } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    apiSearchMovies(text)
      .then((data) => {
        setMovies(data.results);
      });
  }, [text]);

  return (
    <div>
      <h1>{`Search: ${text}`}</h1>
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <h1>{movie.title}</h1>
        </Link>
      ))}
    </div>
  );
};

export default SearchPage;
