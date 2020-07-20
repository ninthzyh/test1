/* global window */
import React, { Component, Fragment } from 'react';
import { StaticMap } from 'react-map-gl';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { HeatmapLayer, IconLayer } from 'deck.gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PathLayer, ArcLayer } from '@deck.gl/layers';
import PolylineLayer from 'components/polyline-layer/polyline-layer';
import ArcLayerExt from 'components/arc-layer/arc-layer-ext';
import ScatterpointLayer from 'components/scatterpoint-layer/scatterpoint-layer';
import { changeMapboxLanguage } from '../../untils/MapUtils';
import cityData from 'assets/json/PuYang_City.geojson';
import roadData from 'assets/json/PuYang_Roads.json';
import buildData from 'assets/json/PuYang_Buildings.geojson';
import countyData from 'assets/json/PuYang_County.geojson';
import arcData from 'assets/json/PuYang_arc.json';
import targetPos from 'assets/json/PuYang_TargetPositions.json';
import roadHeatmap from 'assets/json/PuYang_Road_Points.geojson';
import governmentData from '../../assets/json/Puyang_Government.json';
import { Popup } from 'react-map-gl';
import carUrl from 'img/traffic/trafficCar.png';
import './trafficPopup.css'

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
  buildingColor: [74, 112, 139],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  arcColor: [255, 255, 255],
  pathColor: [255, 0, 0],
  material,
  effects: [lightingEffect]
};

const INITIAL_VIEW_STATE = {
  //濮阳中心坐标位置 
  longitude: 115.04135933966147,
  latitude: 35.76466549083701,
  zoom: 12,
  pitch: 60,
  bearing: -60 //方位
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
    this.setState({ cityData, buildData, roadData, countyData, arcData, targetPos, roadHeatmap, governmentData });
  }
  //组件第一次渲染后调用
  componentDidMount() {
    document.oncontextmenu = () => false;
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
      new PathLayer({
        id: 'pathlayer',
        data: this.state.roadData,
        getPath: d => d.geometry.coordinates[0],
        getWidth: 5,
        getColor: theme.pathColor,
        opacity: 1.0
      }),
      new PolylineLayer({
        id: 'path',
        data: this.state.roadData,
        getPath: d => d.geometry.coordinates[0],
        image: imgUrl + '/path.png',
        getWidth: 5,
        speed: 5,
      }),
      new ArcLayerExt({
        id: 'arclayerext',
        data: this.state.arcData,
        getSourcePosition: d => d.from,
        getTargetPosition: d => d.to,
        getWidth: 3,
        image: imgUrl + "/path4.png",
        speed: 3
      }),
      new HeatmapLayer({
        id: 'heatmaplayer',
        data: this.state.roadHeatmap,
        intensity: 1,
        radiusPixels: 50,
        colorRange: [
          [49, 157, 62], [77, 185, 95], [255, 218, 110],
          [255, 179, 63], [255, 141, 46], [234, 85, 26], [227, 12, 12]
        ],
        opacity: 0.4,
        getPosition: d => d.geometry.coordinates,
        getWeight: d => { return Math.floor(Math.random() * (500 - 300 + 1) + 300) },
      }),
      new ScatterpointLayer({
        data: this.state.targetPos,
        getRadius: 1500,
        getPosition: d => d.position,
        speed: 4.0,
        getColor: [255, 255, 0],
        getLineWidth: 60
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
    map = e.target;
    console.log(map, 123)
    changeMapboxLanguage(map);
  }

  render() {
    const {
      viewState,
      mapStyle = 'mapbox://styles/mapbox/navigation-preview-night-v4',
      theme = DEFAULT_THEME
    } = this.props;
    const displayContent = [
      {
        coor: [115.0195982, 35.75112835],
        road: '解放大道',
        accident: '追尾事故',
        accidentTime: '(07-17 17:50)'
      },
      {
        coor: [115.0195982, 35.78112835],
        road: '解放大道',
        accident: '连环车祸',
        accidentTime: '(07-13 8:20)'
      },
      {
        coor: [115.0295982, 35.76212835],
        road: '解放大道',
        accident: '追尾事故',
        accidentTime: '(07-12 7:40)'
      }
    ]
    const displayIcon = [
      {
        coor: [115.08628, 35.76303],
      },
      {
        coor: [115.02760, 35.75115],
      },
      {
        coor: [115.01693, 35.70723],
      },
    ]
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

            {displayContent.map((value, index) => {
              return (
                <Fragment>
                  <Popup className={`traffic trafficPopup${index + 1}`}
                    longitude={value.coor[0]}
                    latitude={value.coor[1]}
                    altitude={50}
                    offsetLeft={90}
                    closeButton={false}
                    visible={true}
                    key={index}
                    dynamicPosition={false}
                  >
                    <img className="trafficCarimage" src={carUrl} ></img>
                    <div>
                      <div className='trafficAccident'>{value.accident}
                        <span className='trafficTime' >
                          {value.accidentTime}
                        </span>
                      </div>
                      <div className='trafficRoad'>{value.road}</div>
                    </div>

                  </Popup>
                  <Popup className={`trafficIcon`}
                    longitude={value.coor[0]}
                    latitude={value.coor[1]}
                    altitude={0}
                    closeButton={false}
                    visible={true}
                    key={'car'+index}
                    dynamicPosition={false}
                  >
                  </Popup>
                </Fragment>
              )
            })
            }
          </StaticMap>
        </DeckGL>

      </div>
    );
  }
}
