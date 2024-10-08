﻿precision mediump float;

varying vec4 v_pos;
varying vec2 v_tex;

uniform vec2 VIEWPORTSIZE;

uniform sampler2D source;

void main()
{
	const float pixelSize = 4.0;

	float width = v_tex.x * VIEWPORTSIZE.x;
	float height = v_tex.y * VIEWPORTSIZE.y;
	
	vec4 bevel = vec4(0.0, 0.0, 0.0, 0.0);
	
	float pixLocX = mod(width, pixelSize);
	float pixLocY = mod(height, pixelSize);
	
	if(pixLocY >= pixelSize - 1.0 || pixLocX >= pixelSize - 1.0 )
		bevel = vec4(0.05, 0.05, 0.05, 0.0);
	
	if(pixLocY <= 1.0 || pixLocX <= 1.0)
		bevel = vec4(-0.05, -0.05, -0.05, 0.0);

	vec4 color = texture2D(source, v_tex);

	gl_FragColor = color + bevel;
}