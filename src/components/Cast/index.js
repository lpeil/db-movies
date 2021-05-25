import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import Arrow from '../Carrousel/Arrow';
import Image from '../Image';

const Cast = ({ cast }) => {
  const sliderSettings = {
    dots: false,
    slidesToShow: cast.length < 7 ? cast.length : 7,
    slidesToScroll: cast.length < 7 ? cast.length : 7,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
  };

  return (
    <div className="cast">
      <h1>Cast</h1>
      <Slider {...sliderSettings} className="slider">
        {cast.map((actor) => (
          <div className="actor-card" key={actor.id}>
            <Image path={actor.profile_path} alt={actor.name} size="w200" />
            <div className="infos">
              <span className="name">{actor.name}</span>
              <span className="character">{actor.character}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

Cast.propTypes = {
  cast: PropTypes.array,
};

Cast.defaultProps = {
  cast: [],
};

export default Cast;
