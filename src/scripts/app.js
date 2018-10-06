import { Game } from './Game';

const width = window.innerWidth;
const height = window.innerHeight;

console.log(width, height);

const app = new PIXI.Application(width, height);
document.body.appendChild(app.view);

const game = new Game(app.stage);

app.ticker.add(game.run);
