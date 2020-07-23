/* global window */
import React, { Component, Fragment } from "react";
import { StaticMap } from "react-map-gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { HeatmapLayer, IconLayer } from "deck.gl";
import DeckGL, { FlyToInterpolator } from "deck.gl";
import { GeoJsonLayer, PathLayer, ArcLayer } from "@deck.gl/layers";
import PolylineLayer from "components/polyline-layer/polyline-layer";
import ArcLayerExt from "components/arc-layer/arc-layer-ext";
import ScatterpointLayer from "components/scatterpoint-layer/scatterpoint-layer";
import { changeMapboxLanguage } from "../../untils/MapUtils";
import cityData from "assets/json/PuYang_City.geojson";
import roadData from "assets/json/PuYang_Roads.json";
import buildData from "assets/json/PuYang_Buildings.geojson";
import countyData from "assets/json/PuYang_County.geojson";
import arcData from "assets/json/PuYang_arc.json";
import targetPos from "assets/json/PuYang_TargetPositions.json";
import roadHeatmap from "assets/json/PuYang_Road_Points.json";
import governmentData from "../../assets/json/Puyang_Government.json";
import { Popup } from "react-map-gl";
import "./trafficPopup.css";
import pathImg from "assets/images/path.png";
import arcImg from "assets/images/path4.png";

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

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLights: pointLight,
  pointLightRight,
});
const material = {
  ambient: 0.1, //环境
  diffuse: 0.6, //漫反射
  shininess: 8,
  specularColor: [60, 64, 70], //高光颜色
};

const DEFAULT_THEME = {
  buildingColor: [74, 112, 139],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  arcColor: [255, 255, 255],
  pathColor: [255, 0, 0],
  material,
  effects: [lightingEffect],
};
const govPosition = [
  {
    x: 115.023,
    y: 35.713,
  },
];
const INITIAL_VIEW_STATE = {
  //濮阳县政府地理位置
  longitude: 115.023,
  latitude: 35.713,
  zoom: 15.5,
  pitch: 50,
  bearing: 0, //方位
};

const viewStates = [
  // 濮阳县整体视角
  {
    longitude: 115.021,
    latitude: 35.711,
    zoom: 13.5,
    pitch: 40,
    bearing: 40, //方位
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 交通拥堵-挥公大道"
  {
    longitude: 115.0165,
    latitude: 35.6985,
    zoom: 17,
    pitch: 40,
    bearing: 40, //方位
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县转场视角-1
  {
    longitude: 115.0262,
    latitude: 35.7109,
    zoom: 13.7,
    pitch: 40,
    bearing: 330,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 交通拥堵-红旗路
  {
    longitude: 115.028,
    latitude: 35.712,
    zoom: 17,
    pitch: 30,
    bearing: 270, //方位
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县转场视角-2
  {
    longitude: 115.0262,
    latitude: 35.7109,
    zoom: 13.7,
    pitch: 40,
    bearing: 330,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 追尾事故-铁丘路
  {
    longitude: 115.05,
    latitude: 35.72,
    zoom: 17,
    pitch: 50,
    bearing: 320, //方位
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县转场视角-3
  {
    longitude: 115.0292,
    latitude: 35.715,
    zoom: 13.7,
    pitch: 50,
    bearing: 230,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 交通拥堵-解放大道
  {
    longitude: 115.021,
    latitude: 35.73,
    zoom: 17,
    pitch: 44,
    bearing: 250, //方位
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县转场视角-4
  {
    longitude: 115.0242,
    latitude: 35.7138,
    zoom: 13.7,
    pitch: 45,
    bearing: 155,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 追尾事故-濮上南路
  {
    longitude: 114.999,
    latitude: 35.705,
    zoom: 17,
    pitch: 45,
    bearing: 330,
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
      targetPos,
      roadHeatmap,
      governmentData,
    });
  }
  //组件第一次渲染后调用
  componentDidMount() {
    document.oncontextmenu = () => false;
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
    const {
      // buildings = DATA_URL.BUILDINGS,
      // trips = DATA_URL.TRIPS,
      theme = DEFAULT_THEME,
    } = this.props;

    return [
      new PathLayer({
        id: "pathlayer",
        data: this.state.roadData,
        getPath: (d) => d.geometry.coordinates[0],
        getWidth: 5,
        getColor: theme.pathColor,
        opacity: 1.0,
      }),
      new PolylineLayer({
        id: "path",
        data: this.state.roadData,
        getPath: (d) => d.geometry.coordinates[0],
        image: pathImg,
        getWidth: 5,
        speed: 5,
      }),
      new ArcLayerExt({
        id: "arclayerext",
        data: this.state.arcData,
        getSourcePosition: (d) => d.from,
        getTargetPosition: (d) => d.to,
        getWidth: 3,
        image: arcImg,
        speed: 1.0,
      }),
      new HeatmapLayer({
        id: "heatmaplayer",
        data: this.state.roadHeatmap,
        intensity: 4,
        radiusPixels: 60,
        colorRange: [
          [49, 157, 62],
          [77, 185, 95],
          [255, 218, 110],
          [255, 179, 63],
          [255, 141, 46],
          [234, 85, 26],
          [227, 12, 12],
        ],
        opacity: 0.4,
        getPosition: (d) => [d.geometry.x, d.geometry.y],
        getWeight: (d) => {
          return Math.floor(Math.random() * (500 - 300 + 1) + 300);
        },
      }),
      // 濮阳县政府
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
      new ScatterpointLayer({
        data: this.state.targetPos,
        getRadius: 1500,
        getPosition: (d) => d.position,
        speed: 0.8,
        getColor: [255, 255, 0],
        getLineWidth: 40,
      }),
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
      new GeoJsonLayer({
        id: "county-Layer",
        data: this.state.countyData,
        stroked: true,
        filled: false,
        extruded: false,
        lineWidthMinPixels: 2,
        getLineColor: [255, 255, 0],
        getLineWidth: 2,
      }),
    ];
  }
  _onLoad(e) {
    let box = document.getElementsByClassName("mapboxgl-map")[0].parentNode;
    box.style.zIndex = "";
    map = e.target;
    console.log(map, 123);
    changeMapboxLanguage(map);
  }

  render() {
    const {
      viewState,
      mapStyle = "mapbox://styles/mapbox/navigation-preview-night-v4",
      theme = DEFAULT_THEME,
    } = this.props;
    const displayAccident = [
      {
        coor: [115.05, 35.72],
        road: "铁丘路",
        accident: "追尾事故",
        accidentTime: "(07-17 17:50)",
      },
      {
        coor: [114.999, 35.7055],
        road: "濮上南路",
        accident: "追尾事故",
        accidentTime: "(07-12 7:40)",
      },
    ];
    const displayCongestion = [
      {
        coor: [115.0205, 35.7298],
        road: "解放大道",
        accident: "交通拥堵",
        accidentTime: "(07-17 17:50)",
      },
      {
        coor: [115.028, 35.712],
        road: "红旗路",
        accident: "交通拥堵",
        accidentTime: "(07-13 8:20)",
      },
      {
        coor: [115.0165, 35.6985],
        road: "挥公大道",
        accident: "交通拥堵",
        accidentTime: "(07-12 7:40)",
      },
    ];
    return (
      <div style={{ zIndex: "1" }}>
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
            ref={(ref) => {
              this._map = ref && ref.getMap();
            }}
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onLoad={this._onLoad}
          >
            <Popup
              className={`traffic popupTrafficGov`}
              longitude={115.023}
              latitude={35.713}
              altitude={10}
              closeButton={false}
              dynamicPosition={true}
              sortByDepth={true}
            >
              <div className="fontTrafficGov">濮阳县政府</div>
            </Popup>
            {displayAccident.map((value, index) => {
              return (
                <Popup
                  className={`trafficAccident accidentPopup${index + 1}`}
                  longitude={value.coor[0]}
                  latitude={value.coor[1]}
                  altitude={0}
                  closeButton={false}
                  visible={true}
                  key={"accident" + index}
                  dynamicPosition={false}
                >
                  <div className="trafficAccident">
                    {value.accident}
                    <span className="accidentTime">{value.accidentTime}</span>
                  </div>
                  <div className="accidentRoad">{value.road}</div>
                </Popup>
              );
            })}
            {displayCongestion.map((value, index) => {
              return (
                <Popup
                  className={`trafficCongestion accidentPopup${index + 1}`}
                  longitude={value.coor[0]}
                  latitude={value.coor[1]}
                  altitude={0}
                  closeButton={false}
                  visible={true}
                  key={"congestion" + index}
                  dynamicPosition={false}
                >
                  <div className="trafficAccident">
                    {value.accident}
                    <span className="accidentTime">{value.accidentTime}</span>
                  </div>
                  <div className="accidentRoad">{value.road}</div>
                </Popup>
              );
            })}
          </StaticMap>
        </DeckGL>
      </div>
    );
  }
}
