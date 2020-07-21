/* global window */
import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PathLayer } from '@deck.gl/layers';
import PolylineLayer from 'components/polyline-layer/polyline-layer';
import cityData from 'assets/json/PuYang_City.geojson';
import roadData from 'assets/json/PuYang_Roads.json';
import buildData from 'assets/json/PuYang_Buildings.geojson';
import countyData from 'assets/json/PuYang_County.geojson';
import arcData from 'assets/json/PuYang_arc.json';
import companyData from 'assets/json/PuYang_Company.json';
import placeData from 'assets/json/PuYang_Place.json';
import governmentData from 'assets/json/Puyang_Government.json';

import companyIcon from 'img/credit/company.png';
import governIcon from 'img/credit/govern.png';

import { Popup } from 'react-map-gl';
import { IconLayer,HeatmapLayer } from 'deck.gl';
import './creditPopup.css';
import {changeMapboxLanguage} from '../../untils/MapUtils';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoieHl0Y3poIiwiYSI6ImNrOWNzZ3ZidDA3bnMzbGxteng1bWc0OWIifQ.QKsCoDJL6Qg8gjQkK3VCoQ'; // eslint-disable-line
const imgUrl = 'http://localhost:3000/img';
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
// const directionalLight = new DirectionalLight({
//   color: [255, 0, 0],
//   position: []
// })

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
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  arcColor: [255, 78, 1],
  material,
  effects: [lightingEffect]
};

const INITIAL_VIEW_STATE = {
  //濮阳中心坐标位置 
  longitude: 115.0295982,
  latitude: 35.7552835,
  zoom: 13.5,
  pitch: 50,
  bearing: -15 //方位
};

export default class OneMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      opacity: 1,
    };
  }
  componentWillMount() {
    document.oncontextmenu = () => false;
    this.setState({ cityData, buildData, roadData, countyData, arcData, companyData, placeData, governmentData });
  }

  //组件从DOM中移除之前调用
  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }

  _renderLayers() {
    const {
      theme = DEFAULT_THEME
    } = this.props;

    return [
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
        image: imgUrl + '/path.png',
        getWidth: 4,
        speed: 1.2,
      }),

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
        opacity: 0.1
      }),
      new GeoJsonLayer({
        id: 'county-Layer',
        data: this.state.countyData,
        stroked: true,
        filled: false,
        extruded: false,
        lineWidthMinPixels: 2,
        getLineColor: [255, 255, 0],
        getLineWidth: 2,
      }),
      new IconLayer({
        id: 'company_icon',
        data: this.state.companyData,
        iconMapping: {
          marker: { x: 0, y: 0, width: 35, height: 48, mask: false },
        },
        iconAtlas: companyIcon,
        sizeScale: 2,
        getIcon: d => 'marker',
        getPosition: d => [d.coor[0], d.coor[1], 80],
        getSize: d => { return 10 },
      }),
      // new IconLayer({
      //   id: 'government_icon',
      //   data: this.state.governmentData,
      //   iconMapping: {
      //     marker: { x: 0, y: 0, width: 35, height: 48, mask: false },
      //   },
      //   iconAtlas: governIcon,
      //   sizeScale: 2,
      //   getIcon: d => 'marker',
      //   getPosition: d => [d.coor[0], d.coor[1], 80],
      //   getSize: d => { return 10 },
      // }),
      new HeatmapLayer({
        id: 'heatmaplayer',
        data: this.state.companyData,
        intensity: 3,
        radiusPixels: 70,
        colorRange: [
             [81,54,158],[105,66,151],[119,73,147],[150,85,139],
             [194,100,123],[219,110,105],[239,124,83],[250,191,61]
          ],
        opacity:1.0,
        getPosition: d => [d.coor[0], d.coor[1]],
        getWeight: d => { return Math.floor(Math.random() * (100 - 1 + 1) + 1) },
      }),
    ];
  }
  _onLoad(e) {
    let box = document.getElementsByClassName('mapboxgl-map')[0].parentNode
    box.style.zIndex = ''
    map = e.target;
    changeMapboxLanguage(map);
  }

  render() {
    const {
      viewState,
      mapStyle = 'mapbox://styles/mapbox/navigation-guidance-night-v3',
      theme = DEFAULT_THEME
    } = this.props;

    return (
      <div style={{ zIndex: '1' }}>
        <DeckGL
          layers={this._renderLayers()}
          effects={theme.effects}
          initialViewState={INITIAL_VIEW_STATE}
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
            <Popup className={'credit creditPopup1'}
              longitude={115.0105982}
              latitude={35.75112835}
              altitude={80}
              closeButton={false}
              visible={true}
              dynamicPosition={false}
            >
              <div className='title'> 市场监督</div>
              <div className='underline' />
              <div className='content'> 当日新增注册企业 <span className='number'> 3</span></div>
              <div className='content'> 当日行政处罚次数 <span className='number'> 5</span></div>
              <div className='content'> 当日食品加工企业 <span className='number'> 58</span></div>
              <div className='content'> 当日注销企业数 <span className='number'> 1</span></div>
              <div className='content'> 当日案件数 <span className='number'> 0</span></div>
              <div className='content'> 版权变更办理数 <span className='number'> 4</span></div>
            </Popup>
            <Popup className={'credit creditPopup2'}
              longitude={ 115.0274868}
              latitude={35.71218135}
              altitude={80}
              closeButton={false}
              visible={true}
              dynamicPosition={false}
            >
              <div className='title'> 税务局</div>
              <div className='underline' />
              <div className='content'> 当日行政处罚次数 <span className='number'> 5</span></div>
              <div className='content'> 当日处罚金额 <span className='number'> 2000</span></div>
              <div className='content'> 近一年处罚企业数 <span className='number'> 1</span></div>
              <div className='content'> 欠税企业数 <span className='number'> 0</span></div>
            </Popup>
            <Popup className={'credit creditPopup3'}
              longitude={ 115.0289515}
              latitude={35.76300968}
              altitude={80}
              closeButton={false}
              visible={true}
              dynamicPosition={false}
            >
              <div className='title'> 专利及知识产权局</div>
              <div className='underline' />
              <div className='content'> 近一年新增专利数<span className='number'>2459</span></div>
              <div className='content'> 近一年新增商标数<span className='number'> 123</span></div>
              <div className='content'> 近一月新增软著数 <span className='number'> 489</span></div>

            </Popup>
          </StaticMap>
        </DeckGL>

      </div>
    );
  }
}
