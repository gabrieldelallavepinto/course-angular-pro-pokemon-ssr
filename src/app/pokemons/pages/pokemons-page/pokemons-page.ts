import { Component, computed, inject, OnInit, signal, effect } from '@angular/core';
import { PokemonList } from '../../components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from '../../components/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonService } from '../../services/pokemon-service';
import { Pokemon } from '../../models/pokemon.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
})
export class PokemonsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonsService = inject(PokemonService);
  private title = inject(Title);

  queryParams = toSignal(this.route.queryParamMap);
  currentPage = computed<number>(() => +(this.queryParams()?.get('page') ?? '1'));

  public isLoading = signal(true);
  public pokemons = signal<Pokemon[]>([]);

  constructor() {
    effect(() => {
      if(this.currentPage()) {
        this.loadPokemons(this.currentPage());
      }
    });
  }

  ngOnInit(): void {
    // this.pokemonsService.loadPage(1);
    // this.loadPokemons(1);
  }

  loadPokemons(page: number = 0): void {
    this.isLoading.set(true);
    this.title.setTitle(`Pokemons - Page ${page}`);
    this.pokemonsService.loadPage(page).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
      this.isLoading.set(false);
    });
  }

  isFirstPage(): boolean {
    return this.currentPage() <= 1;
  }

  isLastPage(): boolean {
    return this.currentPage() <= 1;
  }

  previousPage(): void {
    this.router.navigate([], { queryParams: { page: this.currentPage() - 1 } });
  }

  nextPage(): void {
    this.router.navigate([], { queryParams: { page: this.currentPage() + 1 } });
  }
}
