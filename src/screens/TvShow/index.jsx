import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Banner, Cast, PosterInfos, Recommendations,
} from '../../components';

import {
  apiGetTvById, apiGetTvRecommendations, apiGetTvCredits,
} from '../../services/tvShow';

const TvShow = () => {
  const { id: tvId } = useParams();
  const [tvShow, setTvShow] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [credits, setCredits] = useState({});

  const loadExtraInfos = () => {
    apiGetTvRecommendations(tvId)
      .then((data) => {
        setRecommendations(data.results);
      });

    apiGetTvCredits(tvId)
      .then((data) => {
        setCredits(data);
      });
  };

  useEffect(() => {
    setTvShow({});
    setRecommendations([]);
    setCredits({});
    window.scrollTo(0, 0);

    apiGetTvById(tvId)
      .then((data) => {
        setTvShow(data);
        loadExtraInfos();
      });
  }, [tvId]);

  return (
    <div className="tv-show-screen">
      <Banner
        backdropPath={tvShow.backdrop_path}
        title={tvShow.name}
        voteAverage={tvShow.vote_average / 2}
        voteCount={tvShow.vote_count}
      />
      <p className="sinopse">{tvShow.overview}</p>
      <PosterInfos
        type="tv"
        director={credits.crew && credits.crew.filter((crew) => crew.job === 'Director')[0]?.name}
        posterPath={tvShow.poster_path}
        title={tvShow.name}
        originalTitle={tvShow.original_name}
        genres={tvShow.genres}
        runtime={tvShow.episode_run_time && tvShow.episode_run_time[0]}
        releaseDate={
          `${new Date(tvShow.first_air_date).getFullYear()}
            ${tvShow.in_production
            ? ' -'
            : new Date(tvShow.first_air_date).getYear() === new Date(tvShow.last_air_date).getYear()
              ? ''
              : ` - ${new Date(tvShow.last_air_date).getFullYear()}`
            }
          `
        }
        seasons={tvShow.number_of_seasons}
        episodes={tvShow.number_of_episodes}
      />
      <Cast cast={credits.cast} />
      <Recommendations recommendations={recommendations} type="tv" />
    </div>
  );
};

export default TvShow;
