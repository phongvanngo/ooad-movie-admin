import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { debounce } from "lodash";
import React, { ReactElement, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import MovieTable from "./MovieTable";

export default function MovieManagementPage(): ReactElement {
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState<string>();
	const debouceSearch = useCallback(
		debounce((nextValue) => setKeyword(nextValue), 1000),
		[],
	);

	const [form] = Form.useForm();
	const Header = (): ReactElement => {
		return (
			<div className="w-full flex justify-between items-center mb-5">
				<div className="text-lg font-bold">MOVIES</div>
				<div className="flex items-center">
					<Form form={form}>
						<Form.Item noStyle name="searchKeyword">
							<Input.Search
								onChange={(e) => {
									console.log(e.target.value);
									debouceSearch(e.target.value);
								}}
								className="mr-2"
								placeholder="input search text"
								enterButton
								size="middle"
								loading={false}
							/>
						</Form.Item>
					</Form>

					<Button
						type="primary"
						className="ml-2"
						onClick={() => {
							console.log("hi");
							navigate(
								`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE_CREATE}`,
							);
						}}
						icon={<PlusCircleOutlined />}
					>
                        CREATE
					</Button>
				</div>
			</div>
		);
	};

	return (
		<div>
			<Header />
			<MovieTable searchTerm={keyword}/>
		</div>
	);
}
