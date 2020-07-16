/* global window */
import React, { Component } from 'react';
// import {render} from 'react-dom';
import { MapboxLayer } from '@deck.gl/mapbox';
import { StaticMap } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PathLayer, } from '@deck.gl/layers';
import { HeatmapLayer, IconLayer } from 'deck.gl';
import PolylineLayer from '../../components/polyline-layer/polyline-layer';
// import ArcLayerExt from '../../components/arc-layer/arc-layer-ext';
// import ScanLayer from '../../components/scan-layer/scan-layer';
import cityData from '../../assets/json/PuYang_City.geojson';
import roadData from '../../assets/json/PuYang_Roads.json';
import buildData from '../../assets/json/PuYang_Buildings.geojson';
import countyData from '../../assets/json/PuYang_County.geojson';
import arcData from '../../assets/json/PuYang_arc.json';
import heatmapData from '../../assets/json/builidingCenter.json';
import governmentData from '../../assets/json/Puyang_Government.json';
import policeData from '../../assets/json/Puyang_Police.json'
import { ShowGovernmentIcon } from '../../components/Popup/government/government_popup'
import { Popup, Marker } from 'react-map-gl';
import './popup.css'


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
  longitude: 115.0195982,
  latitude: 35.75112835,
  zoom: 15,
  pitch: 45,
  bearing: 0 //方位
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
    // fetch(DATA_URL.CITY)
    // .then(res => {res.json();debugger;})
    // .then(json => console.log(json));
    this.setState({ cityData, buildData, roadData, countyData, arcData, heatmapData, governmentData, policeData });
  }
  //组件第一次渲染后调用
  componentDidMount() {
    // this._animate();
  }
  //组件从DOM中移除之前调用
  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }

  _renderLayers() {
    const {
      // buildings = DATA_URL.BUILDINGS,
      // trips = DATA_URL.TRIPS,
      theme = DEFAULT_THEME
    } = this.props;

    return [
      new HeatmapLayer({
        id: 'heatmaplayer',
        data: this.state.heatmapData,
        intensity: 1,
        radiusPixels: 80,
        colorRange: [[1, 152, 189],
        [73, 227, 206],
        [216, 254, 181],
        [254, 237, 177],
        [254, 173, 84],
        [209, 55, 78]],
        getPosition: d => d.geometry.coordinates,
        getWeight: d => { return Math.floor(Math.random() * (200 - 40 + 1) + 40) },
      }),


      new IconLayer({
        id: 'government_icon',
        data: this.state.governmentData,
        iconMapping: {
          marker: { x: 0, y: 0, width: 35, height: 48, mask: false },
        },
        //iconAtlas: 'http://localhost:3000/img/affairs/govern.png',
        iconAtlas: 'http://localhost:3000/img/affairs/police2.png',
        sizeScale: 2,
        getIcon: d => 'marker',
        getPosition: d => [d.coor[0], d.coor[1], 80],
        getSize: d => { return 10 },
      }),

      new IconLayer({
        id: 'police_icon',
        data: this.state.policeData,
        iconMapping: {
          marker: { x: 0, y: 0, width: 35, height: 48, mask: false },
        },
        //iconAtlas: 'http://localhost:3000/img/affairs/govern.png',
        iconAtlas: 'http://localhost:3000/img/affairs/govern.png',
        sizeScale: 2,
        getIcon: d => 'marker',
        getPosition: d => [d.coor[0], d.coor[1], 80],
        getSize: d => { return 10 },
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
        opacity: 0.6
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
      })
    ];
  }

  _onLoad(e) {

    let box = document.getElementsByClassName('mapboxgl-map')[0].parentNode
    box.style.zIndex = ''
 
    console.dir(e);
    map = e.target;
    mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.1/mapbox-gl-rtl-text.js');
    map.addControl(new MapboxLanguage({
      defaultLanguage: 'zh'
    }));
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
          <Popup className={"popup"}
            longitude={115.0195982}
            latitude={35.75112835}
            altitude={100}
            closeButton={false}
          >
            <div>
              <p>{"Hello,DeckGL Popup"}</p >
            </div>
          </Popup>
          <Popup className={"popup"}
            longitude={115.0195982}
            latitude={35.78112835}
            altitude={100}
            closeButton={false}
            style={{ zIndex: 9999999 }}
          >
            <div>
              <p>{"Hello,DeckGL Popup"}</p >
            </div>
          </Popup>
        </StaticMap>
      </DeckGL>
    );
  }
}
