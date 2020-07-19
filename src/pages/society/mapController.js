/* global window */
import React, { Component } from 'react';
// import {render} from 'react-dom';
import { StaticMap } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PathLayer } from '@deck.gl/layers';
import PolylineLayer from 'components/polyline-layer/polyline-layer';
// import ArcLayerExt from 'components/arc-layer/arc-layer-ext';
// import ScanLayer from 'components/scan-layer/scan-layer';
import cityData from 'assets/json/PuYang_City.geojson';
import roadData from 'assets/json/PuYang_Roads.json';
import buildData from 'assets/json/PuYang_Buildings.geojson';
import countyData from 'assets/json/PuYang_County.geojson';
import arcData from 'assets/json/PuYang_arc.json';
import { ColumnLayer, HexagonLayer } from 'deck.gl';
import medicalData from '../../assets/json/PuYang_medical.json';
import shoppingData from '../../assets/json/PuYang_Shopping.json';
import cateringData from '../../assets/json/PuYang_Catering.json';
import graduationData from '../../assets/json/PuYang_Graduation.json';
import { Popup } from 'react-map-gl';
import './societyPopup.css'

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
  longitude: 115.0461258,
  latitude: 35.77430715,
  zoom: 13.2,
  pitch: 45,
  bearing: 48//方位
};

export default class OneMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      opacity: 1,
      columnVisible: true,
      titleVisible: false
    };
  }
  componentWillMount() {
    document.oncontextmenu = () => false;
    this.setState({ cityData, buildData, roadData, countyData, arcData, medicalData, shoppingData, cateringData, graduationData });
  }
  //组件第一次渲染后调用
  componentDidMount() {
    setInterval(() => {
      this.setState({
        columnVisible: !this.state.columnVisible
       // columnVisible: true
      });
    }, 6000)

  }
  //组件从DOM中移除之前调用
  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }
  showTitle = () => {
    return (
      [
        this.showCateringTitle(),
        this.showGraduationTitle(),
        this.showShoppingTitle(),
        this.showMedicalTitle()
      ]
    )

  }
  showCateringTitle = () => {
    return (
      this.state.cateringData.map((value, index) => {
        return <Popup className={`societyCateringName popup${index + 1}`}
          longitude={value.coor[0]}
          latitude={value.coor[1]}
          altitude={1000}
          closeButton={false}
          visible={true}
          key={index}
          dynamicPosition={false}
        >
          <div className='societyNameWrapper'>{value.name}</div>
        </Popup>
      })
    )
  }
  showGraduationTitle = () => {
    return (
      this.state.graduationData.map((value, index) => {
        return <Popup className={`societyGraduationName popup${index + 1}`}
          longitude={value.coor[0]}
          latitude={value.coor[1]}
          altitude={1000}
          closeButton={false}
          visible={true}
          key={index}
          dynamicPosition={false}
        >
          <div className='societyNameWrapper'>{value.name}</div>
        </Popup>
      })
    )
  }
  showShoppingTitle = () => {
    return (
      this.state.shoppingData.map((value, index) => {
        return <Popup className={`societyShoppingName popup${index + 1}`}
          longitude={value.coor[0]}
          latitude={value.coor[1]}
          altitude={1000}
          closeButton={false}
          visible={true}
          key={index}
          dynamicPosition={false}
        >
          <div className='societyNameWrapper'>{value.name}</div>
        </Popup>
      })
    )
  }
  showMedicalTitle = () => {
    return (
      this.state.medicalData.map((value, index) => {
        return <Popup className={`societyMedicalName popup${index + 1}`}
          longitude={value.coor[0]}
          latitude={value.coor[1]}
          altitude={1000}
          closeButton={false}
          visible={true}
          key={index}
          dynamicPosition={false}
        >
          <div className='societyNameWrapper'>{value.name}</div>
        </Popup>
      })
    )
  }
  showContent = () => {
    return [
      this.showCateringContent(),
      this.showGraduationContent(),
      this.showShoppingContent(),
      this.showMedicalContent()
    ]
  }
  showCateringContent = () => {
    return (
      this.state.cateringData.map((value, index) => {
        return <Popup className={`societyCatering popup${index + 1}`}
          longitude={value.coor[0]}
          latitude={value.coor[1]}
          closeButton={false}
          visible={true}
          key={index}
          dynamicPosition={false}
        >
          <div className='societyTitle' >{value.name}</div>
          <div className='societyContent' >当日接待人数</div>
        </Popup>
      })
    )
  }
  showGraduationContent = () => {
    return (
      this.state.graduationData.map((value, index) => {
        return <Popup className={`societyGraduation popup${index + 1}`}
          longitude={value.coor[0]}
          latitude={value.coor[1]}
          closeButton={false}
          visible={true}
          key={index}
          dynamicPosition={false}
        >
          <div className='societyTitle' >{value.name}</div>
          <div className='societyContent' >全校师生 278人</div>
        </Popup>
      })
    )
  }
  showShoppingContent = () => {
    return (
      this.state.shoppingData.map((value, index) => {
        return <Popup className={`societyShopping popup${index + 1}`}
          longitude={value.coor[0]}
          latitude={value.coor[1]}
          closeButton={false}
          visible={true}
          key={index}
          dynamicPosition={false}
        >
          <div className='societyTitle' >{value.name}</div>
          <div className='societyContent' >当日接待 4178人</div>
        </Popup>
      })
    )
  }
  showMedicalContent = () => {
    return (
      this.state.medicalData.map((value, index) => {
        return <Popup className={`societyMedical popup${index + 1}`}
          longitude={value.coor[0]}
          latitude={value.coor[1]}
          closeButton={false}
          visible={true}
          key={index}
          dynamicPosition={false}
        >
          <div className='societyTitle' >{value.name}</div>
          <div className='societyContent' >当日接待 189人</div>
          <div className='societyContent' >重症病人 35人</div>
        </Popup>
      })
    )
  }
  _renderLayers() {
    const {
      theme = DEFAULT_THEME
    } = this.props;

    const columnLayers = [new ColumnLayer({
      id: 'puyang_medical',
      data: this.state.medicalData,
      diskResolution: 4,
      radius: 50,
      extruded: true,
      elevationScale: 5,
      intensity: 0.1,
      getPosition: d => d.coor,
      getFillColor: [55,232,122],
      getElevation: 240,
      transitions: {
        getElevation: {
          duration: 3000,
          onEnd: value => {
            this.setState({
              titleVisible: true
            })
          },
          onStart: value => {
            this.setState({
              titleVisible: false
            })
          },
          enter: () => [0]
        },
      },
    }),
    new ColumnLayer({
      id: 'puyang_graduation',
      data: this.state.graduationData,
      diskResolution: 4,
      radius: 50,
      extruded: true,
      elevationScale: 5,
      getPosition: d => d.coor,
      getFillColor: [100,231,255],
      getElevation: 240,
      transitions: {
        getElevation: {
          duration: 3000,
          enter: () => [0]
        },
      },
    }),

    new ColumnLayer({
      id: 'puyang_shopping',
      data: this.state.shoppingData,
      diskResolution: 4,
      radius: 50,
      extruded: true,
      elevationScale: 5,
      getPosition: d => d.coor,
      getFillColor: [255,149,97],
      getElevation: 240,
      transitions: {
        getElevation: {
          duration: 3000,
          enter: () => [0]
        },
      },
      pickable: true,
      onHover: ({ object }) => {
        console.log(object)
      }
    }),
      new ColumnLayer({
        id: 'puyang_catering',
        data: this.state.cateringData,
        diskResolution: 4,
        radius: 50,
        extruded: true,
        elevationScale: 5,
        getPosition: d => d.coor,
        getFillColor: [255,231,100],
        getElevation: 240,
        transitions: {
          getElevation: {
            duration: 3000,
            enter: () => [0]
          },
        },
        pickable: true,
        onHover: ({ object }) => {
          console.log(object)
        }
      })
    ]
    const baseLayers = [
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
        opacity: 0.6,
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
    ]

    if (this.state.columnVisible) {
      return baseLayers.concat(columnLayers)
    } else {
      return baseLayers
    }

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
            {
              this.state.columnVisible && this.state.titleVisible && this.showTitle()
            }
            {
              !this.state.columnVisible && this.showContent()
            }
          </StaticMap>
        </DeckGL>

      </div>
    );
  }
}
