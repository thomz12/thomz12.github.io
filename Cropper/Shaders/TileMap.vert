precision mediump float;

// Attributes
attribute vec4 a_pos;
attribute vec2 a_tex;

// Default shader values.
uniform vec3 CAMERAPOSITION;
uniform vec2 VIEWPORTSIZE;

// Tile size
uniform float tileSize;
uniform vec2 mapSize;

// Varyings
varying vec2 v_pixelCoord;
varying vec2 v_texCoord;

void main()
{
	v_pixelCoord = (a_tex * VIEWPORTSIZE) + vec2(CAMERAPOSITION.x - VIEWPORTSIZE.x / 2.0, mapSize.y * tileSize + (-CAMERAPOSITION.y - VIEWPORTSIZE.y / 2.0));
	v_texCoord = v_pixelCoord * (1.0 / mapSize) * (1.0 / tileSize);
	
	gl_Position = vec4(a_pos.xy, 0.0, 1.0);
}