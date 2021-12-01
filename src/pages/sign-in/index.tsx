import { AppRootState } from "app/redux/store";
import { signIn } from "app/redux/slices/adminAuthThunk";
import { ISignInPayload } from "app/redux/slices/adminAuthThunk/types";
import { useAppDispatch } from "app/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
function LoginPage():JSX.Element {
	const dispatch = useAppDispatch();
	const navigate = useNavigate(); 
	const location = useLocation();
	const isLoggedIn = useSelector(
		(state: AppRootState) => state.rootReducer.adminAuthThunk.isLoggedIn,
	);
	
	const state = location.state as { from: Location };
	const from = state ? state.from.pathname : "/";
	
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		
		const formData = new FormData(event.currentTarget);
		const username = formData.get("username") as string;
		dispatch(signIn({ username, password: "123" } as ISignInPayload,
			()=>{ 
				navigate(from, { replace: true });
			}
		));
		
	}
	useEffect(() => {
		if (isLoggedIn) {
			console.log("navigate", from);
			navigate(from, { replace: true });
		}
	}, []);
	console.log(isLoggedIn);
	
	return (
		<div>
			<p>You must log in to view the page at {from}</p>

			<form onSubmit={handleSubmit}>
				<label>
					Username: <input name="username" type="text" />
				</label>{" "}
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default LoginPage;