/* global window */
import React, { Component, Fragment } from "react";
import { StaticMap } from "react-map-gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import DeckGL, { FlyToInterpolator } from "deck.gl";
import { GeoJsonLayer, PathLayer } from "@deck.gl/layers";
import PolylineLayer from "components/polyline-layer/polyline-layer";
import cityData from "assets/json/PuYang_City.geojson";
import roadData from "assets/json/PuYang_Roads.json";
import buildData from "assets/json/PuYang_Buildings.geojson";
import countyData from "assets/json/PuYang_County.geojson";
import ScanLayer from "components/scan-layer/scan-layer";
import ScatterpointLayer from "components/scatterpoint-layer/scatterpoint-layer";
import ArcLayerExt from "components/arc-layer/arc-layer-ext";
import { HeatmapLayer, IconLayer } from "deck.gl";
import arcData from "assets/json/PuYang_Emergency_Arc.json";
import pointEmeData from "assets/json/PuYang_Emergency_Point.json";
import lineEmeData from "assets/json/PuYang_Emergency_Line.json";
import bufferEmeData from "assets/json/PuYang_Emergency_Building.json";
import { Popup } from "react-map-gl";
import pathImg from "assets/images/path.png";
import depthImg from "assets/images/depth.png";
import arcImg from "assets/images/path4.png";
import residentImg from "assets/images/resident_color.png";
import hospitalImg from "assets/images/hospital_color.png";
import firecontrolImg from "assets/images/firecontrol_color.png";
import policeImg from "assets/images/police_color.png";
import weatherImg from "assets/images/weather_color.png";
import "./emergencyPopup.css";
import { changeMapboxLanguage } from "../../untils/MapUtils";

// Set your mapbox token here
const MAPBOX_TOKEN =
  "pk.eyJ1IjoieHl0Y3poIiwiYSI6ImNrOWNzZ3ZidDA3bnMzbGxteng1bWc0OWIifQ.QKsCoDJL6Qg8gjQkK3VCoQ"; // eslint-disable-line
var map;
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [114.9125, 35.986, 8000],
});
const pointLightRight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [115.1525, 35.806, 8000],
});

const emergencyPointLight = new PointLight({
  color: [255,255,0],
  intensity: 10.0,
  position: [115.033669,35.763893000000003,200]
});

const hospitalPointLight = new PointLight({
  color: [0,255,0],
  intensity: 0.2,
  position: [115.050518,35.760787999999998,1000]
});

// const directionalLight = new DirectionalLight({
//   color: [255, 0, 0],
//   position: []
// })

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLights: pointLight,
  pointLightRight,
});
const material = {
  ambient: 0.5, //环境
  diffuse: 0.6, //漫反射
  shininess: 8,
  specularColor: [60, 64, 70], //高光颜色
};

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  arcColor: [255, 78, 1],
  material,
  effects: [lightingEffect],
};
const scanColors = {
  Hospital: [0, 255, 0],
  Police: [30, 144, 255],
  Firecontrol: [0, 255, 255],
  Resident: [255, 0, 0],
  Weather: [255, 255, 0],
};
const scatterPointColors = {
  Hospital: [0, 255, 0],
  Police: [30, 144, 255],
  Firecontrol: [0, 255, 255],
  Resident: [255, 0, 0],
  Weather: [255, 255, 0],
};

const scanImgs = [
  hospitalImg,
  firecontrolImg,
  policeImg,
  hospitalImg,
  weatherImg,
  policeImg,
  residentImg,
];

const INITIAL_VIEW_STATE = {
  //濮阳中心坐标位置
  longitude: 115.036,
  latitude: 35.736,
  zoom: 13,
  pitch: 58,
  bearing: 60, //方位
};
const viewStates = [
  // 事故地点
  {
    longitude: 115.0304,
    latitude: 35.7128,
    zoom: 14,
    pitch: 55,
    bearing: 110,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 事故地点，俯瞰视角
  {
    longitude: 115.02607,
    latitude: 35.714062,
    zoom: 14,
    pitch: 0,
    bearing: 100,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县人民医院
  {
    longitude: 115.032,
    latitude: 35.7058,
    zoom: 15,
    pitch: 58,
    bearing: 10,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县消防大队
  {
    longitude: 115.03675266957364,
    latitude: 35.724014677616225,
    zoom: 15,
    pitch: 58,
    bearing: 260,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县公安局
  {
    longitude: 115.01207175600501,
    latitude: 35.706462793571056,
    zoom: 14.5,
    pitch: 40,
    bearing: 60,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳市人民医院
  {
    longitude: 115.03228,
    latitude: 35.747326,
    zoom: 13.7,
    pitch: 58,
    bearing: 120,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳市公安局
  {
    longitude: 115.01559322149822,
    latitude: 35.74715,
    zoom: 13.7,
    pitch: 58,
    bearing: 250,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  {
    //濮阳中心坐标位置
    longitude: 115.036,
    latitude: 35.736,
    zoom: 13,
    pitch: 58,
    bearing: 60, //方位
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
];
var index_viewState = 0;
export default class OneMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      opacity: 1,
      initViewState: INITIAL_VIEW_STATE,
    };
  }
  componentWillMount() {
    document.oncontextmenu = () => false;
    this.setState({
      cityData,
      buildData,
      roadData,
      countyData,
      arcData,
      pointEmeData,
      lineEmeData,
      bufferEmeData,
    });
  }
  //组件第一次渲染后调用
  componentDidMount() {
    // this._animate();
    setInterval(() => {
      if (index_viewState > viewStates.length - 1) {
        index_viewState = 0;
      }
      this.setState({ initViewState: viewStates[index_viewState] });
      index_viewState += 1;
    }, 10000);
  }
  //组件从DOM中移除之前调用
  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }

  _renderLayers() {
    const { theme = DEFAULT_THEME } = this.props;
    const baseLayers = [
      // 应急道路空中连线
      new ArcLayerExt({
        id: "arclayerext",
        data: this.state.arcData,
        getSourcePosition: (d) => d.from,
        getTargetPosition: (d) => d.to,
        getWidth: 3,
        getHeight: 1,
        image: arcImg,
        speed: 0.8,
      }),
      // new HeatmapLayer({
      //   id: 'heatmaplayer',
      //   data: this.state.bufferEmeData,
      //   intensity: 1.5,
      //   radiusPixels: 80,
      //   colorRange: [[1, 152, 189],
      //   [73, 227, 206],
      //   [216, 254, 181],
      //   [254, 237, 177],
      //   [254, 173, 84],
      //   [209, 55, 78]],
      //   getPosition: d => [d.geometry.x, d.geometry.y],
      //   getWeight: d => d.attributes.pNumber,
      // }),

      // 城市道路图层-path
      new PathLayer({
        id: "pathlayer",
        data: this.state.roadData,
        getPath: (d) => d.geometry.coordinates[0],
        getWidth: 4,
        getColor: theme.arcColor,
        opacity: 0.2,
      }),
      // 城市道路图层-样式
      new PolylineLayer({
        id: "path",
        data: this.state.roadData,
        getPath: (d) => d.geometry.coordinates[0],
        image: pathImg,
        getWidth: 4,
        speed: 1.2,
      }),

      // 城市应急点-圆圈
      new ScatterpointLayer({
        id: "pointone",
        data: this.state.pointEmeData,
        getPosition: (d) => [d.geometry.x, d.geometry.y],
        getLineWidth: 50,
        getRadius: 500,
        getLineColor: (d) => scatterPointColors[d.attributes.Type],
        speed: 1.0,
        stroked: true,
        filled: false,
      }),
      // 城市建筑图层
      new GeoJsonLayer({
        id: "building-layer",
        data: this.state.buildData,
        stroked: true,
        filled: true,
        extruded: true,
        lineWidthMinPixels: 2,
        elevationScale: 1,
        getElevation: (d) => d.properties.height,
        getFillColor: theme.buildingColor,
        material: theme.material,
        opacity: 0.6,
      }),
      // 城市行政区域图层
      // new GeoJsonLayer({
      //   id: "county-Layer",
      //   data: this.state.countyData,
      //   stroked: true,
      //   filled: false,
      //   extruded: false,
      //   lineWidthMinPixels: 2,
      //   getLineColor: [255, 255, 0],
      //   getLineWidth: 2,
      // }),
    ];
    // 城市应急点-球体
    this.state.pointEmeData.map((value, index) => {
      baseLayers.push(
        new ScanLayer({
          id: `pointEme${index + 1}`,
          data: [value],
          getPosition: (d) => [d.geometry.x, d.geometry.y],
          image: scanImgs[index],
          imageNoise: depthImg,
          getRadius: 500,
          speed: 0.3,
          getBlendColor: (d) => scanColors[d.attributes.Type],
        })
      );
    });
    return baseLayers;
  }
  _onLoad(e) {
    let box = document.getElementsByClassName('mapboxgl-map')[0].parentNode
    box.style.zIndex = '';
    map = e.target;
    changeMapboxLanguage(map);
  }

  render() {
    const {
      viewState,
      mapStyle = "mapbox://styles/mapbox/navigation-guidance-night-v4",
      theme = DEFAULT_THEME,
    } = this.props;

    return (
      <div style={{ zIndex: "1" }}>
        <DeckGL
          layers={this._renderLayers()}
          effects={theme.effects}
          initialViewState={this.state.initViewState} //{INITIAL_VIEW_STATE} //
          viewState={viewState}
          controller={true}
        >
          <StaticMap
            reuseMaps
            ref={(ref) => {
              this._map = ref && ref.getMap();
            }}
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onLoad={this._onLoad}
          >
            {
              <Fragment>
                {this.state.pointEmeData.map((value, index) => {
                  return (
                    <Popup
                      className={`emergency popupEmergency${index + 1}`}
                      longitude={value.geometry.x}
                      latitude={value.geometry.y}
                      altitude={1}
                      closeButton={false}
                      visible={true}
                      key={index}
                      dynamicPosition={false}
                    >
                      <div className="fontEmergency">
                        {value.attributes.Name}
                      </div>
                    </Popup>
                  );
                })}
              </Fragment>
            }
          </StaticMap>
        </DeckGL>
      </div>
    );
  }
}
