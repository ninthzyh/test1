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

import {Layer, project32, picking, log} from '@deck.gl/core';
import GL from '@luma.gl/constants';
import {Model, Geometry,Texture2D} from '@luma.gl/core';

import PolylineTesselator from './polyline-tesselator';

import vs from './polyline-layer-vertex.glsl';
import fs from './polyline-layer-fragment.glsl';

const DEFAULT_TEXTURE_PARAMETERS = {
  [GL.TEXTURE_MIN_FILTER]: GL.LINEAR_MIPMAP_LINEAR,
  [GL.TEXTURE_MAG_FILTER]: GL.LINEAR,
  [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
  [GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE
};
var iGlobleTime = 0;
var animationFrame = null;

const DEFAULT_COLOR = [0, 0, 0, 255];

const defaultProps = {
  widthUnits: 'meters',
  widthScale: {type: 'number', min: 0, value: 1}, // stroke width in meters
  widthMinPixels: {type: 'number', min: 0, value: 0}, //  min stroke width in pixels
  widthMaxPixels: {type: 'number', min: 0, value: Number.MAX_SAFE_INTEGER}, // max stroke width in pixels
  rounded: false,
  miterLimit: {type: 'number', min: 0, value: 4},
  billboard: false,
  // `loop` or `open`
  _pathType: null,

  getPath: {type: 'accessor', value: object => object.path},
  getColor: {type: 'accessor', value: DEFAULT_COLOR},
  getWidth: {type: 'accessor', value: 10},
  image: {type: 'object', value: null, async: true},
  speed: {type: 'float', value: 0.2, min: 0},
  time: {type: 'float',value: 1.0, min: 0},
  trailLength: {type: 'float', value: 120.0, min: 0},
  currentTime: {type: 'float', value: 0.0, min: 0},
  getTimestamps: {type: 'accessor', value: null}
};

const ATTRIBUTE_TRANSITION = {
  enter: (value, chunk) => {
    return chunk.length ? chunk.subarray(chunk.length - value.length) : value;
  }
};

export default class PolylineLayer extends Layer {
  getShaders() {
    return super.getShaders({vs, fs, modules: [project32, picking]}); // 'project' module added by default.
  }

  initializeState() {
    const noAlloc = true;
    const attributeManager = this.getAttributeManager();
    /* eslint-disable max-len */
    attributeManager.addInstanced({
      positions: {
        size: 3,
        // Start filling buffer from 1 vertex in
        vertexOffset: 1,
        type: GL.DOUBLE,
        fp64: this.use64bitPositions(),
        transition: ATTRIBUTE_TRANSITION,
        accessor: 'getPath',
        update: this.calculatePositions,
        noAlloc,
        shaderAttributes: {
          instanceLeftPositions: {
            vertexOffset: 0
          },
          instanceStartPositions: {
            vertexOffset: 1
          },
          instanceEndPositions: {
            vertexOffset: 2
          },
          instanceRightPositions: {
            vertexOffset: 3
          }
        }
      },
      instanceTypes: {
        size: 1,
        type: GL.UNSIGNED_BYTE,
        update: this.calculateSegmentTypes,
        noAlloc
      },
      instanceStrokeWidths: {
        size: 1,
        accessor: 'getWidth',
        transition: true,
        defaultValue: 5
      },
      instanceColors: {
        size: this.props.colorFormat.length,
        type: GL.UNSIGNED_BYTE,
        normalized: true,
        accessor: 'getColor',
        transition: ATTRIBUTE_TRANSITION,
        defaultValue: DEFAULT_COLOR
      },
      instancePickingColors: {
        size: 3,
        type: GL.UNSIGNED_BYTE,
        accessor: (object, {index, target: value}) =>
          this.encodePickingColor(object && object.__source ? object.__source.index : index, value)
      },
      timestamps: {
        size: 1,
        accessor: 'getTimestamps',
        shaderAttributes: {
          instanceTimestamps: {
            vertexOffset: 0
          },
          instanceNextTimestamps: {
            vertexOffset: 1
          }
        }
      }
    });
    /* eslint-enable max-len */

    this.setState({
      pathTesselator: new PolylineTesselator({
        fp64: this.use64bitPositions()
      })
    });

    if (this.props.getDashArray && !this.props.extensions.length) {
      log.removed('getDashArray', 'PathStyleExtension')();
    }
    this.animate();
  }

  updateState({oldProps, props, changeFlags}) {
    super.updateState({props, oldProps, changeFlags});

    const attributeManager = this.getAttributeManager();

    const geometryChanged =
      changeFlags.dataChanged ||
      (changeFlags.updateTriggersChanged &&
        (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getPath));

    if (geometryChanged) {
      const {pathTesselator} = this.state;
      const buffers = props.data.attributes || {};
      pathTesselator.updateGeometry({
        data: props.data,
        geometryBuffer: buffers.getPath,
        buffers,
        normalize: !props._pathType,
        loop: props._pathType === 'loop',
        getGeometry: props.getPath,
        positionFormat: props.positionFormat,
        dataChanged: changeFlags.dataChanged
      });
      this.setState({
        numInstances: pathTesselator.instanceCount,
        startIndices: pathTesselator.vertexStarts
      });
      if (!changeFlags.dataChanged) {
        // Base `layer.updateState` only invalidates all attributes on data change
        // Cover the rest of the scenarios here
        attributeManager.invalidateAll();
      }
    }

    if (changeFlags.extensionsChanged) {
      const {gl} = this.context;
      if (this.state.model) {
        this.state.model.delete();
      }
      this.setState({model: this._getModel(gl)});
      attributeManager.invalidateAll();
    }
    if (props.image !== oldProps.image && props.image){
      this.loadTexture(props.image);
    }
  }

  getPickingInfo(params) {
    const info = super.getPickingInfo(params);
    const {object, index} = info;

    if (object && object.__source) {
      // data is wrapped
      info.object = this.props.data.find(d => d.__source.index === index);
    }
    return info;
  }

  draw({uniforms}) {
    const {viewport} = this.context;
    const {
      rounded,
      billboard,
      miterLimit,
      widthUnits,
      widthScale,
      widthMinPixels,
      widthMaxPixels,
      image,
      trailLength,
      currentTime,
      speed
    } = this.props;

    const widthMultiplier = widthUnits === 'pixels' ? viewport.metersPerPixel : 1;
    //增加sampler2D数据
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

    this.state.model
      .setUniforms(
        Object.assign({}, uniforms, {
          jointType: Number(rounded),
          billboard,
          widthScale: widthScale * widthMultiplier,
          miterLimit,
          widthMinPixels,
          widthMaxPixels,
          bitmapTexture,
          time:this.state.time,
          trailLength,
          currentTime,
          speed
        })
      )
      .draw();
  }

  _getModel(gl) {
    /*
     *       _
     *        "-_ 1                   3                       5
     *     _     "o---------------------o-------------------_-o
     *       -   / ""--..__              '.             _.-' /
     *   _     "@- - - - - ""--..__- - - - x - - - -_.@'    /
     *    "-_  /                   ""--..__ '.  _,-` :     /
     *       "o----------------------------""-o'    :     /
     *      0,2                            4 / '.  :     /
     *                                      /   '.:     /
     *                                     /     :'.   /
     *                                    /     :  ', /
     *                                   /     :     o
     */

    // const SEGMENT_INDICES = [
    //   // start corner
    //   0,
    //   2,
    //   1,
    //   // body
    //   1,
    //   2,
    //   4,
    //   1,
    //   4,
    //   3,
    //   // end corner
    //   3,
    //   4,
    //   5
    // ];

    // [0] position on segment - 0: start, 1: end
    // [1] side of path - -1: left, 0: center (joint), 1: right
    const SEGMENT_POSITIONS = [
      // bevel start corner
      0,
      0,
      // start inner corner
      0,
      -1,
      // start outer corner
      0,
      1,
      // end inner corner
      1,
      -1,
      // end outer corner
      1,
      1,
      // bevel end corner
      1,
      0
    ];

    return new Model(
      gl,
      Object.assign({}, this.getShaders(), {
        id: this.props.id,
        geometry: new Geometry({
          drawMode: GL.TRIANGLE_STRIP,
          attributes: {
            // indices: new Uint16Array(SEGMENT_INDICES),
            positions: {value: new Float32Array(SEGMENT_POSITIONS), size: 2}
          }
        }),
        isInstanced: true
      })
    );
  }

  calculatePositions(attribute) {
    const {pathTesselator} = this.state;

    attribute.startIndices = pathTesselator.vertexStarts;
    attribute.value = pathTesselator.get('positions');
  }

  calculateSegmentTypes(attribute) {
    const {pathTesselator} = this.state;

    attribute.startIndices = pathTesselator.vertexStarts;
    attribute.value = pathTesselator.get('segmentTypes');
  }

  loadTexture(image){
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

PolylineLayer.layerName = 'PolylineLayer';
PolylineLayer.defaultProps = defaultProps;
