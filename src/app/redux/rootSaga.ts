import { all } from "redux-saga/effects";
import commentSaga from "./comment/commentSaga";
import discountSaga from "./discount/discountSaga";
import genreSaga from "./genre/genreSaga";
import movieSaga from "./movie/movieSaga";
import orderSaga from "./order/orderSaga";
import personSaga from "./person/personSaga";
import planSaga from "./plan/planSaga";
import userSaga from "./user/userSaga";

export default function* rootSaga() {
	yield all([genreSaga(), movieSaga(), personSaga(),discountSaga(),planSaga(),userSaga(),commentSaga(),orderSaga()]);
}
