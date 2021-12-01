import { all } from "redux-saga/effects";
import genreSaga from "./genre/genreSaga";

export default function* rootSaga() {
	yield all([genreSaga()]);
}
