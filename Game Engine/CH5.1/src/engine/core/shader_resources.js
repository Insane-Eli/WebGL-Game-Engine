"use strict";
import SimpleShader from "../simple_shader.js";
import * as text from "../resources/text.js";
import * as map from "./resource_map.js";

// Simple Shader
let kSimpleVS = "src/glsl_shaders/simple_vs.glsl"; // to VertexShader
let kSimpleFS = "src/glsl_shaders/simple_fs.glsl"; // to FragmentShader
let kTextureVS = "src/glsl_shaders/texture_vs.glsl"; // to VertexShader
let kTextureFS = "src/glsl_shaders/texture_fs.glsl"; // to FragmentShader
let mConstColorShader = null;

function createShaders() {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}

function init() {
  let loadPromise = new Promise(async function (resolve) {
    await Promise.all([text.load(kSimpleFS), text.load(kSimpleVS)]);
    resolve();
  }).then(function resolve() {
    createShaders();
  });
  map.pushPromise(loadPromise);
}

function cleanUp() {
  mConstColorShader.cleanUp();
  text.unload(kSimpleVS);
  text.unload(kSimpleFS);
}
function getConstColorShader() {
  return mConstColorShader;
}

export { init, cleanUp, getConstColorShader };
