import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import Image from '../Image';
import toMoney from '../../utils/toMoney';
import toTime from '../../utils/toTime';

const PosterInfos = ({
  posterPath, title, originalTitle, genres, runtime, director, releaseDate,
  budget, revenue, type, seasons, episodes,
}) => (
  <Grid container direction="row" className="poster-infos">
    <Grid item className="poster-image">
      <Image path={posterPath} alt={title} size="w200" />
    </Grid>
    <Grid item>
      <table border="0" className="infos">
        <tbody>
          <tr>
            <th>Original Title</th>
            <td>
              {originalTitle}
            </td>
          </tr>
          <tr>
            <th>Genre</th>
            <td>
              {genres && genres.map((genre, key) => (
                <span key={genre.id}>
                  {genre.name}
                  {genres.length !== key + 1 ? ', ' : ''}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>
              {runtime && `${toTime(runtime)}${type === 'tv' ? '/ep' : ''}`}
            </td>
          </tr>
          <tr>
            <th>Release</th>
            <td>
              {releaseDate}
            </td>
          </tr>
          {
            type === 'movie'
              ? (
                <>
                  <tr>
                    <th>Direction</th>
                    <td>
                      {director}
                    </td>
                  </tr>
                  <tr>
                    <th>Budget</th>
                    <td>
                      {toMoney(budget) || '-'}
                    </td>
                  </tr>
                  <tr>
                    <th>Revenue</th>
                    <td>
                      {toMoney(revenue) || '-'}
                    </td>
                  </tr>
                </>
              )
              : (
                <>
                  <tr>
                    <th>Seasons</th>
                    <td>
                      {seasons}
                    </td>
                  </tr>
                  <tr>
                    <th>Episodes</th>
                    <td>
                      {episodes}
                    </td>
                  </tr>
                </>
              )
          }
        </tbody>
      </table>
    </Grid>
  </Grid>
);

PosterInfos.propTypes = {
  posterPath: PropTypes.string,
  title: PropTypes.string,
  originalTitle: PropTypes.string,
  genres: PropTypes.array,
  runtime: PropTypes.number,
  director: PropTypes.string,
  releaseDate: PropTypes.string,
  budget: PropTypes.number,
  revenue: PropTypes.number,
  type: PropTypes.string,
  seasons: PropTypes.number,
  episodes: PropTypes.number,
};

PosterInfos.defaultProps = {
  genres: [],
  director: '-',
  releaseDate: '',
  originalTitle: '',
  posterPath: '',
  title: '',
  budget: 0,
  revenue: 0,
  runtime: 0,
  type: 'movie',
  seasons: 0,
  episodes: 0,
};

export default PosterInfos;
