import { Microbus } from '../types/microbusType';

export const fleet: Microbus[] = [
  {
    id: 1,
    driverName: 'Osta Hassan',
    route: 'Mohandessin – Ramses',
    farePerSeat: 8,
    seatsAvailable: 4,
    ratings: [
      { Hossam: 5 },
      { Salma: 4 }
    ]
  },
  {
    id: 2,
    driverName: 'Osta Ibrahim',
    route: 'Haram – Dokki',
    farePerSeat: 10,
    seatsAvailable: 2,
    ratings: [
      { Tarek: 3 },
      { Hossam: 4 }
    ]
  },
  {
    id: 3,
    driverName: 'Osta Sayed',
    route: 'Maadi – Giza',
    farePerSeat: 12,
    seatsAvailable: 0,
    ratings: [
      { Nour: 5 }
    ]
  },
  {
    id: 4,
    driverName: 'Osta Mahmoud',
    route: 'Nasr City – Abbassia',
    farePerSeat: 7,
    seatsAvailable: 6,
    ratings: []
  }
];
