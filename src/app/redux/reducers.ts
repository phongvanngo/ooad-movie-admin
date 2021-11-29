import { combineReducers } from "redux";

import counter from "app/redux/slices/counter";
import adminAuth from "./slices/adminAuth";

const rootReducer = combineReducers({ counter,adminAuth });



// export type Thunk = (
//     dispatch: Dispatch<any>,
//     getState: () => AppRootState,
// ) => Promise<any>;


export default rootReducer;
