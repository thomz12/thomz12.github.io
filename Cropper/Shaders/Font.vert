﻿precision mediump float;

uniform mat4 WORLD;
uniform mat4 VIEW;
uniform mat4 PROJ;

attribute vec4 a_pos;
attribute vec2 a_tex;
attribute vec4 a_col;

varying vec4 v_pos;
varying vec2 v_tex;
varying vec4 v_col;

void main()
{
	v_pos = a_pos;
	v_tex = a_tex;
	v_col = a_col;
	gl_Position = PROJ * VIEW * WORLD * a_pos;
}