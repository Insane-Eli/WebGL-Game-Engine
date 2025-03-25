"use strict";
import engine from "../engine/index.js";
// user stuff
import DyePack from "../engine/game_objects/dye_pack.js";
import Minion from "../engine/game_objects/minion.js";
import Hero from "../engine/game_objects/hero.js";
import Brain from "../engine/game_objects/brain.js";
import TextureObject from "../engine/game_objects/texture_object.js";
class MyGame extends engine.Scene {
  constructor() {
    super();
    // textures:
    this.kFontImage = "assets/consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionPortal = "assets/minion_portal.png";
    this.kMinionCollector = "assets/minion_collector.png";

    // The camera to view the scene
    this.mCamera = null;
    // the hero and the support objects
    //this.mHero = null;
    // this.mDyePack = null;
    // this.mMinionset = null;
    this.mMsg = null;
    //this.mBrain = null;

    this.mCollector = null;
    this.mPortal = null;
  }

  init() {
    // Step A: set up the cameras
    this.mCamera = new engine.Camera(
    vec2.fromValues(50, 37.5), // position of the camera
    100, // width of camera
    [0, 0, 640, 480] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray
    this.mDyePack = new DyePack(this.kMinionSprite);
    this.mDyePack.setVisibility(false);
    this.mCollector = new TextureObject(this.kMinionCollector,
    50, 30, 30, 30);
    this.mPortal = new TextureObject(this.kMinionPortal, 70, 30, 10, 10);
    this.mMsg = new engine.FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);
    }
  draw() {
    // Step A: clear the canvas
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    // Step B: Activate the drawing Camera
    this.mCamera.setViewAndCameraMatrix();
    // Step C: Draw everything
    //this.mHero.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mPortal.draw(this.mCamera);
    this.mCollector.draw(this.mCamera);
    // this.mDyePack.draw(this.mCamera);
    // this.mMinionset.draw(this.mCamera);
    //this.mBrain.draw(this.mCamera);
  }
  update() {
    let msg = "No Collision";
    this.mCollector.update(engine.input.keys.W, engine.input.keys.S,
    engine.input.keys.A, engine.input.keys.D);
    this.mPortal.update(engine.input.keys.Up, engine.input.keys.Down,
    engine.input.keys.Left, engine.input.keys.Right);
    let h = [];
    // Portal's resolution is 1/16 x 1/16 that of Collector!
    // VERY EXPENSIVE!!
    // if (this.mCollector.pixelTouches(this.mPortal, h)) {
    if (this.mPortal.pixelTouches(this.mCollector, h)) {
    msg = "Collided!: (" + h[0].toPrecision(4) + " " +
    h[1].toPrecision(4) + ")";
    this.mDyePack.setVisibility(true);
    this.mDyePack.getXform().setXPos(h[0]);
    this.mDyePack.getXform().setYPos(h[1]);
    } else {
    this.mDyePack.setVisibility(false);
    }
    this.mMsg.setText(msg);
    }
  load() {
    // Step A: loads the textures
    engine.texture.load(this.kFontImage);
    engine.texture.load(this.kMinionSprite);
    engine.texture.load(this.kMinionCollector);
    engine.texture.load(this.kMinionPortal);
  }

  unload() {
    engine.texture.unload(this.kFontImage);
    engine.texture.unload(this.kMinionSprite);
    engine.texture.unload(this.kMinionCollector);
    engine.texture.unload(this.kMinionPortal);
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
