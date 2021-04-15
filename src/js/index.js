import vertCode from '../shaders/vert.glsl';
import fragCode from '../shaders/frag.glsl';
import '../css/gameToy.css';

function main()
{
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl2");

    if (gl === null)
    {
        alert("Unable to initialize WebGL2. Your browser or machine may not support it.")
        return;
    }

    var vertexShader = genShader(gl, gl.VERTEX_SHADER, vertCode);
    var fragmentShader = genShader(gl, gl.FRAGMENT_SHADER, fragCode);

    var program = genProgram(gl, vertexShader, fragmentShader);

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    var colorLocation = gl.getUniformLocation(program, "u_color");

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);

    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0.5, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    // gl.bindVertexArray(vao);

    for (var ii = 0; ii < 50; ++ii) {
        setRectangle(gl, randomInt(gl.canvas.width), randomInt(gl.canvas.height), randomInt(gl.canvas.width/2), randomInt(gl.canvas.height/2));

        gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }
}

function genShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function genProgram(gl, vertShader, fragShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]), gl.STATIC_DRAW);
}

function randomInt(range) {
    return Math.floor(Math.random() * range);
}

window.onload = main;