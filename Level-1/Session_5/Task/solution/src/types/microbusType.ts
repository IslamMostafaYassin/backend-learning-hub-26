export interface Rating {
  [passengerName: string]: number;
}

export interface Microbus {
  id: number;
  driverName: string;
  route: string;
  farePerSeat: number;
  seatsAvailable: number;
  ratings: Rating[];
}
