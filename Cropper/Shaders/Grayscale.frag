precision highp float;

varying vec4 v_pos;
varying vec2 v_tex;

uniform vec2 VIEWPORTSIZE;
uniform sampler2D u_texture;

void main()
{
	vec4 color = texture2D(u_texture, v_tex);
	
	gl_FragColor = vec4(color.r, color.r, color.r, 1.0);
}