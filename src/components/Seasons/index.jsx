/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Grid } from '@material-ui/core';
import {
  ExpandMore, ExpandLess, Star,
} from '@material-ui/icons';

import Image from '../Image';

import { apiGetTvSeason } from '../../services/tvShow';

const Seasons = ({ seasons, tvShowId, loading }) => {
  const { t } = useTranslation();

  const [config, setConfig] = useState({});
  const [episodes, setEpisodes] = useState({});

  const expandOverview = (seasonNumber) => {
    const copy = { ...config };

    if (!copy[seasonNumber]) copy[seasonNumber] = {};

    copy[seasonNumber].allOverview = true;

    setConfig(copy);
  };

  const expandSeason = (seasonNumber) => {
    const copy = { ...config };

    if (!copy[seasonNumber]) copy[seasonNumber] = {};

    copy[seasonNumber].showEpisodes = !copy[seasonNumber].showEpisodes;

    if (!episodes[seasonNumber]) {
      apiGetTvSeason(tvShowId, seasonNumber)
        .then((data) => {
          const episodesCopy = { ...episodes };

          episodesCopy[seasonNumber] = data.episodes;
          setEpisodes(episodesCopy);
        });
    }

    setConfig(copy);
  };

  const expandEpisode = (seasonNumber, key) => {
    const copy = { ...episodes };

    copy[seasonNumber][key].allOverview = true;

    setEpisodes(copy);
  };

  useEffect(() => {
    setConfig({});
    setEpisodes({});
  }, [tvShowId]);

  return (
    <div className="seasons">
      <h1>{t('titles.seasons')}</h1>
      <Grid container direction="row">
        {loading && [...Array(2)].map((item, key) => (
          <Grid item xs={12} md={6} key={key}>
            <div className="season-card loading">
              <div className="season-poster loader" />
              <div className="season-infos">
                <div className="loader title" />
                <div className="loader" />
                <div className="loader" />
                <div className="loader" />
              </div>
            </div>
          </Grid>
        ))}
        {seasons.map((season) => (
          <Grid item xs={12} md={6} key={season.id}>
            <div className="season-card">
              <div className="season-poster">
                <Image path={season.poster_path} />
              </div>
              <div className="season-infos">
                <h2>{season.name}</h2>
                <span>
                  {`${new Date(season.air_date).getFullYear()} | ${season.episode_count} ${t('infos.episodes')}`}
                </span>
                <span>
                  {
                  season.overview
                    ? season.overview.length > 250 && !config[season.season_number]?.allOverview
                      ? (
                        <>
                          {season.overview.slice(0, 250)}
                          {' '}
                          <span
                            className="overview-expand"
                            onClick={() => expandOverview(season.season_number)}
                          >
                            ...
                          </span>
                        </>
                      )
                      : season.overview
                    : t('errors.noDescription')
                }
                </span>
                <button type="button" onClick={() => expandSeason(season.season_number)}>
                  {
                    config[season.season_number]?.showEpisodes
                      ? (
                        <>
                          {t('inputs.hideEpisodes')}
                          <ExpandLess />
                        </>
                      )
                      : (
                        <>
                          {t('inputs.showEpisodes')}
                          <ExpandMore />
                        </>
                      )
                  }
                </button>
              </div>
            </div>
            {
              config[season.season_number]?.showEpisodes
                ? (
                  <div className="season-episodes">
                    {
                      episodes[season.season_number]
                      && episodes[season.season_number].map((episode, key) => (
                        <div className="episode-card" key={episode.id}>
                          <div className="episode-image">
                            <Image path={episode.still_path} alt={episode.name} size="w200" />
                          </div>
                          <div className="episode-infos">
                            <div className="episode-title">
                              <span className="title">
                                {`${episode.episode_number} - ${episode.name}`}
                              </span>
                              <span className="rating">
                                <Star />
                                {episode.vote_average.toFixed(1)}
                              </span>
                            </div>
                            <span>
                              {
                                episode.overview.length > 150 && !episode.allOverview
                                  ? (
                                    <>
                                      {episode.overview.slice(0, 150)}
                                      {' '}
                                      <span
                                        className="overview-expand"
                                        onClick={() => expandEpisode(season.season_number, key)}
                                      >
                                        ...
                                      </span>
                                    </>
                                  )
                                  : episode.overview
                              }
                            </span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
                : null
            }
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Seasons.propTypes = {
  seasons: PropTypes.array,
  tvShowId: PropTypes.string,
  loading: PropTypes.bool,
};

Seasons.defaultProps = {
  seasons: [],
  tvShowId: '',
  loading: false,
};

export default Seasons;
