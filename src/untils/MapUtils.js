
export const changeMapboxLanguage = (map)=>{
    map.getStyle().layers.forEach(layer => {
        if(layer.id.indexOf('label')>=0){
          map.setLayoutProperty(layer.id,'text-field',['get','name_zh']);
        }
      });
}