
export const changeMap = (map) => ({
    type: "CHANGE-MAP",
    value: map
});

export const setLayer = (layerId) => ({
    type: "SET_LAYER",
    value: layerId
});

export const removeLayer = (layerId) => ({
    type: "REMOVE_LAYER",
    value: layerId
});
export const addMarker = (marker) => ({
    type: 'ADD_MARKER',
    value: marker
})