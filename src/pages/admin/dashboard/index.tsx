import {
	commentActions,
	selectCommentList,
} from "app/redux/comment/commentSlice";
import { movieActions, selectMovieList } from "app/redux/movie/movieSlice";
import { orderActions, selectOrderList } from "app/redux/order/orderSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { selectUserList, userActions } from "app/redux/user/userSlice";
import React, { ReactElement, useEffect } from "react";
import OverviewAnalysis from "./OverviewAnalysis";

export default function AdminDashboard(): ReactElement {
	const dispatch = useAppDispatch();

	const movies = useAppSelector(selectMovieList);
	const orders = useAppSelector(selectOrderList);
	const comments = useAppSelector(selectCommentList);
	const users = useAppSelector(selectUserList);

	useEffect(() => {
		dispatch(movieActions.fetchMovieList());
		dispatch(userActions.fetchUserList());
		dispatch(orderActions.fetchOrderList());
		dispatch(commentActions.fetchCommentList(undefined));
	}, []);
	return (
		<div>
			<OverviewAnalysis
				movies={movies.length}
				comments={comments.length}
				users={users.length}
				orders={orders.length}
			/>
		</div>
	);
}
