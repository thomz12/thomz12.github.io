precision mediump float;

uniform mat4 WORLD;
uniform mat4 VIEW;
uniform mat4 PROJ;

attribute vec4 a_pos;

varying vec4 v_pos;

void main()
{
	v_pos = a_pos;
	gl_Position = PROJ * VIEW * WORLD * a_pos;
}