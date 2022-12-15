import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import { WeatherService } from "@services/weatherService";

// Constants
const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

// http://www.7timer.info/doc.php?lang=en
router.get("/location", async (request: Request, res: Response) => {
  const { lat, long, offset }: { lat: string; long: string; offset: string } =
    request.query as any;

  const weather = new WeatherService();

  const weatherData = await weather.getWeather(lat, long, offset);

  return res.status(OK).json({ weatherData });
});

// Export default
export default router;
