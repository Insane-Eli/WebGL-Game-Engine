"use strict";
import * as glSys from "../engine/core/gl.js";
import engine from "../engine/index.js";
import * as loop from "../engine/core/loop.js";
import SceneFileParser from "./util/scene_file_parser.js";
import BlueLevel from "./blue_level.js";
import Transform from "../engine/transform.js"

class MyGame extends engine.Scene {
  constructor() {
    super();
    // textures:
    this.kPortal = "assets/minion_portal.png"; // with transparency
    this.kCollector = "assets/minion_collector.png";
    // The camera to view the scene
    this.mCamera = null;
    // the hero and the support objects
    this.mHero = null;
    this.mSupport = null;
  }
  init() {
    // Step A: set up the cameras
    this.mCamera = new engine.Camera(
      vec2.fromValues(20, 60), // position of the camera
      20, // width of camera
      [20, 40, 600, 400] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    // Step B: Create the game objects
    this.mPortal = new engine.TextureRenderable(this.kPortal);
    this.mPortal.setColor([1, 0, 0, 0.2]); // tints red
    this.mPortal.getXform().setPosition(25, 60);
    this.mPortal.getXform().setSize(3, 3);
    // Step C: Create the hero object in blue
    this.mHero = new engine.Renderable();
    this.mHero.setColor([0, 1, 0, 1]);
    this.mHero.getXform().setPosition(20, 60);
    this.mHero.getXform().setSize(1, 1);
    // now start the Background music ...

  }
  draw() {
    // Step A: clear the canvas
    engine.clearCanvas([0.8, 0.8, 0.8, 1.0]); // clear to light gray
    // Step B: Activate the drawing Camera
    this.mCamera.setViewAndCameraMatrix();
    // Step C: Draw everything
    this.mPortal.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
  }
  update() {
    
    // let's only allow the movement of hero,
    // and if hero moves too far off, this level ends, we will
    // load the next level
    let deltaX = 0.05;
    let xform = this.mHero.getXform();
    // Support hero movements
    if (engine.input.isKeyPressed(engine.input.keys.Right)) {
      xform.incXPosBy(deltaX);
      if (xform.getXPos() > 30) { // this is the right-bound of the window
        xform.setPosition(12, 60);
      }
    }
    if (engine.input.isKeyPressed(engine.input.keys.Left)) {
      xform.incXPosBy(-deltaX);
      if (xform.getXPos() < 11) { // this is the left-bound of the window
        this.next();
      }
    }


    //TIME!!!
    const now = new Date();

    // continuously change texture tinting
    let c = this.mPortal.getColor();
    if(now.getSeconds % 15 == 0){
      c[3] = 1;
    } else {
    c[3] = 0;
    }


    const radius = 5; //max is around 6
    const twopi = 2*Math.PI;
    const speed = -1;
    const seconds = now.getSeconds() + (now.getMilliseconds()/1000);
    const newXPos = 20 + (Math.cos(seconds/60*twopi*speed)*radius);
    const newYPos = 60 + (Math.sin(seconds/60*twopi*speed)*radius);
    this.mPortal.getXform().setPosition(newXPos, newYPos);

    console.log("seconds = " +seconds + ", seconds / 60 = " + seconds/60 )

  }
  load() {
    // loads the textures
    engine.texture.load(this.kPortal);
  }

  unload() {
    // Game loop not running, unload all assets
    engine.texture.unload(this.kPortal);
  }
  next() {
    super.next();
    // starts the next level
    let nextLevel = new BlueLevel(); // next level to be loaded
    nextLevel.start();
  }
}

window.onload = function () {
  engine.init("GLCanvas");
  let myGame = new MyGame();
  myGame.start();
};

export default MyGame;
