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

  if (!driverName || !route || farePerSeat === undefined || seatsAvailable === undefined) {
    return res.status(400).json({ message: 'All fields (driverName, route, farePerSeat, seatsAvailable) are required' });
  }

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
