/* global window */
import React, { Component, Fragment } from 'react';
// import {render} from 'react-dom';
import { StaticMap } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { changeMapboxLanguage } from 'untils/MapUtils';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import DeckGL, { FlyToInterpolator } from 'deck.gl';
import { GeoJsonLayer, PathLayer, } from '@deck.gl/layers';
import { HeatmapLayer, IconLayer } from 'deck.gl';
import PolylineLayer from 'components/polyline-layer/polyline-layer';
import ScatterpointLayer from "components/scatterpoint-layer/scatterpoint-layer";
// import ArcLayerExt from 'components/arc-layer/arc-layer-ext';
// import ScanLayer from 'components/scan-layer/scan-layer';
import cityData from 'assets/json/PuYang_City.geojson';
import roadData from 'assets/json/PuYang_Roads.json';
import buildData from 'assets/json/PuYang_Buildings.geojson';
import countyData from 'assets/json/PuYang_County.geojson';
import arcData from 'assets/json/PuYang_arc.json';
import heatmapData from 'assets/json/builidingCenter.json';
import governmentData from 'assets/json/Puyang_Government_affairs.json';
import policeData from 'assets/json/Puyang_Police.json';
import policeIcon from 'img/affairs/police.png';
import governIcon from 'img/affairs/govern.png';
import pathIcon from 'img/path.png';
import { Popup } from 'react-map-gl';
import './affairsPopup.css';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoieHl0Y3poIiwiYSI6ImNrOWNzZ3ZidDA3bnMzbGxteng1bWc0OWIifQ.QKsCoDJL6Qg8gjQkK3VCoQ'; // eslint-disable-line
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
  borderColor: [61, 169, 125],
  arcColor: [255, 78, 1],
  material,
  effects: [lightingEffect]
};

const INITIAL_VIEW_STATE = {
  //濮阳中心坐标位置 
  longitude: 115.030,
  latitude: 35.709,
  zoom: 12.5,
  pitch: 0,
  bearing: 0 //方位


};

const viewStates = [

  {
    longitude: 115.0259652,
    latitude: 35.71499193,
    zoom: 17,
    pitch: 60,
    bearing: 30,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0119124,
    latitude: 35.70597031,
    zoom: 17,
    pitch: 60,
    bearing: 30,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0244634,
    latitude: 35.71045408,
    zoom: 17,
    pitch: 60,
    bearing: 30,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0262039,
    latitude: 35.70595046,
    zoom: 17,
    pitch: 60,
    bearing: 30,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0036801,
    latitude: 35.71364739,
    zoom: 17,
    pitch: 60,
    bearing: 30,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0274868,
    latitude: 35.71218135,
    zoom: 17,
    pitch: 60,
    bearing: 30,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0659567,
    latitude: 35.72102259,
    zoom: 17,
    pitch: 60,
    bearing: 30,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  {
    longitude: 115.0244634,
    latitude: 35.71045408,
    zoom: 15,
    pitch: 75,
    bearing: 285,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator()
  },
  // {
  //   longitude: 115.0233671,
  //   latitude:35.71174646,
  //   zoom: 17,
  //   pitch: 60,
  //   bearing: 30,
  //   transitionDuration: 5000,
  //   transitionInterpolator: new FlyToInterpolator()
  // },
  // {
  //   longitude:115.0263248,
  //   latitude: 35.71164262,
  //   zoom: 17,
  //   pitch: 60,
  //   bearing: 30,
  //   transitionDuration: 5000,
  //   transitionInterpolator: new FlyToInterpolator()
  // },
  // {
  //   longitude: 115.0255982,
  //   latitude: 35.75812835,
  //   zoom: 14,
  //   pitch: 60,
  //   bearing: 25,
  //   transitionDuration: 5000,
  //   transitionInterpolator: new FlyToInterpolator()
  // },

];
var index_viewState = 0;
var timerView = null;
var timerVisitor = null;
const govPosition = [
  {
    x: 115.023,
    y: 35.713,
  },
];

export default class OneMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitorCount: [836, 780, 712, 664, 590, 500, 436, 381, 313, 249, 180],
      popupVisible: false,
      initViewState: INITIAL_VIEW_STATE
    };
  }
  componentWillMount() {
    document.oncontextmenu = () => false;
    this.setState({ cityData, buildData, roadData, countyData, arcData, heatmapData, governmentData, policeData });
  }
  //组件第一次渲染后调用
  componentDidMount() {
    // this._animate();
    setTimeout(() => {
      this.setState({
        initViewState: viewStates[(viewStates.length - 1).toString()]
      });
      timerView = setInterval(() => {
        if (index_viewState > viewStates.length - 1) {
          index_viewState = 0;
        }
        this.setState({ initViewState: viewStates[index_viewState] });
        index_viewState += 1;
      }, 10000);
    }, 5000);
    timerVisitor = setInterval(() => {
      // 自定义起始数据
      this.setState({
        visitorCount: [836 + Math.round(Math.random() * 50), 785 + Math.round(Math.random() * 50), 712 + Math.round(Math.random() * 50), 664 + Math.round(Math.random() * 50),
        590 + Math.round(Math.random() * 50), 500 + Math.round(Math.random() * 50), 436 + Math.round(Math.random() * 50), 381 + Math.round(Math.random() * 50), 313 + Math.round(Math.random() * 50),
        249 + Math.round(Math.random() * 50), 180 + Math.round(Math.random() * 50)],
      });
      if (map) {
        map.on('zoom', () => {
          if (map.getZoom() > 12) {
            this.setState({
              popupVisible: true
            })
          } else {
            this.setState({
              popupVisible: false
            })
          }
        });
      }
    }, 1000);
  }
  //组件从DOM中移除之前调用
  componentWillUnmount() {
    if (timerView) {
      clearInterval(timerView);
    }
    if (timerVisitor) {
      clearInterval(timerVisitor);
    }
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
      new ScatterpointLayer({
        id: "pointGov",
        data: govPosition,
        getPosition: (d) => [d.x, d.y],
        getLineWidth: 30,
        getRadius: 300,
        getLineColor: [255, 132, 50],
        speed: 1.2,
        stroked: true,
        filled: false,
      }),
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
        getPosition: d => d.geometry.coordinates[0],
        getWeight: d => { return Math.floor(Math.random() * (200 - 40 + 1) + 40) },
      }),


      new IconLayer({
        id: 'government_icon',
        data: this.state.governmentData,
        iconMapping: {
          marker: { x: 0, y: 0, width: 35, height: 48, mask: false },
        },
        iconAtlas: governIcon,
        sizeScale: 3,
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
        iconAtlas: policeIcon,
        sizeScale: 3,
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
        image: pathIcon,
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
        getLineColor: theme.borderColor,
        getLineWidth: 2,
      })
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
      mapStyle = 'mapbox://styles/mapbox/navigation-guidance-night-v4',
      theme = DEFAULT_THEME
    } = this.props;

    const displayContent = [
      {
        coor: [115.0249652, 35.71459193],
        branch: '不动产',
      },
      {
        coor: [115.0119124, 35.70597031],
        branch: '公安',
      },
      {
        coor: [115.0244634, 35.71045408],
        branch: '民政',
      },
      {
        coor: [115.0262039, 35.70595046],
        branch: '工商',
      },
      {
        coor: [115.0036801, 35.71364739],
        branch: '人社',
      },
      {
        coor: [115.0274868, 35.71218135],
        branch: '税务',
      },
      {
        coor: [115.0659567, 35.72102259],
        branch: '违章处理',
      },
      // {
      //   coor: [115.0261693,35.71213981],
      //   branch: '法院',
      // },
      // {
      //   coor: [115.0233671,35.71174646],
      //   branch: '财政局',
      // },
      // {
      //   coor: [115.0263248,35.71164262],
      //   branch: '卫生局',
      // },
    ]

    return (

      <DeckGL

        layers={this._renderLayers()}
        effects={theme.effects}
        // initialViewState={INITIAL_VIEW_STATE}
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
          {
            this.state.popupVisible && <Fragment>
              {displayContent.map((value, index) => {
                return <Popup className={`affairs affairsPopup${index + 1}`}
                  longitude={value.coor[0]}
                  latitude={value.coor[1]}
                  altitude={80}
                  closeButton={false}
                  visible={true}
                  key={index}
                  dynamicPosition={false}
                >
                  <div className='font'>{index + 1}</div>
                  <div className='font2'>{value.branch}</div>
                  <div>
                    <div className='font3'>日服务人次</div>
                    <div className='font4'>{this.state.visitorCount[index]}</div>
                  </div>

                </Popup>
              })}
              <Popup
                className={`traffic popupTrafficGov`}
                longitude={115.023}
                latitude={35.713}
                altitude={10}
                closeButton={false}
                dynamicPosition={false}
                sortByDepth={true}
              >
                <div className="fontTrafficGov">濮阳县政府</div>
              </Popup>
            </Fragment>
          }
        </StaticMap>
      </DeckGL>
    );
  }
}
