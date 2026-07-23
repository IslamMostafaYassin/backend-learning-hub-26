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
