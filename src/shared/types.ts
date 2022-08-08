export type Car = {
  name: string;
  color: string;
  id: number;
  isEngineStarted?: boolean;
};

export type Cars = {
  items: [];
  count: string | null;
};


export type AnyCar = {
  name: string;
  color: string;
};

export type DrivingStatus = {
  success: boolean;
  id: number;
  time: number;
};

export type Race = {
  name: string;
  color: string;
  id: number;
  time: number;
};

export type Winner = {
  id: number;
  time: number;
  wins: number;
};

export type Winners = {
  items: Array<{
    car: Car;
    id: number;
    time: number;
    wins: number;
  }>;
  count: string | null;
};

export type Engine = { velocity: number; distance: number };
