import { FlexContainer } from '../flex-container/FlexContainer';
import styled from 'styled-components';

export const WeatherCardPositioner = styled.div`
  position: fixed;

  bottom: 2rem;
  @media only screen and (min-width: 480px) {
    right: 1rem;
  }
  @media only screen and (min-width: 768px) {
    right: 1.5rem;
  }
  @media only screen and (min-width: 992px) {
    right: 3rem;
  }
`;

export const Card = styled.div`
  padding: 1.5rem;
  background-color: #ffffff;
  width: 24rem;
  border-radius: 0.5rem;
  border-width: 1px;
  border-color: #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const DegreeSection = styled(FlexContainer)`
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  text-align: center;
  h5 {
    font-size: 48px;
    font-weight: 300;
  }
  p {
    font-size: 12;
  }
  justify-content: center;
`;
