
export const changeMapboxLanguage = (map)=>{
    map.getStyle().layers.forEach(layer => {
        if(layer.id.search('label')>=0){
          console.log(layer.id);
          map.setLayoutProperty(layer.id,'text-field',['get','name_zh']);
        }
      });
}