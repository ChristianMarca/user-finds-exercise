import React from 'react'
import { Location } from '../api.types'
import { StyledCard, StyledContainerCard, StyledTitleCard } from './component'

interface ICard {
  data: Location[] | null
}

const Card: React.FC<ICard> = ({ data }) => {
  return (
    <StyledContainerCard>
      <StyledCard>
        <StyledTitleCard>Weather</StyledTitleCard>
        {data?.map((item, index) => (
          <p key={index} className="text-gray-700 text-base">{item.weather}</p>
        ))}
      </StyledCard>
    </StyledContainerCard>
  )
}

export { Card }