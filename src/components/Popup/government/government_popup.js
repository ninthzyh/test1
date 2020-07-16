import governmentData from '../../../assets/json/Puyang_Government.json'

export const ShowGovernmentIcon = (parameters) => {
  parameters.map.loadImage( 'http://localhost:3000/img/affairs/canyin.png', (error, image) => {
    alert('123');
    parameters.map.addImage('traffic', image);
    parameters.map.addSource('traffic-source', {
        "type": 'geojson',
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {
                    "name": 'test'
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [115.705,35.705]
                }
            }]
        }
    });
    parameters.map.addLayer({
        "id": "traffic-layer",
        "type": "symbol",
        "source": "traffic-source",
        "layout": {
            "icon-image": 'traffic',
            "icon-size": 130,
            "icon-offset": [0, 0]
        }
    });
});
}