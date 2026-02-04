export interface PokemonsResponse {
  count: number;
  next: number;
  previous: number;
  results: PokemonsResultResponse[];
}

export interface PokemonsResultResponse {
  name: string;
  url: string;
}
