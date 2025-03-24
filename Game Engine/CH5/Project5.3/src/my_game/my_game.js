"use strict";
import engine from "../engine/index.js";
// import BlueLevel from "./blue_level.js";

class MyGame extends engine.Scene {
  constructor() {
    super();
    // textures:
    this.kFontImage = "assets/consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPacMan = "assets/PacMan.png"
    // The camera to view the scene
    this.mCamera = null;
    // the hero and the support objects
    // this.mHero = null;
    // this.mPortal = null;
    // this.mCollector = null;
    // this.mFontImage = null;
    // this.mLeftMinion = null;
    this.mPacMan = null;
    let now = null;
  }
  init() {
    // Step A: set up the cameras
    this.mCamera = new engine.Camera(
      vec2.fromValues(20, 60), // position of the camera
      20, // width of camera
      [20, 40, 600, 300] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray
    // Step B: Create the support objects
    // this.mPortal = new engine.SpriteRenderable(this.kMinionSprite);
    // this.mPortal.setColor([1, 0, 0, 0.2]); // tints red
    // this.mPortal.getXform().setPosition(25, 60);
    // this.mPortal.getXform().setSize(3, 3);
    // this.mPortal.setElementPixelPositions(130, 310, 0, 180);
    // this.mCollector = new engine.SpriteRenderable(this.kMinionSprite);
    // this.mCollector.setColor([0, 0, 0, 0]); // No tinting
    // this.mCollector.getXform().setPosition(15, 60);
    // this.mCollector.getXform().setSize(3, 3);
    // this.mCollector.setElementUVCoordinate(0.308, 0.483, 0, 0.352);
    // Step C: Create the font and minion images using sprite
    // this.mFontImage = new engine.SpriteRenderable(this.kFontImage);
    // this.mFontImage.setColor([1, 1, 1, 0]);
    // this.mFontImage.getXform().setPosition(13, 62);
    // this.mFontImage.getXform().setSize(4, 4);

    this.mPacMan = new engine.SpriteAnimateRenderable(this.kPacMan);
    this.mPacMan.setColor([1, 1, 1, 0]);
    this.mPacMan.getXform().setPosition(20, 60);
    this.mPacMan.getXform().setSize(3, 3);
    this.mPacMan.setSpriteSequence(
      32, 0, // first element pixel positions: top: 512 left: 0
      32, 32, // widthxheight in pixels
      4, // number of elements in this sequence
      0); // horizontal padding in between
    this.mPacMan.setAnimationType(engine.eAnimationType.eRight);
    this.mPacMan.setAnimationSpeed(5);
    this.mPacMan.toggleAnimation(false);
    this.mPacMan.setAnimationType(1);

    // // the left minion
    // this.mLeftMinion = new engine.SpriteAnimateRenderable(
    //   this.kMinionSprite);
    // this.mLeftMinion.setColor([1, 1, 1, 0]);
    // this.mLeftMinion.getXform().setPosition(15, 56.5);
    // this.mLeftMinion.getXform().setSize(4, 3.2);
    // this.mLeftMinion.setSpriteSequence(
    //   348, 0, // first element pixel positions: top: 164 left: 0
    //   204, 164, // widthxheight in pixels
    //   5, // number of elements in this sequence
    //   0); // horizontal padding in between
    // this.mLeftMinion.setAnimationType(engine.eAnimationType.eRight);
    // this.mLeftMinion.setAnimationSpeed(50);
    // Step D: Create hero object with texture from lower-left corner
    // this.mHero = new engine.SpriteRenderable(this.kMinionSprite);
    // this.mHero.setColor([1, 1, 1, 0]);
    // this.mHero.getXform().setPosition(20, 60);
    // this.mHero.getXform().setSize(2, 3);
    // this.mHero.setElementPixelPositions(0, 120, 0, 180);

  }
  draw() {
    // Step A: clear the canvas
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    // Step B: Activate the drawing Camera
    this.mCamera.setViewAndCameraMatrix();
    // Step C: Draw everything
    // this.mPortal.draw(this.mCamera);
    // this.mCollector.draw(this.mCamera);
    // this.mHero.draw(this.mCamera);
    // this.mFontImage.draw(this.mCamera);
    // this.mLeftMinion.draw(this.mCamera);
    this.mPacMan.draw(this.mCamera);
  }

  turnPacMan(direction) {

    
    this.mPacMan.toggleAnimation(true);
    let finalDegrees = (this.mPacMan.getXform().getRotationInDegree() + direction * 30).toFixed(0)%360;
    let currentDegrees = (this.mPacMan.getXform().getRotationInDegree()).toFixed(0)%360;
    
    console.log("current deg. :" + currentDegrees + "\n"+ 
                "final deg. : " + finalDegrees + "\n");

    let startTime = new Date().getTime();
    let elapsedTime = 0;
    
    let intervalId = setInterval(() => {
      elapsedTime = (new Date().getTime() - startTime) / 1000;
      console.log(elapsedTime);

      this.mPacMan.getXform().setRotationInDegree(currentDegrees + (direction*30) * (elapsedTime/1.5));
    
      if (elapsedTime >= 1.5) {
        clearInterval(intervalId);
        this.mPacMan.getXform().setRotationInDegree(finalDegrees); //just in case stuff gets lost in the sauce
        this.mPacMan.setAnimationType(1);
        this.mPacMan.toggleAnimation(false)
      }
    }, 10)
  }
  



  update() {


    if (engine.input.isKeyClicked(engine.input.keys.One)) {
      this.turnPacMan(1);
    }
    else if (engine.input.isKeyClicked(engine.input.keys.Two)) {
      this.turnPacMan(2);
    }
    else if (engine.input.isKeyClicked(engine.input.keys.Three)) {
      this.turnPacMan(3);
    }
    else if (engine.input.isKeyClicked(engine.input.keys.Four)) {
      this.turnPacMan(4);
    }
    else if (engine.input.isKeyClicked(engine.input.keys.Five)) {
      this.turnPacMan(5);
    }

    // let's only allow the movement of hero,
    let deltaX = 0.05;
    // let xform = this.mHero.getXform();
    // Support hero movements
    if (engine.input.isKeyPressed(engine.input.keys.Right)) {
      xform.incXPosBy(deltaX);
      if (xform.getXPos() > 30) { // right-bound of the window
        xform.setPosition(12, 60);
      }
    }
    if (engine.input.isKeyPressed(engine.input.keys.Left)) {
      xform.incXPosBy(-deltaX);
      if (xform.getXPos() < 11) { // left-bound of the window
        xform.setXPos(20);
      }
    }
    // continuously change texture tinting
    // let c = this.mPortal.getColor();
    // let ca = c[3] + deltaX;
    // if (ca > 1) {
    //   ca = 0;
    // }
    // c[3] = ca;
    // New update code for changing the sub-texture regions being shown"
    let deltaT = 0.001;
    // The font image:
    // zoom into the texture by updating texture coordinate
    // For font: zoom to the upper left corner by changing bottom right
    // let texCoord = this.mFontImage.getElementUVCoordinateArray();
    // The 8 elements:
    // mTexRight, mTexTop, // x,y of top-right
    // mTexLeft, mTexTop,
    // mTexRight, mTexBottom,
    // mTexLeft, mTexBottom

    // let b = texCoord[engine.eTexCoordArrayIndex.eBottom] + deltaT;

    // let r = texCoord[engine.eTexCoordArrayIndex.eRight] - deltaT;

    // if (b > 1.0) {
    //   b = 0;
    // }
    // if (r < 0) {
    //   r = 1.0;
    // }
    // this.mFontImage.setElementUVCoordinate(
    //   texCoord[engine.eTexCoordArrayIndex.eLeft],
    //   r,
    //   b,
    //   texCoord[engine.eTexCoordArrayIndex.eTop]
    // );
    //
    // The minion image:
    // For minion: zoom to the bottom right corner by changing top left
    // remember to update the minion's animation
    // this.mLeftMinion.updateAnimation();
    this.mPacMan.updateAnimation();

    // // Animate left on the sprite sheet
    // if (engine.input.isKeyClicked(engine.input.keys.One)) {
    //   this.mLeftMinion.setAnimationType(engine.eAnimationType.eLeft);
    // }
    // // swing animation
    // if (engine.input.isKeyClicked(engine.input.keys.Two)) {
    //   this.mLeftMinion.setAnimationType(engine.eAnimationType.eSwing);
    // }
    // // Animate right on the sprite sheet
    // if (engine.input.isKeyClicked(engine.input.keys.Three)) {
    //   this.mLeftMinion.setAnimationType(engine.eAnimationType.eRight);
    // }
    // // decrease duration of each sprite element to speed up animation
    // if (engine.input.isKeyClicked(engine.input.keys.Four)) {
    //   this.mLeftMinion.incAnimationSpeed(-2);
    // }
    // // increase duration of each sprite element to slow down animation
    // if (engine.input.isKeyClicked(engine.input.keys.Five)) {
    //   this.mLeftMinion.incAnimationSpeed(2);
    // }
  }
  load() {
    // loads the textures
    // engine.texture.load(this.kFontImage);
    // engine.texture.load(this.kMinionSprite);
    engine.texture.load(this.kPacMan);
  }

  unload() {
    // engine.texture.unload(this.kFontImage);
    // engine.texture.unload(this.kMinionSprite);
    engine.texture.unload(this.kPacMan);
  }

  PacmAnimate() {

  }

}

window.onload = function () {
  engine.init("GLCanvas");
  let myGame = new MyGame();
  myGame.start();
};

export default MyGame;
