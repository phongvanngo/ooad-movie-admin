import { combineReducers } from "redux";

import counter from "app/redux/slices/counter";
import adminAuthThunk from "./slices/adminAuthThunk";
import adminAuth from "./adminAuth/slice";
import movie from "./movie/movieSlice";
import genre from "./genre/genreSlice";
const rootReducer = combineReducers({ 
	counter,
	adminAuthThunk, 
	adminAuth,
	movie,
	genre
});



// export type Thunk = (
//     dispatch: Dispatch<any>,
//     getState: () => AppRootState,
// ) => Promise<any>;


export default rootReducer;
