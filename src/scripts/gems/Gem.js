import *  as PIXI from 'pixi.js';

export class Gem {
  isFalling = false;

  constructor(type) {
    this.type = type;
    this.resource = PIXI.loader.resources[`gems/${type}`];
    this.sprite = new PIXI.Sprite(this.resource.texture);
  }
}
