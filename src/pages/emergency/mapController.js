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
import medicalData from "assets/json/PuYang_medical.json";
import policeData from "assets/json/Puyang_Police.json";
import policeIcon from "img/emergency/police.png";
import medicalIcon from "img/emergency/hospital.png";

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
  color: [255, 255, 0],
  intensity: 10.0,
  position: [115.033669, 35.763893000000003, 200],
});

const hospitalPointLight = new PointLight({
  color: [0, 255, 0],
  intensity: 0.2,
  position: [115.050518, 35.760787999999998, 1000],
});

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

const govPosition = [
  {
    x: 115.023,
    y: 35.713,
  },
];

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
  weatherImg,
  residentImg,
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
  // 濮阳县视角-事故地点
  {
    longitude: 115.0304,
    latitude: 35.7118,
    zoom: 14,
    pitch: 55,
    bearing: 110,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县视角-事故地点-俯瞰视角
  {
    longitude: 115.02927,
    latitude: 35.7118,
    zoom: 13.8,
    pitch: 0,
    bearing: 100,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县事故地点
  {
    longitude: 115.01846156785787,
    latitude: 35.722862130110052,
    zoom: 14.5,
    pitch: 45,
    bearing: 140,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县公安局
  {
    longitude: 115.01527175600501,
    latitude: 35.707862793571056,
    zoom: 14.7,
    pitch: 50,
    bearing: 60,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县人民医院
  {
    longitude: 115.019,
    latitude: 35.711,
    zoom: 14,
    pitch: 58,
    bearing: 290,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  // 濮阳县消防大队
  {
    longitude: 115.0289266957364,
    latitude: 35.726014677616225,
    zoom: 14.7,
    pitch: 58,
    bearing: 330,
    transitionDuration: 5000,
    transitionInterpolator: new FlyToInterpolator(),
  },

  {
    //濮阳县视角
    longitude: 115.026,
    latitude: 35.718,
    zoom: 13.5,
    pitch: 55,
    bearing: 10, //方位
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
      medicalData,
      policeData,
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
      new IconLayer({
        id: "medical_icon",
        data: this.state.medicalData,
        iconMapping: {
          marker: { x: 0, y: 0, width: 35, height: 48, mask: false },
        },
        iconAtlas: medicalIcon,
        sizeScale: 4,
        getIcon: (d) => "marker",
        getPosition: (d) => [d.coor[0], d.coor[1], 80],
        getSize: (d) => {
          return 10;
        },
      }),

      new IconLayer({
        id: "police_icon",
        data: this.state.policeData,
        iconMapping: {
          marker: { x: 0, y: 0, width: 35, height: 48, mask: false },
        },
        iconAtlas: policeIcon,
        sizeScale: 3,
        getIcon: (d) => "marker",
        getPosition: (d) => [d.coor[0], d.coor[1], 80],
        getSize: (d) => {
          return 10;
        },
      }),
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
        getLineWidth: 30,
        getRadius: 300,
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
          getRadius: 300,
          speed: 0.3,
          getBlendColor: (d) => scanColors[d.attributes.Type],
        })
      );
    });
    return baseLayers;
  }
  _onLoad(e) {
    let box = document.getElementsByClassName("mapboxgl-map")[0].parentNode;
    box.style.zIndex = "";
    map = e.target;
    changeMapboxLanguage(map);
  }

  render() {
    let size = 40;
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
              className={`emergency popupEmergencyGov`}
              longitude={115.023}
              latitude={35.713}
              altitude={10}
              closeButton={false}
              dynamicPosition={false}
              sortByDepth={true}
            >
              <div className="fontEmergencyGov">濮阳县政府</div>
            </Popup>

            {
              this.state.pointEmeData.map((value, index) => {
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
              })
            }
            {
              this.state.medicalData.map((value, index) => {
                return <Popup className={`societyMedicalName popup${index + 1}`}
                  longitude={value.coor[0]}
                  latitude={value.coor[1]}
                  altitude={100}
                  closeButton={false}
                  visible={true}
                  key={index}
                  dynamicPosition={false}
                >
                  <div className='societyNameWrapper'>{value.name}</div>
                </Popup>
              })
            }
          </StaticMap>
        </DeckGL>
      </div>
    );
  }
}
