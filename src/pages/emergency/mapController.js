/* global window */
import React, { Component, Fragment } from "react";
// import {render} from 'react-dom';
import { StaticMap } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer, PathLayer } from "@deck.gl/layers";
import PolylineLayer from "components/polyline-layer/polyline-layer";
// import ArcLayerExt from 'components/arc-layer/arc-layer-ext';
import cityData from "assets/json/PuYang_City.geojson";
import roadData from "assets/json/PuYang_Roads.json";
import buildData from "assets/json/PuYang_Buildings.geojson";
import countyData from "assets/json/PuYang_County.geojson";
import arcData from "assets/json/PuYang_arc.json";
import ScanLayer from "components/scan-layer/scan-layer";
import ScatterpointLayer from "components/scatterpoint-layer/scatterpoint-layer";
import { HeatmapLayer, IconLayer } from "deck.gl";
import pointEmeData from "assets/json/PuYang_Emergency_Point.json";
import lineEmeData from "assets/json/PuYang_Emergency_Line.json";
import bufferEmeData from "assets/json/PuYang_Emergency_Building.json";
import { Popup } from "react-map-gl";
import pathImg from "assets/images/path.png";
import depthImg from "assets/images/depth.png";
import colorImg from "assets/images/color.png";
import residentImg from "assets/images/resident_color.png";
import hospitalImg from "assets/images/hospital_color.png";
import firecontrolImg from "assets/images/firecontrol_color.png";
import policeImg from "assets/images/police_color.png";
import weatherImg from "assets/images/weather_color.png";
import "./popup.css";

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
  ambient: 0.1, //环境
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
const scanImgs = {
  Resident: residentImg,
  Hospital: hospitalImg,
  Firecontrol: firecontrolImg,
  Police: policeImg,
  Weather: weatherImg,
};
const scanImgsTwo = [hospitalImg, firecontrolImg, policeImg, hospitalImg, weatherImg, policeImg, residentImg];
 
const INITIAL_VIEW_STATE = {
  //濮阳中心坐标位置
  longitude: 115.0336,
  latitude: 35.768,
  zoom: 13,
  pitch: 45,
  bearing: 0, //方位
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
        id: "pathEmergency",
        data: this.state.lineEmeData,
        getPath: (d) => d.geometry.paths[0],
        getWidth: 40,
        getColor: theme.arcColor,
        opacity: 0.2,
      }),
      new PolylineLayer({
        id: "lineEmergency",
        data: this.state.lineEmeData,
        getPath: (d) => d.geometry.paths[0],
        image: pathImg,
        getWidth: 80,
        speed: 2.2,
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
      new PathLayer({
        id: "pathlayer",
        data: this.state.roadData,
        getPath: (d) => d.geometry.coordinates[0],
        getWidth: 4,
        getColor: theme.arcColor,
        opacity: 0.2,
      }),
      new PolylineLayer({
        id: "path",
        data: this.state.roadData,
        getPath: (d) => d.geometry.coordinates[0],
        image: pathImg,
        getWidth: 4,
        speed: 1.2,
      }),
      new ScatterpointLayer({
        id: "pointone",
        data: this.state.pointEmeData,
        getPosition: (d) => [d.geometry.x, d.geometry.y],
        getLineWidth: 50,
        getRadius: 500,
        getLineColor: (d) => scatterPointColors[d.attributes.Type],
        speed: 5.0,
        // stroked: true,
        // filled: false
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
      
      this.state.pointEmeData.map((value, index) => {
        console.log(value)
        console.log(`pointEme${index + 1}`)
        console.log(scanImgsTwo[index])
        return (
          new ScanLayer({
            id: `pointEme${index + 1}`,
            data: value,
            getPosition: (d) => [d.geometry.x, d.geometry.y],
            image: scanImgsTwo[index],
            imageNoise: depthImg,
            getRadius: 500,
            speed: 8,
            getBlendColor: (d) => scanColors[d.attributes.Type],
          })
        )
      }),
      // new ScanLayer({
      //   id: "pointoneEme",
      //   data: this.state.pointEmeData,
      //   getPosition: (d) => [d.geometry.x, d.geometry.y],
      //   image: () =>this.state.pointEmeData((item)=> {
         
      //     switch (item.attributes.Type) {
      //       case "Police":
      //         return policeImg;
      //       case "Resident":
      //         return residentImg;
      //       case "Firecontrol":
      //         return firecontrolImg;
      //       case " Hospital":
      //         return hospitalImg;
      //       case "Weather":
      //         return weatherImg;
      //     }
      //   })
       
      //   ,
      //   imageNoise: depthImg,
      //   getRadius: 500,
      //   speed: 8,
      //   getBlendColor: (d) => scanColors[d.attributes.Type],
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

    console.dir(e);
    map = e.target;
    mapboxgl.setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.1/mapbox-gl-rtl-text.js"
    );
    map.addControl(
      new MapboxLanguage({
        defaultLanguage: "zh",
      })
    );
    // e.target.setLayoutProperty('country-label', 'text-field', [
    //   'get',
    //   'name_zh'
    //   ]);
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
          initialViewState={INITIAL_VIEW_STATE}
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
                      altitude={80}
                      closeButton={false}
                      visible={true}
                      key={index}
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
