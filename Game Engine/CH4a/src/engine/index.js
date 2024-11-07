//Should there be a "use strict" in here?

// local to this file only
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";
import Camera from "./camera.js";
import Transform from "./transform.js";
import Renderable from "./renderable.js";
import * as input from "./input.js";
import * as text from "./resources/text.js";
import * as xml from "./resources/xml.js";

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

export default {
    // resource support
    text, xml,
    // input support
    input,
    // Util classes
    Camera, Transform, Renderable,
    // functions
    init, clearCanvas
}