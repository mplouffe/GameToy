

function main()
{
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl2");

    if (gl === null)
    {
        alert("Unable to initialize WebGL2. Your browser or machine may not support it.")
        return;
    }

    var vertCode = document.getElementById("vertex_shader");
    var fragCode = document.getElementById("fragment_shader").text;

    console.log(vertCode);

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertCode);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragCode);

    gl.clearColor(0.5, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

window.onload = main;