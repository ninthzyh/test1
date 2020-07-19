/* global window */
import React, { Component } from 'react';
// import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import mapboxgl  from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import DeckGL, { FlyToInterpolator } from 'deck.gl';
import { GeoJsonLayer, PathLayer } from '@deck.gl/layers';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import PolylineLayer from 'components/polyline-layer/polyline-layer';
import { Popup } from 'react-map-gl';
// import ArcLayerExt from 'components/arc-layer/arc-layer-ext';
// import ScanLayer from 'components/scan-layer/scan-layer';
import cityData from 'assets/json/PuYang_City.geojson';
import roadData from 'assets/json/PuYang_Roads.json';
import buildData from 'assets/json/PuYang_Buildings.geojson';
import countyData from 'assets/json/PuYang_County.geojson';
import arcData from 'assets/json/PuYang_arc.json';
import hexagonData from 'assets/json/PuYangCity_WangGe.json';
import pathImg from 'assets/images/path.png';
// import colorImg from 'img/color.png';
// import noiseImg from 'img/depth.png';
import './managerPopup.scss';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoieHl0Y3poIiwiYSI6ImNrOWNzZ3ZidDA3bnMzbGxteng1bWc0OWIifQ.QKsCoDJL6Qg8gjQkK3VCoQ'; // eslint-disable-line
// const imgUrl = document.location.origin + '/img/';
var map;
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [114.9125, 35.9860, 8000]
});
const pointLightRight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [115.1525, 35.8060, 8000]
});


const lightingEffect = new LightingEffect({
  ambientLight,
  pointLights: pointLight, pointLightRight
});
const material = {
  ambient: 0.1, //环境
  diffuse: 0.6,  //漫反射
  shininess: 8,
  specularColor: [60, 64, 70] //高光颜色
};

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  // buildingColor: [121, 133, 147],
  // buildingColor: [150, 134, 109],
  // buildingColor: [135, 124, 107],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  arcColor: [255, 78, 1],
  borderColor: [61, 169, 125],
  material,
  effects: [lightingEffect]
};

const INITIAL_VIEW_STATE = {
  //濮阳中心坐标位置 
  longitude: 115.055,
  latitude: 35.755,
  zoom: 11,
  pitch: 0,
  bearing: 0 //方位
};

const viewStates = [
  {
    longitude: 115.0236,
    latitude: 35.7141,
    zoom: 16,
    pitch: 60,
    bearing: 30,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0124,
    latitude: 35.7043,
    zoom: 16,
    pitch: 60,
    bearing: 40,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0379,
    latitude: 35.7174,
    zoom: 16,
    pitch: 60,
    bearing: 45,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0159,
    latitude: 35.7273,
    zoom: 16,
    pitch: 60,
    bearing: 45,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0236,
    latitude: 35.7141,
    zoom: 14,
    pitch: 60,
    bearing: 55,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  }
];

var index_viewState = 0;
var timerManage = null;
export default class OneMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initViewState: INITIAL_VIEW_STATE,
      timer: 5000
    };
  }
  componentWillMount() {
    document.oncontextmenu = () => false;
    this.setState({ cityData, buildData, roadData, countyData, arcData });
  }
  //组件第一次渲染后调用
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initViewState: viewStates[(viewStates.length - 1).toString()]
      })
      timerManage = setInterval(() => {
        if (index_viewState > viewStates.length - 1) {
          index_viewState = 0;
        }
        this.setState({ initViewState: viewStates[index_viewState] });
        index_viewState += 1;
        if (map) {
          map.on("click", (e) => {
            console.log(map.getZoom());
          })
        }
      }, 10000);
    }, 5000);
  }
  //组件从DOM中移除之前调用
  componentWillUnmount() {
    if (timerManage) {
      clearInterval(timerManage);
    }
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }

  _renderLayers() {
    const {
      theme = DEFAULT_THEME
    } = this.props;

    return [
      new H3HexagonLayer({
        id: 'h3-hexagon-layer',
        data: hexagonData,
        pickable: true,
        wireframe: false,
        filled: false,
        extruded: false,
        elevationScale: 2,
        getHexagon: d => d.hex,
        getFillColor: d => [0, (1 - d.count / 500) * 220, 255,255],
        getElevation: d => d.count,
        getLineColor: d => [85,245,255],
        getLineWidth: 5
      }),
      new PathLayer({
        id: 'pathlayer',
        data: this.state.roadData,
        getPath: d => d.geometry.coordinates[0],
        getWidth: 4,
        getColor: theme.arcColor,
        opacity: 0.2
      }),
      new PolylineLayer({
        id: 'path',
        data: this.state.roadData,
        getPath: d => d.geometry.coordinates[0],
        image: pathImg,
        getWidth: 4,
        speed: 1.2,
      }),
      // new ArcLayer({
      //     id:'arclayerext',
      //     data: this.state.arcData,
      //     getSourcePosition: d => d.from,
      //     getTargetPosition: d => d.to,
      //     getSourceColor: theme.arcColor,
      //     getTargetColor: theme.arcColor,
      //     getWidth: 2,
      //     getHeight: 0.7,
      //     opacity: 0.2
      // }),
      // new ArcLayerExt({
      //     id:'arclayerext',
      //     data: this.state.arcData,
      //     getSourcePosition: d => d.from,
      //     getTargetPosition: d => d.to,
      //     getWidth: 2,
      //     getHeight: 0.7,
      //     image: imgUrl + 'arc.png',
      //     speed: 1
      // }),
      new GeoJsonLayer({
        id: 'building-layer',
        data: this.state.buildData,
        stroked: true,
        filled: true,
        extruded: true,
        lineWidthMinPixels: 2,
        elevationScale: 1,
        getElevation: d => d.properties.height,
        getFillColor: theme.buildingColor,
        material: theme.material,
        opacity: 0.3
      }),
        // new ArcLayer({
        //     id:'arclayerext',
        //     data: this.state.arcData,
        //     getSourcePosition: d => d.from,
        //     getTargetPosition: d => d.to,
        //     getSourceColor: theme.arcColor,
        //     getTargetColor: theme.arcColor,
        //     getWidth: 2,
        //     getHeight: 0.7,
        //     opacity: 0.2
        // }),
        // new ArcLayerExt({
        //     id:'arclayerext',
        //     data: this.state.arcData,
        //     getSourcePosition: d => d.from,
        //     getTargetPosition: d => d.to,
        //     getWidth: 2,
        //     getHeight: 0.7,
        //     image: imgUrl + 'arc.png',
        //     speed: 1
        // }),
        new GeoJsonLayer({
          id: 'building-layer',
          data: this.state.buildData,
          stroked: true,
          filled: true,
          extruded: true,
          lineWidthMinPixels: 2,
          elevationScale: 1,
          getElevation: d => d.properties.height,
          getFillColor: theme.buildingColor,
          material: theme.material,
          opacity: 0.3
        }),
        // new ScanLayer({
        //     id:'pointone',
        //     data:[
        //       {position: [115.015, 35.7050], color: [200, 0, 0], radius: 1500}
        //     ],
        //     getPosition: d => d.position,
        //     image: colorImg,
        //     imageNoise: noiseImg,
        //     getRadius: d => d.radius,
        //     speed: 6,
        //     getBlendColor: [0, 255, 0]
        // }),
        // new GeoJsonLayer({
        //   id: 'city-layer',
        //   data:this.state.cityData,
        //   pickable: true,
        //   stroked: true,
        //   filled: false,
        //   extruded: false,
        //   lineWidthScale: 2,
        //   lineWidthMinPixels: 2,
        //   getFillColor: [160, 160, 180, 100],
        //   getLineColor: [255,0,0],
        //   getRadius: 100,
        //   getLineWidth: 2,
        //   // wireframe: true
        // }),
        new GeoJsonLayer({
            id: 'county-Layer',
            data: this.state.countyData,
            stroked: true,
            filled: false,
            extruded: false,
            lineWidthMinPixels: 2,
            getLineColor: theme.borderColor,
            getLineWidth: 2,
        })
    ];
  }
  _onLoad(e) {
    let box = document.getElementsByClassName('mapboxgl-map')[0].parentNode
    box.style.zIndex = ''
    map = e.target;
    mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.1/mapbox-gl-rtl-text.js');
    e.target.addControl(new MapboxLanguage({
      defaultLanguage: 'zh'
    }));
    e.target.setLayoutProperty('country-label-lg', 'text-field', '{name_zh}');
  }

  render() {
    const {
      viewState,
      mapStyle = 'mapbox://styles/mapbox/navigation-guidance-night-v4',
      theme = DEFAULT_THEME
    } = this.props;

    return (
      <DeckGL
        layers={this._renderLayers()}
        effects={theme.effects}
        initialViewState={this.state.initViewState}
        viewState={viewState}
        controller={true}
      >
        <StaticMap
          reuseMaps
          ref={ref => {
            this._map = ref && ref.getMap();
          }}
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onLoad={this._onLoad}
        >
        <Popup className={'manager managerPopup1'}
              longitude={115.0236}
              latitude={35.7141}
              altitude={0}
              anchor = {'bottom'}
              dynamicPosition = {false}
              sortByDepth = {true}
              closeButton={false}
              visible={true}
            >
              <div className='managerPopup1 font'>1</div>
              <div className='managerPopup1 title'>网格统计情况</div>
              <div className='managerPopup1 static'>5</div>
              <div className='managerPopup1 static'>3</div>
              <div className='managerPopup1 static'>1</div>
              <div className='managerPopup1 static'>8</div>
              <div className='managerPopup1 static'>10</div>
            </Popup>
            <Popup className={'manager managerPopup1'}
              longitude={115.0124}
              latitude={35.7043}
              altitude={0}
              anchor = {'bottom'}
              dynamicPosition = {false}
              sortByDepth = {true}
              closeButton={false}
              visible={true}
            >
              <div className='managerPopup1 font'>2</div>
              <div className='managerPopup1 title'>网格统计情况</div>
              <div className='managerPopup1 static'>4</div>
              <div className='managerPopup1 static'>5</div>
              <div className='managerPopup1 static'>1</div>
              <div className='managerPopup1 static'>10</div>
              <div className='managerPopup1 static'>9</div>
            </Popup>
            <Popup className={'manager managerPopup1'}
              longitude={115.0379}
              latitude={35.7174}
              altitude={0}
              anchor = {'bottom'}
              dynamicPosition = {false}
              sortByDepth = {true}
              closeButton={false}
              visible={true}
            >
              <div className='managerPopup1 font'>3</div>
              <div className='managerPopup1 title'>网格统计情况</div>
              <div className='managerPopup1 static'>6</div>
              <div className='managerPopup1 static'>4</div>
              <div className='managerPopup1 static'>1</div>
              <div className='managerPopup1 static'>7</div>
              <div className='managerPopup1 static'>9</div>
            </Popup>
            <Popup className={'manager managerPopup2'}
              longitude={115.0159}
              latitude={35.7273}
              altitude={0}
              anchor = {'bottom'}
              dynamicPosition = {false}
              sortByDepth = {true}
              closeButton={false}
              visible={true}
            >
              <div className='managerPopup2 title'>抢劫治安事件</div>
              <div className="managerPopup2 body">
                <div className='managerPopup2 content'>濮阳县解放大道建业城小区附近</div>
                <div className='managerPopup2 content'>2020-07-07 11:34:20</div>
              </div>
            </Popup>
            </StaticMap>
      </DeckGL>
    );
  }
}
