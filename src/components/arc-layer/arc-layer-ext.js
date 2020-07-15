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

import {Layer,picking} from '@deck.gl/core';
// import {Layer,picking} from '../../core';
// import Layer from '../../lib/layer';
// import picking from '../../shaderlib/picking/picking';

import GL from '@luma.gl/constants';
import {Model, Geometry,Texture2D} from '@luma.gl/core';

import vs from './arc-layer-vertex.glsl';
import fs from './arc-layer-fragment.glsl';

const DEFAULT_TEXTURE_PARAMETERS = {
  [GL.TEXTURE_MIN_FILTER]: GL.LINEAR_MIPMAP_LINEAR,
  [GL.TEXTURE_MAG_FILTER]: GL.LINEAR,
  [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
  [GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE
};
var iGlobleTime = 0;
var animationFrame = null;
const DEFAULT_COLOR = [255, 255, 255, 255];
const defaultProps = {
  getSourcePosition: {type: 'accessor', value: x => x.sourcePosition},
  getTargetPosition: {type: 'accessor', value: x => x.targetPosition},
  getSourceColor: {type: 'accessor', value: DEFAULT_COLOR},
  getTargetColor: {type: 'accessor', value: DEFAULT_COLOR},
  getWidth: {type: 'accessor', value: 1},
  getHeight: {type: 'accessor', value: 1},
  getTilt: {type: 'accessor', value: 0},

  widthUnits: 'pixels',
  widthScale: {type: 'number', value: 1, min: 0},
  widthMinPixels: {type: 'number', value: 0, min: 0},
  widthMaxPixels: {type: 'number', value: Number.MAX_SAFE_INTEGER, min: 0},
  image: {type:'object', value:null, async: true},
  speed: {type: 'float',value: 0.1},
  getBlendColor: {type: "accessor",value: DEFAULT_COLOR}
};

export default class ArcLayerExt extends Layer {
  getShaders() {
    return super.getShaders({vs, fs, modules: [picking]}); // 'project' module added by default.
  }

  initializeState() {
    const attributeManager = this.getAttributeManager();

    /* eslint-disable max-len */
    attributeManager.addInstanced({
      instanceSourcePositions: {
        size: 3,
        type: GL.DOUBLE,
        fp64: this.use64bitPositions(),
        transition: true,
        accessor: 'getSourcePosition'
      },
      instanceTargetPositions: {
        size: 3,
        type: GL.DOUBLE,
        fp64: this.use64bitPositions(),
        transition: true,
        accessor: 'getTargetPosition'
      },
      instanceSourceColors: {
        size: this.props.colorFormat.length,
        type: GL.UNSIGNED_BYTE,
        normalized: true,
        transition: true,
        accessor: 'getSourceColor',
        defaultValue: DEFAULT_COLOR
      },
      instanceTargetColors: {
        size: this.props.colorFormat.length,
        type: GL.UNSIGNED_BYTE,
        normalized: true,
        transition: true,
        accessor: 'getTargetColor',
        defaultValue: DEFAULT_COLOR
      },
      instanceWidths: {
        size: 1,
        transition: true,
        accessor: 'getWidth',
        defaultValue: 1
      },
      instanceHeights: {
        size: 1,
        transition: true,
        accessor: 'getHeight',
        defaultValue: 1
      },
      instanceTilts: {
        size: 1,
        transition: true,
        accessor: 'getTilt',
        defaultValue: 0
      },
      blendColor: {
        size: this.props.colorFormat.length,
        type: GL.UNSIGNED_BYTE,
        normalized: true,
        transition: true,
        accessor: 'getBlendColor',
        defaultValue: DEFAULT_COLOR
      }
    });
    this.animate();
    /* eslint-enable max-len */
  }

  updateState({props, oldProps, changeFlags}) {
    super.updateState({props, oldProps, changeFlags});
    // Re-generate model if geometry changed
    if (changeFlags.extensionsChanged) {
      const {gl} = this.context;
      if (this.state.model) {
        this.state.model.delete();
      }
      this.setState({model: this._getModel(gl)});
      this.getAttributeManager().invalidateAll();
    }
    //加载位图
    if (props.image !== oldProps.image && props.image) {
      this.loadTexture(props.image);
    }
  }

  draw({uniforms}) {
    const {viewport} = this.context;
    const {widthUnits, widthScale, widthMinPixels, widthMaxPixels,speed,image} = this.props;

    const widthMultiplier = widthUnits === 'pixels' ? viewport.metersPerPixel : 1;
    //增加
    const {bitmapTexture} = this.state;
    if (bitmapTexture && image instanceof HTMLVideoElement && image.readyState > HTMLVideoElement.HAVE_METADATA) {
      var sizeChanged = bitmapTexture.width !== image.videoWidth || bitmapTexture.height !== image.videoHeight;

      if (sizeChanged) {
        bitmapTexture.resize({
          width: image.videoWidth,
          height: image.videoHeight,
          mipmaps: true
        });
        bitmapTexture.setSubImageData({
          data: image,
          paramters: DEFAULT_TEXTURE_PARAMETERS
        });
      } else {
        bitmapTexture.setSubImageData({
          data: image
        });
      }
      bitmapTexture.generateMipmap();
    }
    ////////////////////////////////////////
    this.state.model
      .setUniforms(
        Object.assign({}, uniforms, {
          widthScale: widthScale * widthMultiplier,
          widthMinPixels,
          widthMaxPixels,
          speed:speed,
          bitmapTexture:bitmapTexture,
          time: this.state.time
        })
      )
      .draw();
  }

  _getModel(gl) {
    let positions = [];
    const NUM_SEGMENTS = 50;
    /*
     *  (0, -1)-------------_(1, -1)
     *       |          _,-"  |
     *       o      _,-"      o
     *       |  _,-"          |
     *   (0, 1)"-------------(1, 1)
     */
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      positions = positions.concat([i, -1, 0, i, 1, 0]);
    }

    const model = new Model(
      gl,
      Object.assign({}, this.getShaders(), {
        id: this.props.id,
        geometry: new Geometry({
          drawMode: GL.TRIANGLE_STRIP,
          attributes: {
            positions: new Float32Array(positions)
          }
        }),
        isInstanced: true
      })
    );

    model.setUniforms({numSegments: NUM_SEGMENTS});

    return model;
  }

  loadTexture(image) {
    var gl = this.context.gl;

    if (this.state.bitmapTexture) {
      this.state.bitmapTexture["delete"]();
    }

    if (image instanceof Texture2D) {
      this.setState({
        bitmapTexture: image
      });
    } else if (image instanceof HTMLVideoElement) {
      this.setState({
        bitmapTexture: new Texture2D(gl, {
          width: 1,
          height: 1,
          parameters: DEFAULT_TEXTURE_PARAMETERS,
          mipmaps: false
        })
      });
    } else if (image) {
      this.setState({
        bitmapTexture: new Texture2D(gl, {
          data: image,
          parameters: DEFAULT_TEXTURE_PARAMETERS
        })
      });
    }

  }

  animate(){
    iGlobleTime += 0.01;
    this.setState({
      time: iGlobleTime
    })
    animationFrame = window.requestAnimationFrame(this.animate.bind(this));
  }
//删除图层之前将调用此方法
  finalizeState() {
    super.finalizeState();

    if (this.state.bitmapTexture) {
      this.state.bitmapTexture.delete();
    }
    if(animationFrame){
      window.cancelAnimationFrame(animationFrame);
    }
  }

}

ArcLayerExt.layerName = 'ArcLayerExt';
ArcLayerExt.defaultProps = defaultProps;
