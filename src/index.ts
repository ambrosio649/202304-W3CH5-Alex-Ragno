/* eslint-disable no-new */
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Main } from './components/main';
import { PokemonList } from './components/pokemon.list';

new Header('body', 'Pokemon');
new Main('body');
new PokemonList('main');
new Footer('body', 'ambrosio ©️');
