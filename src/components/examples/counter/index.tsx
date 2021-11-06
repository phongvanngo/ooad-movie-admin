import React from "react";
import { useSelector } from "react-redux";

import { increase, decrease } from "app/redux/actions";
import { AppRootState } from "app/redux/reducers";
import { useAppDispatch } from "app/redux/store";

export default function Counter() {
	const dispatch = useAppDispatch();
	const count = useSelector(
		(state: AppRootState) => state.rootReducer.counter.count
	);

	return (
		<div>
			<div>
				<h2>Counter</h2>
				<button type="button" onClick={() => dispatch(increase())}>
          +
				</button>
				<span>{count}</span>
				<button type="button" onClick={() => dispatch(decrease())}>
          -
				</button>
			</div>
			<a href="https://react-redux.js.org/" target="_blank" rel="noreferrer">
        Go To Documentation
			</a>
		</div>
	);
}
