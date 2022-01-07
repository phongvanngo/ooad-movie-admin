import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { debounce } from "lodash";
import React, { ReactElement, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import PersonList from "./PersonList";

export default function PersonManagementPage(): ReactElement {
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState<string>();
	const debouceSearch = useCallback(
		debounce((nextValue) => setKeyword(nextValue), 100),
		[],
	);

	const [form] = Form.useForm();
	const Header = (): ReactElement => {
		return (
			<div className="w-full flex justify-between items-center mb-5">
				<div className="text-lg font-bold">CASTS</div>
				<div className="flex items-center">
					<Form form={form}>
						<Form.Item noStyle name="searchKeyword">
							<Input.Search
								onChange={(e) => {
									debouceSearch(e.target.value);
								}}
								className="mr-2"
								placeholder="input search text"
								enterButton
								autoFocus
								size="middle"
								loading={false}
							/>
						</Form.Item>
					</Form>

					<Button
						type="primary"
						className="ml-2"
						onClick={() => {
							navigate(
								`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DISCOUNT_CREATE}`, 
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
			<PersonList searchTerm={keyword} />
		</div>
	);
}
