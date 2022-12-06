import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Slider from 'react-slick';
import { WeatherProps } from './Weather.types';

const Wrapper = styled.div`
  width: 100%;
`;

const Slide = styled.div`
  width: 260px !important;
  padding: 10px;
  box-sizing: border-box;
`;

const Box = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const Weather = ({ data }: WeatherProps) => {
  const settings = {
    className: 'slider variable-width',
    arrows: false,
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        {data.map((item, i) => (
          <Slide key={i}>
            <Box>
              <p>Weather: {item.weather}</p>
              <p>Temp: {item.temp2m}</p>
              <p>Wind: {(item.wind10m && item.wind10m.speed) || ''}</p>
            </Box>
          </Slide>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default Weather;
