import { PokeApi } from '../data/api.repository';
import { PokemonInfo } from '../types/pokemon';
import { Component } from './component';

export class PokemonList extends Component {
  pokemons: PokemonInfo[];
  pokeRepo: PokeApi;
  constructor(selector: string) {
    super(selector);
    this.pokemons = [];
    this.pokeRepo = new PokeApi();
    this.handleLoad();
  }

  render(): void {
    super.cleanHtml();
    this.template = this.createTemplate();
    super.render();
    this.element
      .querySelectorAll('span')
      .forEach((item) =>
        item.addEventListener('click', this.handleGetOne.bind(this))
      );
  }

  async handleLoad() {
    this.pokemons = await this.pokeRepo.getAll();
    this.render();
  }

  async handleGetOne(event: Event) {
    const element = event.target;
    if (!element) return;
    const url = element.dataset.id;
    this.pokeRepo.getPokemon(url);
  }

  createTemplate() {
    console.log(this.pokemons);
    const balls = this.pokemons.results
      .map(
        (item: { name: any; url: string }) => `
          <li>
            <p>${item.name}</p>
            <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
              item.url.split('/')[6]
            }.gif"
            alt="Pokemon" width="90px" height75px>
            <span class="pokemon-info" data-id="${item.url}">Info</span>
          </li>
      `
      )
      .join('');

    return `
      <section class="pokemon-section"><ul class="pokemon-list">${balls}</ul></section>
    `;
  }
}

// CreateTemplate() {
//     console.log(this.pokemons);
//     const balls = this.pokemons.results
//       .map(
//         (item) => `
//     <li>
//       <p>${item.name}</p>
//       <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
//         item.url.split('/')[6]
//       }.gif" heigh=100 width=100>
//       <span data-id="${item.url}">Combat Info</span>
//     </li>`
//       )
//       .join('');

//     return `
//     <h2>Pokedex</h2>
//     <section class="pokemon-list"><ul>${balls}</ul></section>`;
//   }
