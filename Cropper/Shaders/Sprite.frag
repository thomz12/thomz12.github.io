precision mediump float;

varying vec4 v_pos;
varying vec2 v_tex;

uniform sampler2D texture;

void main()
{
	vec4 color = texture2D(texture, v_tex);
	
	if(color.a == 0.0)
		discard;
	
	gl_FragColor = color;
}