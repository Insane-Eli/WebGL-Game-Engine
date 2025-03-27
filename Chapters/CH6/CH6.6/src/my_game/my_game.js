"use strict";
import engine from "../engine/index.js";
// user stuff
import DyePack from "../engine/game_objects/dye_pack.js";
import Minion from "../engine/game_objects/minion.js";
import Hero from "../engine/game_objects/hero.js";
import Brain from "../engine/game_objects/brain.js";
import TextureObject from "../engine/game_objects/texture_object.js";
import SpriteRenderable from "../engine/renderables/sprite_renderable.js";
import SpriteAnimateRenderable from "../engine/renderables/sprite_animate_renderable.js";
class MyGame extends engine.Scene {
  constructor() {
    super();
    // textures:
    this.kFontImage = "assets/consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionPortal = "assets/minion_portal.png";
    // this.kMinionCollector = "assets/minion_collector.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;

    this.mHero = null;
    this.mPortal = null;
    this.mBrain = null;
    this.mLeftMinion = null;
    this.mRighttMinion = null;
    this.mTarget = null;

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

    this.mMsg = new engine.FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(2);

    this.mPortal = new TextureObject(this.kMinionPortal, 70, 30, 10, 10);
    this.mHero = new Hero(this.kMinionSprite);
    this.mBrain = new Brain(this.kMinionSprite)
    this.mLeftMinion = new Minion(this.kMinionSprite)
    this.mRightMinion = new Minion(this.kMinionSprite)

    this.mTarget = this.mHero
    this.mLeftMinion.toggleRandomness(false);
    this.mRightMinion.toggleRandomness(false);
    this.mLeftMinion.mRenderComponent.getXform().setPosition(20,20);
    this.mRightMinion.mRenderComponent.getXform().setPosition(60,20);




    // this.mCollector = new TextureObject(this.kMinionCollector,
    //   50, 30, 30, 30);

  }
  draw() {
    // Step A: clear the canvas
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    // Step B: Activate the drawing Camera
    this.mCamera.setViewAndCameraMatrix();
    this.mMsg.draw(this.mCamera);
    // Step C: Draw everything
    this.mHero.draw(this.mCamera);
    this.mPortal.draw(this.mCamera);
    this.mLeftMinion.draw(this.mCamera);
    this.mRightMinion.draw(this.mCamera);
    this.mBrain.draw(this.mCamera);
  }

  update() {
    let h = [];

    this.mLeftMinion.update(this.mCamera);
    this.mRightMinion.update(this.mCamera);

    // Arrow and P keys: Move and rotate the Portal minion
    this.mPortal.update(engine.input.keys.Up, engine.input.keys.Down,
      engine.input.keys.Left, engine.input.keys.Right, engine.input.keys.P);

    // WASD keys: Move the Hero
    this.mHero.update(engine.input.keys.W, engine.input.keys.S,
      engine.input.keys.A, engine.input.keys.D);

    // L, R, H, B keys: Select the target for colliding with the Portal minion
    // Only update target when the corresponding key is clicked
    if (engine.input.isKeyClicked(engine.input.keys.L)) {
      this.target = 'L'; // Assign left minion as target
    } else if (engine.input.isKeyClicked(engine.input.keys.R)) {
      this.target = 'R'; // Assign right minion as target
    } else if (engine.input.isKeyClicked(engine.input.keys.H)) {
      this.target = 'H'; // Assign hero as target
    } else if (engine.input.isKeyClicked(engine.input.keys.B)) {
      this.target = 'B'; // Assign brain as target
    }

    // Display a message about the current collision target
    let msg = "Collision target [L:left minion R:right minion H:hero B:brain]: " + this.target;

    // Set the correct target object based on the selected target
    switch (this.target) {
      case 'L':
        this.mTarget = this.mLeftMinion;
        break;
      case 'R':
        this.mTarget = this.mRightMinion;
        break;
      case 'H':
        this.mTarget = this.mHero;
        break;
      case 'B':
        this.mTarget = this.mBrain;
        break;
    }

    // Check for collision between the portal and the selected target
    if (this.mPortal.pixelTouches(this.mTarget, h)) {
      msg = "Collided!: (" + h[0].toPrecision(4) + " " +
        h[1].toPrecision(4) + ")";
    }

    // Update the message to show the current target and collision status
    this.mMsg.setText(msg);

    //brain follows player
    this.mBrain.rotateObjPointTo(
      this.mHero.getXform().getPosition(), 1);
      engine.GameObject.prototype.update.call(this.mBrain);

  }

  load() {
    // Step A: loads the textures
    engine.texture.load(this.kFontImage);
    engine.texture.load(this.kMinionSprite);
    engine.texture.load(this.kMinionPortal);
  }

  unload() {
    engine.texture.unload(this.kFontImage);
    engine.texture.unload(this.kMinionSprite);
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
