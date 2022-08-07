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
