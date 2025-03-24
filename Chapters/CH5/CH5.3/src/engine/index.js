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
// general utilities
import Renderable from "./renderables/renderable.js";
import TextureRenderable from "./renderables/texture_renderable.js";
import Transform from "./transform.js";
import Camera from "./camera.js";
import * as audio from "./resources/audio.js";
import SpriteRenderable from "./renderables/sprite_renderable.js";
import SpriteAnimateRenderable from
"./renderables/sprite_animate_renderable.js";
import { eTexCoordArrayIndex } from "./renderables/sprite_renderable.js";
import { eAnimationType } from "./renderables/sprite_animate_renderable.js";

// general engine utilities
function init(htmlCanvasID) {
  glSys.init(htmlCanvasID);
  vertexBuffer.init();
  shaderResources.init();
  input.init();
  audio.init();
}

function cleanUp() {
  loop.cleanUp();
  audio.cleanUp();
  input.cleanUp();
  shaderResources.cleanUp();
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
  // Util classes
  Camera,
  Scene,
  Transform,
  Renderable,
  TextureRenderable,
  SpriteRenderable,
  SpriteAnimateRenderable,
  // constants
  eTexCoordArrayIndex,
  eAnimationType,
  // functions
  init,
  cleanUp,
  clearCanvas,
};
