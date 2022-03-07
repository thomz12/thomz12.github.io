precision highp float;

varying vec4 v_pos;
varying vec2 v_tex;

uniform vec2 VIEWPORTSIZE;
uniform sampler2D texture;
uniform sampler2D screenFade;
uniform float fadeAmount;
uniform float pixelSize;

void main()
{
	float width = v_tex.x * VIEWPORTSIZE.x;
	float height = v_tex.y * VIEWPORTSIZE.y;
	
	vec4 line = vec4(0.0, 0.0, 0.0, 0.0);
	
	float pixLocX = mod(width, pixelSize);
	float pixLocY = mod(height, pixelSize);
	
	if(pixLocY >= pixelSize - 1.0 || pixLocX >= pixelSize - 1.0 )
		line = vec4(0.05, 0.05, 0.05, 0.0);
	
	if(pixLocY <= 1.0 || pixLocX <= 1.0)
		line = vec4(-0.05, -0.05, -0.05, 0.0);

	vec4 fade = texture2D(screenFade, v_tex);
	
	if(fade.r < fadeAmount)
	{
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + line;
		return;
	}
	
	vec4 color = texture2D(texture, v_tex);
	
	gl_FragColor = color + line;
}