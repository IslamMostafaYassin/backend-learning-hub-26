import { Request, Response } from 'express';
import { fleet } from '../data/fleetData';

export const getAllBuses = (req: Request, res: Response) => {
  res.status(200).json(fleet);
};

export const getBusById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bus = fleet.find((b) => b.id === id);

  if (!bus) {
    return res.status(404).json({ message: "Am Ashraf doesn't run that one" });
  }

  res.status(200).json(bus);
};

export const createBus = (req: Request, res: Response) => {
  const { driverName, route, farePerSeat, seatsAvailable } = req.body;

  const newId = (fleet.at(-1)?.id || 0) + 1;

  const newBus = {
    id: newId,
    driverName,
    route,
    farePerSeat: Number(farePerSeat),
    seatsAvailable: Number(seatsAvailable),
    ratings: []
  };

  fleet.push(newBus);
  res.status(201).json(newBus);
};

export const updateBus = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bus = fleet.find((b) => b.id === id);

  if (!bus) {
    return res.status(404).json({ message: "Am Ashraf doesn't run that one" });
  }

  const { driverName, route, farePerSeat, seatsAvailable } = req.body;

  if (driverName !== undefined) bus.driverName = driverName;
  if (route !== undefined) bus.route = route;
  if (farePerSeat !== undefined) bus.farePerSeat = Number(farePerSeat);
  if (seatsAvailable !== undefined) bus.seatsAvailable = Number(seatsAvailable);

  res.status(200).json(bus);
};

export const deleteBus = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const busIndex = fleet.findIndex((b) => b.id === id);

  if (busIndex === -1) {
    return res.status(404).json({ message: "Am Ashraf doesn't run that one" });
  }

  fleet.splice(busIndex, 1);
  res.status(200).json({ message: "Microbus taken off the road successfully" });
};

export const filterByFare = (req: Request, res: Response) => {
  const { maxFare } = req.query;

  if (!maxFare || isNaN(Number(maxFare))) {
    return res.status(400).json({ message: 'maxFare query parameter is required and must be a number' });
  }

  const filtered = fleet.filter((b) => b.farePerSeat <= Number(maxFare));
  res.status(200).json(filtered);
};

export const getRatingByRater = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const rater = req.query.rater as string;

  if (isNaN(id) || !rater) {
    return res.status(400).json({ message: 'Both bus id and rater name are required' });
  }

  const bus = fleet.find((b) => b.id === id);
  if (!bus) {
    return res.status(404).json({ message: "Am Ashraf doesn't run that one" });
  }

  const ratingObj = bus.ratings.find((r) => rater in r);

  if (!ratingObj) {
    return res.status(200).json({ message: `${rater} hasn't rated this microbus yet` });
  }

  res.status(200).json({
    id: bus.id,
    rater: rater,
    rate: ratingObj[rater]
  });
};
