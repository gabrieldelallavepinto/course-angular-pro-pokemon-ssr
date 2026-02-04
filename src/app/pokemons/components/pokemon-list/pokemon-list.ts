import { Component, input, signal } from '@angular/core';
import { PokemonCard } from "../pokemon-card/pokemon-card";
import { Pokemon } from '../../models/pokemon.interface';

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList {
  pokemons = input.required<Pokemon[]>();
}
