import { AppRootState, useAppSelector } from "app/redux/store";
import { selectIsSigning, signIn } from "app/redux/slices/adminAuthThunk";
import { ISignInPayload } from "app/redux/slices/adminAuthThunk/types";
import { useAppDispatch } from "app/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Button, Checkbox, Form, Input } from "antd";
import { AuthRequestPayload } from "app/model/PayloadResponse";
import PageLoader from "components/common/PageLoader";

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

	useEffect(() => {
		if (isLoggedIn) {
			navigate(from, { replace: true });
		}
	}, []);

	return (
		<div>
			
			<div className="max-w-md p-5 mx-auto">
				<div className="shadow-sm p-5 bg-gray-200">
					<h1 className="font-bold text-center text-xl">
                        OOMOVIE ADMINPAGE
					</h1>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						// onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="Username"
							name="username"
							rules={[
								{
									required: true,
									message: "Please input your username!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							// name="remember"
							valuePropName="checked"
							wrapperCol={{ offset: 8, span: 16 }}
						>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button loading={loading} type="primary" htmlType="submit">
                                Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
