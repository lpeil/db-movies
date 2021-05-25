import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import Arrow from '../Carrousel/Arrow';
import Image from '../Image';

const Cast = ({ cast }) => {
  const { t } = useTranslation();
  const [slidesToShow, setSlidesToShow] = useState(1);
  const containerDiv = useRef();

  const sliderSettings = {
    dots: false,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
  };

  function setQuantityOfItems() {
    let cardsPerLine = Math.floor(containerDiv.current?.offsetWidth / 220);
    if (cardsPerLine > cast.length) cardsPerLine = cast.length;
    if (cardsPerLine < 1) cardsPerLine = 1;

    setSlidesToShow(cardsPerLine);
  }

  useEffect(() => {
    window.addEventListener('resize', setQuantityOfItems);
  });

  useEffect(() => {
    setQuantityOfItems();
  }, [cast]);

  return (
    <div className="cast" ref={containerDiv}>
      <h1>{t('titles.cast')}</h1>
      {
        cast.length
          ? (
            <Slider
              {...sliderSettings}
              slidesToShow={slidesToShow}
              slidesToScroll={slidesToShow}
              className="slider"
            >
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
          )
          : <h2 className="no-data">{t('errors.nodata')}</h2>
      }
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
