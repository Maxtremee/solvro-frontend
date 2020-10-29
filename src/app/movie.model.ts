export interface Movie {
  status: string;
  title: string;
  sessions: number[];
  arrangement: Arrangement;
}

export interface Arrangement {
  A: { [key: string]: number }[];
  B: { [key: string]: number }[];
  C: { [key: string]: number }[];
  D: { [key: string]: number }[];
  E: { [key: string]: number }[];
  F: { [key: string]: number }[];
  G: { [key: string]: number }[];
}
