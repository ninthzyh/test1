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

import {Layer, project32, picking} from '@deck.gl/core';
import GL from '@luma.gl/constants';
import {Model, Texture2D} from '@luma.gl/core';
import SphereGeometry from './sphere-geometry';

import vs from './scan-layer-vertex.glsl';
import fs from './scan-layer-fragment.glsl';

const DEFAULT_COLOR = [255, 255, 255, 255];
const DEFAULT_TEXTURE_PARAMETERS = {
  [GL.TEXTURE_MIN_FILTER]: GL.LINEAR_MIPMAP_LINEAR,
  [GL.TEXTURE_MAG_FILTER]: GL.LINEAR,
  [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
  [GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE
};
var iGlobleTime = 0;
var animationFrame = null;
const defaultProps = {
  radiusScale: {type: 'number', min: 0, value: 1},
  radiusMinPixels: {type: 'number', min: 0, value: 0}, //  min point radius in pixels
  radiusMaxPixels: {type: 'number', min: 0, value: Number.MAX_SAFE_INTEGER}, // max point radius in pixels

  lineWidthUnits: 'meters',
  lineWidthScale: {type: 'number', min: 0, value: 1},
  lineWidthMinPixels: {type: 'number', min: 0, value: 0},
  lineWidthMaxPixels: {type: 'number', min: 0, value: Number.MAX_SAFE_INTEGER},
  speed: {type: 'number', min: 0, value: 1},

  stroked: false,
  filled: true,

  getPosition: {type: 'accessor', value: x => x.position},
  getRadius: {type: 'accessor', value: 1},
  getFillColor: {type: 'accessor', value: DEFAULT_COLOR},
  getLineColor: {type: 'accessor', value: DEFAULT_COLOR},
  getLineWidth: {type: 'accessor', value: 1},
  getBlendColor: {type: 'accessor', value: DEFAULT_COLOR},

  // deprecated
  strokeWidth: {deprecatedFor: 'getLineWidth'},
  outline: {deprecatedFor: 'stroked'},
  getColor: {deprecatedFor: ['getFillColor', 'getLineColor']},
  image:{type:'object', value: null, async: true},
  imageNoise:{type:'object', value: null, async: true}
};

export default class ScanLayer extends Layer {
  getShaders(id) {
    return super.getShaders({vs, fs, modules: [project32, picking]});
  }

  initializeState() {
    // const {gl} = this.context;
//     gl.disable(gl.BLEND);
//     gl.depthMask(true);
    // gl.enable(gl.DEPTH_TEST);
    // 清屏
    // gl.clearColor(0.1, 0.1, 0.1, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // gl.enable(gl.CULL_FACE);
    // gl.enable(gl.BLEND);
    // gl.blendFunc(gl.ONE,gl.ONE);
    this.getAttributeManager().addInstanced({
      instancePositions: {
        size: 3,
        type: GL.DOUBLE,
        fp64: this.use64bitPositions(),
        transition: true,
        accessor: 'getPosition'
      },
      instanceRadius: {
        size: 1,
        transition: true,
        accessor: 'getRadius',
        defaultValue: 1
      },
      instanceFillColors: {
        size: this.props.colorFormat.length,
        transition: true,
        normalized: true,
        type: GL.UNSIGNED_BYTE,
        accessor: 'getFillColor',
        defaultValue: [0, 0, 0, 255]
      },
      instanceLineColors: {
        size: this.props.colorFormat.length,
        transition: true,
        normalized: true,
        type: GL.UNSIGNED_BYTE,
        accessor: 'getLineColor',
        defaultValue: [0, 0, 0, 255]
      },
      instanceLineWidths: {
        size: 1,
        transition: true,
        accessor: 'getLineWidth',
        defaultValue: 1
      },
      instanceBlendColor: {
        size: this.props.colorFormat.length,
        transition: true,
        normalized: true,
        type: GL.UNSIGNED_BYTE,
        accessor: 'getBlendColor',
        defaultValue: [255, 255, 255, 255]
      }
    });
    this.animate();
  }

  updateState({props, oldProps, changeFlags}) {
    super.updateState({props, oldProps, changeFlags});
    if (changeFlags.extensionsChanged) {
      const {gl} = this.context;

      if (this.state.model) {
        this.state.model.delete();
      }
      this.setState({model: this._getModel(gl)});
      this.getAttributeManager().invalidateAll();
    }
    if (props.image !== oldProps.image && props.image ) {
      this.loadTexture(props.image);
    }
    if(props.imageNoise !== oldProps.imageNoise && props.imageNoise)
    {
      this.loadNoiseTexture(props.imageNoise);
    }
  }

  draw({uniforms}) {
    const {viewport} = this.context;
    const {
      radiusScale,
      radiusMinPixels,
      radiusMaxPixels,
      stroked,
      filled,
      lineWidthUnits,
      lineWidthScale,
      lineWidthMinPixels,
      lineWidthMaxPixels,
      image,
      imageNoise,
      speed
    } = this.props;

    const widthMultiplier = lineWidthUnits === 'pixels' ? viewport.metersPerPixel : 1;
    const {colorTexture,depthTexture} = this.state;
    if (colorTexture && image instanceof HTMLVideoElement && image.readyState > HTMLVideoElement.HAVE_METADATA) {
      var sizeChanged = colorTexture.width !== image.videoWidth || colorTexture.height !== image.videoHeight;

      if (sizeChanged) {
        colorTexture.resize({
          width: image.videoWidth,
          height: image.videoHeight,
          mipmaps: true
        });
        colorTexture.setSubImageData({
          data: image,
          paramters: DEFAULT_TEXTURE_PARAMETERS
        });
      } else {
        colorTexture.setSubImageData({
          data: image
        });
      }
      colorTexture.generateMipmap();
    }
    if (depthTexture && imageNoise instanceof HTMLVideoElement && imageNoise.readyState > HTMLVideoElement.HAVE_METADATA) {
      var sizeNoiseChanged = depthTexture.width !== imageNoise.videoWidth || depthTexture.height !== imageNoise.videoHeight;

      if (sizeNoiseChanged) {
        depthTexture.resize({
          width: imageNoise.videoWidth,
          height: imageNoise.videoHeight,
          mipmaps: true
        });
        depthTexture.setSubImageData({
          data: imageNoise,
          paramters: DEFAULT_TEXTURE_PARAMETERS
        });
      } else {
        depthTexture.setSubImageData({
          data: imageNoise
        });
      }
      depthTexture.generateMipmap();
    }
    this.state.model
      .setUniforms(uniforms)
      .setUniforms({
        stroked: stroked ? 1 : 0,
        filled,
        radiusScale,
        radiusMinPixels,
        radiusMaxPixels,
        lineWidthScale: lineWidthScale * widthMultiplier,
        lineWidthMinPixels,
        lineWidthMaxPixels,
        time:this.state.time,
        colorTexture,
        depthTexture,
        speed
      })
      .draw();
  }

  _getModel(gl) {
    // a square that minimally cover the unit circle
    return new Model(
      gl,
      Object.assign(this.getShaders(), {
        id: this.props.id,
        geometry: new SphereGeometry({
          nlat: 30,
          nlong: 30
        }),
        isInstanced: true
      })
    );
  }
  //加载主图
  loadTexture(image) {
    var gl = this.context.gl;

    if (this.state.colorTexture) {
      this.state.colorTexture["delete"]();
    }

    if (image instanceof Texture2D) {
      this.setState({
        colorTexture: image
      });
    } else if (image instanceof HTMLVideoElement) {
      this.setState({
        colorTexture: new Texture2D(gl, {
          width: 1,
          height: 1,
          parameters: DEFAULT_TEXTURE_PARAMETERS,
          mipmaps: false
        })
      });
    } else if (image) {
      this.setState({
        colorTexture: new Texture2D(gl, {
          data: image,
          parameters: DEFAULT_TEXTURE_PARAMETERS
        })
      });
    }
  }
  //加载噪声图
  loadNoiseTexture(image) {
    var gl = this.context.gl;

    if (this.state.depthTexture) {
      this.state.depthTexture["delete"]();
    }

    if (image instanceof Texture2D) {
      this.setState({
        depthTexture: image
      });
    } else if (image instanceof HTMLVideoElement) {
      this.setState({
        depthTexture: new Texture2D(gl, {
          width: 1,
          height: 1,
          parameters: DEFAULT_TEXTURE_PARAMETERS,
          mipmaps: false
        })
      });
    } else if (image) {
      this.setState({
        depthTexture: new Texture2D(gl, {
          data: image,
          parameters: DEFAULT_TEXTURE_PARAMETERS
        })
      });
    }
  }

  animate(){
    if(iGlobleTime>1){
      iGlobleTime = 0.0;
    }else{
      iGlobleTime += 0.001;
    }
    this.setState({
      time: iGlobleTime
    })
    animationFrame = window.requestAnimationFrame(this.animate.bind(this));
  }

  //删除图层之前将调用此方法
  finalizeState() {
    super.finalizeState();

    if(animationFrame){
      window.cancelAnimationFrame(animationFrame);
    }
  }
}

ScanLayer.layerName = 'ScanLayer';
ScanLayer.defaultProps = defaultProps;
