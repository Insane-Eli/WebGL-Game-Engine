// local to this file only
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";
import * as input from "./input.js";
import * as text from "./resources/text.js";
import * as xml from "./resources/xml.js";
import Scene from "./scene.js";
import * as loop from "./core/loop.js";
// general utilities
import Renderable from "./renderable.js";
import Transform from "./transform.js";
import Camera from "./camera.js";

// general engine utilities
function init(htmlCanvasID) {
  glSys.init(htmlCanvasID);
  vertexBuffer.init();
  shaderResources.init();
  input.init();
}

function clearCanvas(color) {
  let gl = glSys.get();
  gl.clearColor(color[0], color[1], color[2], color[3]);
  gl.clear(gl.COLOR_BUFFER_BIT); // clear to the color set
}

function cleanUp() {
  loop.cleanUp();
  input.cleanUp();
  shaderResources.cleanUp();
  vertexBuffer.cleanUp();
  glSys.cleanUp();
}

export default {
  // input support
  input,
  text,
  xml,
  // Util classes
  Camera,
  Scene,
  Transform,
  Renderable,
  // functions
  init,
  cleanUp,
  clearCanvas,
};
