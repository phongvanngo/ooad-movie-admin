import { adminAuthSaga } from "./saga/adminAuthSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
	yield all([adminAuthSaga()]);
}
