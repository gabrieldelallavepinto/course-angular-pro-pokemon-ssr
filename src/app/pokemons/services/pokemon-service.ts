import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.interface';
import { PokemonsResponse } from '../models/pokemon.response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private imageBaseUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
  constructor() {}

  loadPage(page: number): Observable<Pokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);

    const response = this.http.get<PokemonsResponse>(
      `${this.baseUrl}/?offset=${page * 20}&limit=20`,
    );
    return response.pipe(
      map((res) => {
        const pokemons: Pokemon[] = res.results.map((p, index) => {
          const id = p.url.split('/').at(-2) ?? '';
          return {
            id: id,
            name: p.name,
            imageUrl: `${this.imageBaseUrl}/${id}.png`,
          };
        });
        return pokemons;
      }),
    );
  }
}
