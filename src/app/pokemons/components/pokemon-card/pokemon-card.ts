import { Component, effect, input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.interface';

@Component({
  selector: 'pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  public pokemon = input.required<Pokemon>();

  logEffect = effect(() => {
    console.log('Pokemon:', this.pokemon());
  });
}
