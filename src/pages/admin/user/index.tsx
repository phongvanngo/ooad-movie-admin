import { Form, Input } from "antd";
import { debounce } from "lodash";
import React, { ReactElement, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";

export default function UserManagementPage(): ReactElement {
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
				<div className="text-lg font-bold">USERS</div>
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
				
				</div>
			</div>
		);
	};

	return (
		<div>
			<Header />
			<UserTable searchTerm={keyword} />
		</div>
	);
}
