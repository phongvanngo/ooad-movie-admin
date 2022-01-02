import { Button, Form, Input, Tooltip } from "antd";
import React, { ReactElement, useState } from "react";
import {
	EditOutlined,
	VideoCameraOutlined,
	CheckOutlined,
	CloseOutlined,
} from "@ant-design/icons";

interface Props {
    currentValue: string;
    onSubmit: (data: string) => void;
}

export default function ToggleInput({
	currentValue,
	onSubmit,
}: Props): ReactElement {
	const onFinish = (value) => {
		onSubmit(value.name);
		setEditMode(false);
	};
	const [form] = Form.useForm();
	const [editMode, setEditMode] = useState<boolean>(false);

	React.useEffect(() => {
		if (currentValue) {
			form.setFieldsValue({
				name: currentValue,
			});
		}
	}, [currentValue]);

	if (editMode)
		return (
			<div className="flex">
				<div className="max-w-sm mr-2">
					<Form form={form} name="control-hooks" onFinish={onFinish}>
						<Form.Item name="name" rules={[{ required: true }]}>
							<Input />
						</Form.Item>
					</Form>
				</div>
				<Button
					onClick={() => {
						// dispatch(genreActions.setEditingGenre(genre));
						form.submit();
						setEditMode(false);
					}}
					key="oke"
					type="ghost"
					size="small"
					icon={<CheckOutlined />}
				/>
				<Button
					onClick={() => {
						// dispatch(genreActions.setEditingGenre(genre));
						setEditMode(false);
					}}
					key="cancel"
					type="ghost"
					size="small"
					icon={<CloseOutlined />}
				/>
			</div>
		);
	else
		return (
			<div className="flex">
				<p className="mr-2">{currentValue}</p>
				<Tooltip placement="topLeft" title="Edit Name">
					<Button
						onClick={() => {
							// dispatch(genreActions.setEditingGenre(genre));
							setEditMode(true);
						}}
						key="edit-name-episode"
						type="ghost"
						size="small"
						icon={<EditOutlined />}
					/>
				</Tooltip>
			</div>
		);
}
