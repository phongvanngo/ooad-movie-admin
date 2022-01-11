import { AppRootState, useAppSelector } from "app/redux/store";
import { selectIsSigning, signIn } from "app/redux/slices/adminAuthThunk";
import { ISignInPayload } from "app/redux/slices/adminAuthThunk/types";
import { useAppDispatch } from "app/redux/store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import { AuthRequestPayload } from "app/model/PayloadResponse";
import PageLoader from "components/common/PageLoader";
import { MailFilled, LockFilled } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.scss";
const antIcon = (
	<LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
);
const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};
const tailLayout = {
	wrapperCol: { offset: 4, span: 20 },
};

function LoginPage(): JSX.Element {
	const [form] = Form.useForm();

	const onFinish = (values: AuthRequestPayload) => {
		// onSubmit(values);
		dispatch(
			signIn(values, () => {
				navigate(from, { replace: true });
			}),
		);
	};

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const loading = useAppSelector(selectIsSigning);
	const isLoggedIn = useSelector(
		(state: AppRootState) => state.rootReducer.adminAuthThunk.isLoggedIn,
	);

	const state = location.state as { from: Location };
	const from = state ? state.from.pathname : "/";

	// function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
	// 	event.preventDefault();

	// 	const formData = new FormData(event.currentTarget);
	// 	const username = formData.get("username") as string;
	// 	dispatch(signIn({ username, password: "123" } as ISignInPayload,
	// 		()=>{
	// 			navigate(from, { replace: true });
	// 		}
	// 	));
	// }

	function handleSubmit(e) {
		e.preventDefault();
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		const values = { username, password };
		dispatch(
			signIn(values, () => {
				navigate(from, { replace: true });
			}),
		);
	}

	const usernameRef = useRef(null);
	const passwordRef = useRef(null);

	useEffect(() => {
		if (isLoggedIn) {
			navigate(from, { replace: true });
		}
	}, []);

	return (
		<div
			style={{
				minWidth: "100vw",
				minHeight: "100vh",
				backgroundAttachment: "fixed",
				backgroundSize: "cover",
				backgroundImage: "url(/images/spiderman.jpg)",
			}}
		>
			<div
				style={{
					minWidth: "100vw",
					minHeight: "100vh",
					background:
                        "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7007003484987745) 82%, rgba(255,255,255,0.13487401796656162) 100%)",
				}}
				className="flex items-center"
			>
				<div className="max-w-md w-96 p-5 mx-auto ">
					<div className="w-full flex justify-center items-center mb-10">
						<img
							className="mr-2"
							width={30}
							src="/images/tmovie.png"
						/>
						<span className="font-extrabold text-lg text-white">
                            NightMovie
						</span>
					</div>
					<div
						style={{
							backgroundColor: "#0c0b10",
						}}
						className="shadow-sm p-5  text-white"
					>
						<div className="mb-14">
							<h1 className="font-bold text-left text-3xl text-white">
                                Login
								{/* <span className="ml-2 text-gray-700">
									For Admin
								</span> */}
							</h1>
							<span className="text-gray-700 font-bold text-md ">
                                Get login to access your account
							</span>
						</div>
						<form
							onSubmit={handleSubmit}
							className="text-black font-extrabold"
							style={{ color: "#6a6a6c" }}
						>
							<div
								className=" bg-opacity-80 p-5 flex items-center justify-start mb-10 font-extrabold"
								style={{
									backgroundColor: "#18181c",
								}}
							>
								<input
									autoComplete="false"
									required
									ref={usernameRef}
									style={{
										backgroundColor: "#18181c",
									}}
									className="appearance-none border-none font-extrabold"
									placeholder="Username"
								/>
								<MailFilled />
							</div>
							<div
								style={{ backgroundColor: "#18181c" }}
								className="  p-5 flex items-center justify-start mb-10"
							>
								<input
									autoComplete="false"
									ref={passwordRef}
									style={{ backgroundColor: "#18181c" }}
									className="  appearance-none border-none font-extrabold "
									placeholder="Password"
									type="password"
									required
								/>
								<LockFilled className="" />
							</div>
							<div className="w-full flex items-center ">
								<button
									type="submit"
									className="appearance-none border-none text-lg rounded-full w-full h-14 font-blod text-white font-bold uppercase mx-auto bg-red-500 hover:bg-red-900 transition-all duration-200"
								>
									{" "}
									{loading ? (
										<Spin
											size="small"
											indicator={antIcon}
										/>
									) : (
										"LOGIN"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
