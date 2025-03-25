// local to this file only
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";
import * as input from "./input.js";
import * as text from "./resources/text.js";
import * as xml from "./resources/xml.js";
import Scene from "./scene.js";
import * as loop from "./core/loop.js";
import * as texture from "./resources/texture.js";
import * as font from "./resources/font.js";
import * as defaultResources from "./resources/default_resources.js";
import BoundingBox from "./bounding_box.js";
import { eBoundCollideStatus } from "./bounding_box.js";
// general utilities
import Renderable from "./renderables/renderable.js";
import TextureRenderable from "./renderables/texture_renderable.js";
import Transform from "./transform.js";
import Camera from "./camera.js";
import * as audio from "./resources/audio.js";
import SpriteRenderable from "./renderables/sprite_renderable.js";
import SpriteAnimateRenderable from "./renderables/sprite_animate_renderable.js";
import FontRenderable from "./renderables/font_renderable.js";
import { eTexCoordArrayIndex } from "./renderables/sprite_renderable.js";
import { eAnimationType } from "./renderables/sprite_animate_renderable.js";

// game objects
import GameObject from "./game_objects/game_object.js";
import GameObjectSet from "./game_objects/game_object_set.js";

// general engine utilities
function init(htmlCanvasID) {
  glSys.init(htmlCanvasID);
  vertexBuffer.init();
  input.init();
  audio.init();
  shaderResources.init();
  defaultResources.init();
}

function cleanUp() {
  loop.cleanUp();
  audio.cleanUp();
  input.cleanUp();
  shaderResources.cleanUp();
  defaultResources.cleanUp();
  vertexBuffer.cleanUp();
  glSys.cleanUp();
}

function clearCanvas(color) {
  let gl = glSys.get();
  gl.clearColor(color[0], color[1], color[2], color[3]);
  gl.clear(gl.COLOR_BUFFER_BIT); // clear to the color set
}


export default {
  // input support
  input,
  audio,
  text,
  xml,
  texture,
  font, 
  defaultResources,
  // Util classes
  Camera,
  Scene,
  Transform,
  Renderable,
  TextureRenderable,
  SpriteRenderable,
  SpriteAnimateRenderable,
  FontRenderable,
  BoundingBox,
  // Game Objects
  GameObject,
  GameObjectSet,
  // constants
  eTexCoordArrayIndex,
  eAnimationType,
  eBoundCollideStatus,
  
  // functions
  init,
  cleanUp,
  clearCanvas,
};
