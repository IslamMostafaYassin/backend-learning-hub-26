import { Request, Response, NextFunction } from 'express';

export const validateMicrobus = (req: Request, res: Response, next: NextFunction) => {
  const { driverName, route, farePerSeat, seatsAvailable } = req.body;

  if (req.method === 'POST') {
    if (!driverName || !route || farePerSeat === undefined || seatsAvailable === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  }

  if (farePerSeat !== undefined && (typeof farePerSeat !== 'number' || farePerSeat < 0)) {
    return res.status(400).json({ message: 'farePerSeat must be a non-negative number' });
  }

  if (seatsAvailable !== undefined && (typeof seatsAvailable !== 'number' || seatsAvailable < 0)) {
    return res.status(400).json({ message: 'seatsAvailable must be a non-negative number' });
  }

  next();
};
