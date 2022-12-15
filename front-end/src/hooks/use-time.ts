import { useEffect, useState } from 'react';

export const useTime = (refreshRate = 500) => {
  const [now, setNow] = useState(getTime());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(getTime()), refreshRate);

    return () => clearInterval(intervalId);
  }, [refreshRate, setNow]);

  return now;
};

const getTime = () => {
  const dateTime = new Date();
  const hours = formatTime(dateTime.getHours());
  const minutes = formatTime(dateTime.getMinutes());
  return `${hours}:${minutes}`;
};

const formatTime = (value: number) => {
  if (value < 10) {
    return `0${value}`;
  }
  return value.toString();
};
