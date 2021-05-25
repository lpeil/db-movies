import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import Arrow from '../Carrousel/Arrow';
import Card from '../Card';

const Recommendations = ({ recommendations, type }) => {
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
    if (cardsPerLine > 10) cardsPerLine = 10;
    if (cardsPerLine < 1) cardsPerLine = 1;

    setSlidesToShow(cardsPerLine);
  }

  useEffect(() => {
    window.addEventListener('resize', setQuantityOfItems);
  });

  useEffect(() => {
    setQuantityOfItems();
  }, []);

  return (
    <div className="recommendation" ref={containerDiv}>
      <h1>{t('titles.recommendations')}</h1>
      <Slider
        {...sliderSettings}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToShow}
        className="slider"
      >
        {recommendations.map((recommendation) => (
          <div className="recommendation-card" key={recommendation.id}>
            <Card type={type} data={recommendation} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

Recommendations.propTypes = {
  type: PropTypes.string,
  recommendations: PropTypes.array,
};

Recommendations.defaultProps = {
  type: '',
  recommendations: [],
};

export default Recommendations;
