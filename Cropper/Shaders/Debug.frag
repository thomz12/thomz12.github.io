﻿precision mediump float;

uniform vec4 u_color;

varying vec4 v_pos;

void main()
{
	gl_FragColor = u_color;
}