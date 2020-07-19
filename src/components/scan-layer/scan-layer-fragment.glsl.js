// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

export default `\
#define SHADER_NAME scan-layer-fragment-shader

precision highp float;

uniform bool filled;
uniform float stroked;
uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform float time;
uniform float speed;

varying vec4 vFillColor;
varying vec4 vLineColor;
varying vec2 unitPosition;
varying float innerUnitRadius;
varying float outerRadiusPixels;
varying vec2 textureCoord;
varying vec4 vBlendColor;

vec4 xposure(vec4 _color,float gray,float ex){
  float b = (8.0*ex - 1.0);
  float a = 1.0 -b;
  float f = gray*(a*gray + b);
  return f*_color;
}

void main(void) {
  geometry.uv = unitPosition;

  float distToCenter = length(unitPosition) * outerRadiusPixels;
  float inCircle = smoothedge(distToCenter, outerRadiusPixels);

  if (inCircle == 0.0) {
    discard;
  }

  if (stroked > 0.5) {
    float isLine = smoothedge(innerUnitRadius * outerRadiusPixels, distToCenter);
    if (filled) {
      gl_FragColor = mix(vFillColor, vLineColor, isLine);
    } else {
      if (isLine == 0.0) {
        discard;
      }
      gl_FragColor = vec4(vLineColor.rgb, vLineColor.a * isLine);
    }
  } else if (filled) {
    gl_FragColor = vLineColor;
  } else {
    discard;
  }
  vec4 _dsColor = texture2D(colorTexture,textureCoord);
  float _lum = 0.3*_dsColor.x + 0.59 * _dsColor.y;
  vec4 _fColor = texture2D(colorTexture,textureCoord);
  // gl_FragColor = xposure(_fColor,_lum,time);
  vec2 flow = fract(textureCoord - vec2(time * speed, time * speed));
  vec4 noiseMap = texture2D(depthTexture,flow);
  vec2 noiseUV =  fract(textureCoord - vec2(noiseMap.r,noiseMap.g) * 0.7);
  gl_FragColor = texture2D(colorTexture,noiseUV) * vBlendColor;

  gl_FragColor.a *= inCircle;
  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`;
