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
#define SHADER_NAME path-layer-fragment-shader

precision highp float;

uniform float jointType;
uniform float miterLimit;
uniform sampler2D bitmapTexture;
uniform float time;
uniform float speed;
uniform float trailLength;
uniform float currentTime;

varying vec4 vColor;
varying vec2 vCornerOffset;
varying float vMiterLength;
/*
 * vPathPosition represents the relative coordinates of the current fragment on the path segment.
 * vPathPosition.x - position along the width of the path, between [-1, 1]. 0 is the center line.
 * vPathPosition.y - position along the length of the path, between [0, L / width].
 */
varying vec2 vPathPosition;
varying float vPathLength;
varying float vTime;

void main(void) {
  geometry.uv = vPathPosition;
  // if (vTime > currentTime || vTime < currentTime - trailLength) {
  //   discard;
  // }
  if (vPathPosition.y < 0.0 || vPathPosition.y > vPathLength) {
    // if joint is rounded, test distance from the corner
    if (jointType > 0.0 && length(vCornerOffset) > 1.0) {
      discard;
    }
    // trim miter
    if (jointType == 0.0 && vMiterLength > miterLimit + 1.0) {
      discard;
    }
  }

  vec4 colorimage = texture2D(bitmapTexture,vec2(fract(vPathPosition.y/vPathLength - time * speed),vPathPosition.x));
  gl_FragColor = colorimage ;
  // gl_FragColor.a *= 1.0 - (currentTime - vTime)/trailLength;

  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`;
