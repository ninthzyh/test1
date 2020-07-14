import { fromJS } from 'immutable';
const initialState = fromJS(
	{
		map: null,
		layers: ['baseMap'],
		markers: [],
		// test:'test'
	}
)

const changeMap = (state, action) => {
	return state.set("map", action.value)
}
const setLayer = (state, action) => {
	return state.set("layers", state.get("layers").push(action.value));
}
const addMarker = (state,action)=>{
	return state.set("markers", state.get("markers").push(action.value));
}

const removeLayer = (state, action) => {
	let layer = state.get("layers");
	let result = layer.filter((item) => {
		return item !== action.value;
	})
	return state.set("layers", result);
}
function indexReducer(state = initialState, action) {
	switch (action.type) {
		case 'CHANGE-MAP':
			return changeMap(state, action);
		case 'SET_LAYER':
			return setLayer(state, action);
		case 'REMOVE_LAYER':
			return removeLayer(state, action);
		case 'ADD_MARKER':
			return addMarker(state,action);
		default:
			return state;
	}
}


export default indexReducer