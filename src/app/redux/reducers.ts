import { combineReducers } from "redux";

import counter from "app/redux/slices/counter";
import adminAuthThunk from "./slices/adminAuthThunk";
import adminAuth from "./adminAuth/slice";
import movie from "./movie/movieSlice";
import genre from "./genre/genreSlice";
import person from "./person/personSlice";
import discount from "./discount/discountSlice";
import plan from "./plan/planSlice";
import user from "./user/userSlice";
import comment from "./comment/commentSlice";
const rootReducer = combineReducers({
	counter,
	adminAuthThunk,
	adminAuth,
	movie,
	genre,
	person,
	discount,
	plan,
	user,
	comment

});



// export type Thunk = (
//     dispatch: Dispatch<any>,
//     getState: () => AppRootState,
// ) => Promise<any>;


export default rootReducer;
