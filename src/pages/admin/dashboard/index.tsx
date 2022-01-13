import {
	commentActions,
	selectCommentList,
	selectCommentLoading,
} from "app/redux/comment/commentSlice";
import {
	movieActions,
	selectMovieList,
	selectMovieLoading,
	selectTopRatingMovie,
} from "app/redux/movie/movieSlice";
import { orderActions, selectOrderList, selectOrderLoading } from "app/redux/order/orderSlice";
import { planActions, selectPlanListStatistic, selectPlanLoading } from "app/redux/plan/planSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { selectUserList, selectUserLoading, userActions } from "app/redux/user/userSlice";
import React, { ReactElement, useEffect } from "react";
import OrderAnalysis from "./Chart/OrderAnalysis";
import RevenueByPlan from "./Chart/RevenueByPlan";
import OverviewAnalysis from "./OverviewAnalysis";
import TopRatingMovie from "./TopRatingMovie";

export default function AdminDashboard(): ReactElement {
	const dispatch = useAppDispatch();

	const movies = useAppSelector(selectMovieList);
	const orders = useAppSelector(selectOrderList);
	const comments = useAppSelector(selectCommentList);
	const users = useAppSelector(selectUserList);
	const topRatingMovie = useAppSelector(selectTopRatingMovie);
	const planStatistic = useAppSelector(selectPlanListStatistic);
	const moviesLoading = useAppSelector(selectMovieLoading);
	const ordersLoading = useAppSelector(selectOrderLoading);
	const commentsLoading = useAppSelector(selectCommentLoading);
	const usersLoading = useAppSelector(selectUserLoading);
	const topRatingMovieLoading = useAppSelector(selectMovieLoading);
	const planStatisticLoading = useAppSelector(selectPlanLoading);

	useEffect(() => {
		dispatch(movieActions.fetchMovieList());
		dispatch(userActions.fetchUserList());
		dispatch(orderActions.fetchOrderList());
		dispatch(commentActions.fetchCommentList(undefined));
		dispatch(movieActions.fetchTopRatingMovie());
		dispatch(planActions.fetchPlanListStatistic());
	}, []);
	return (
		<div>
			<OverviewAnalysis
				movies={moviesLoading || movies.length}
				comments={commentsLoading || comments.length}
				users={usersLoading || users.length}
				orders={ordersLoading || orders.length}
			/>
			<TopRatingMovie movies={topRatingMovie} loading={topRatingMovieLoading}/>
			<RevenueByPlan loading={planStatisticLoading} planStatistic={planStatistic} />
			<OrderAnalysis loading={ordersLoading} orders={orders}/>
		</div>
	);
}
