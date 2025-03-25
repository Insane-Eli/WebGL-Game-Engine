"use strict";
import engine from "../engine/index.js";
// user stuff
import DyePack from "../engine/game_objects/dye_pack.js";
import Minion from "../engine/game_objects/minion.js";
import Hero from "../engine/game_objects/hero.js";
import Brain from "../engine/game_objects/brain.js";

class MyGame extends engine.Scene {
  constructor() {
    super();
    // textures:
    this.kFontImage = "assets/consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";

    // The camera to view the scene
    this.mCamera = null;
    // the hero and the support objects
    this.mHero = null;
    // this.mDyePack = null;
    // this.mMinionset = null;
    this.mMsg = null;
    this.mBrain = null;
  }

  init() {
    // Step A: set up the cameras and set the background to gray
    this.mCamera = new engine.Camera(
    vec2.fromValues(50, 37.5), // position of the camera
    100, // width of camera
    [0, 0, 640, 480] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // Step B: The dye pack: simply another GameObject

    // this.mDyePack = new DyePack(this.kMinionSprite);
    // // Step C: A set of Minions
    // this.mMinionset = new engine.GameObjectSet();
    // let i = 0, randomY, aMinion;
    // // create 5 minions at random Y values
    // for (i = 0; i < 5; i++) {
    // randomY = Math.random() * 65;
    // aMinion = new Minion(this.kMinionSprite, randomY);
    // this.mMinionset.addToSet(aMinion);
    // }

    // Step D: Create the hero object
    this.mHero = new Hero(this.kMinionSprite);
    // Step E: Create and initialize message output
    this.mMsg = new engine.FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);
    // Step F: add the brain shart
    this.mBrain = new Brain(this.kMinionSprite);
    }
  draw() {
      // Step A: clear the canvas
      engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
      // Step B: Activate the drawing Camera
      this.mCamera.setViewAndCameraMatrix();
      // Step C: Draw everything
      this.mHero.draw(this.mCamera);
      this.mMsg.draw(this.mCamera);
      // this.mDyePack.draw(this.mCamera);
      // this.mMinionset.draw(this.mCamera);
      this.mBrain.draw(this.mCamera);      
  }
  update() {
    let msg = "Brain [H:keys J:imm K:gradual]: ";
    let rate = 1;
    this.mHero.update();
    switch (this.mMode) {
    case 'H':
    this.mBrain.update(); // player steers with arrow keys
    break;
    case 'K':
    rate = 0.02; // gradual rate
    // In gradual mode, the following should also be executed
    case 'J':
    this.mBrain.rotateObjPointTo(
    this.mHero.getXform().getPosition(), rate);
    // the default GameObject: only move forward
    engine.GameObject.prototype.update.call(this.mBrain);
    break;
    }
    if (engine.input.isKeyClicked(engine.input.keys.H)) {
    this.mMode = 'H';
    }
    if (engine.input.isKeyClicked(engine.input.keys.J)) {
    this.mMode = 'J';
    }
    if (engine.input.isKeyClicked(engine.input.keys.K)) {
    this.mMode = 'K';
    }
    this.mMsg.setText(msg + this.mMode);
  }
  load() {
    // Step A: loads the textures
    engine.texture.load(this.kFontImage);
    engine.texture.load(this.kMinionSprite); 
  }

  unload() {
    engine.texture.unload(this.kFontImage);
    engine.texture.unload(this.kMinionSprite);
  }


  _initText(font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
  }

}



window.onload = function () {
  engine.init("GLCanvas");
  let myGame = new MyGame();
  myGame.start();
};

export default MyGame;
