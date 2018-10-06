import * as PIXI from 'pixi.js';
import gems from '../../assets/json/gems.json';

export const loadResources = (onLoad) => {
  gems.map(gem => PIXI.loader.add(`gems/${gem.type}`, `assets/${gem.texture}`));
  PIXI.loader.load(onLoad);
}
