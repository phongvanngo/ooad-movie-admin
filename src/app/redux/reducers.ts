import { combineReducers, Dispatch } from "redux";

import counter from "app/redux/slices/counter";
import adminAuth from "./slices/adminAuth";

import { store } from "./store";

const rootReducer = combineReducers({ counter,adminAuth });

export type AppRootState = ReturnType<typeof store.getState>;

export type Thunk = (
    dispatch: Dispatch<any>,
    getState: () => AppRootState,
) => Promise<any>;


export default rootReducer;
