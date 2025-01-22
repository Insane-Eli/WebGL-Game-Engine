"use strict";

import * as glSys from "../gl.js";
import * as SimpleShader from "./simple_shader.js"
import * as vertexBuffer from "../core/vertex_buffer.js"

class TextureShader extends SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        // Call super class constructor
        super(vertexShaderPath, fragmentShaderPath);
        // reference to aTextureCoordinate within the shader
        this.mTextureCoordinateRef = null;
        // get the reference of aTextureCoordinate within the shader
        let gl = glSys.get();
        this.mTextureCoordinateRef = gl.getAttribLocation(
            this.mCompiledShader,
            "aTextureCoordinate");
        this.mSamplerRef = gl.getUniformLocation(this.mCompiledShader,
            "uSampler");
    }
}