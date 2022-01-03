import { all } from "redux-saga/effects";
import discountSaga from "./discount/discountSaga";
import genreSaga from "./genre/genreSaga";
import movieSaga from "./movie/movieSaga";
import personSaga from "./person/personSaga";

export default function* rootSaga() {
	yield all([genreSaga(), movieSaga(), personSaga(),discountSaga()]);
}
