import { all } from "redux-saga/effects";
import genreSaga from "./genre/genreSaga";
import movieSaga from "./movie/movieSaga";
import personSaga from "./person/personSaga";

export default function* rootSaga() {
	yield all([genreSaga(), movieSaga(), personSaga()]);
}
