import styled from "styled-components";

export const WeatherCardPositioner = styled.div`
  position: fixed;

  bottom: 2rem;
  right: 3rem;
`;

export const Card = styled.div`
  padding: 1.5rem;
  background-color: #ffffff;
  max-width: 24rem;
  border-radius: 0.5rem;
  border-width: 1px;
  border-color: #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const CardTitle = styled.h5`
  margin-bottom: 0.5rem;
  color: #111827;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

export const CardParagraph = styled.p`
  margin-bottom: 0.75rem;
  color: #374151;
  font-weight: 400;
`;
