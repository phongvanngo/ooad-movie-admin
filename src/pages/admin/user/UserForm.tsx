import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { User } from "app/model/User";
import { convertDateTimeForPostData } from "app/utils/my-library";
import { ReactElement, useEffect } from "react";

const { Option } = Select;

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};
const tailLayout = {
	wrapperCol: { offset: 4, span: 20 },
};

interface Props {
    initialValue?: User;
    onSubmit: (user: Partial<User>) => void;
}

export default function UserForm({
	initialValue,
	onSubmit,
}: Props): ReactElement {
	const [form] = Form.useForm();

	const onFinish = (values: Partial<User>) => {
		onSubmit({
			...values,});
	};

	useEffect(() => {
		console.log(initialValue);
		if (initialValue) {
			form.setFieldsValue({
				
			});
		}
	}, []);

	return (
		<div>
			<Form
				{...layout}
				form={form}
				name="control-hooks"
				onFinish={onFinish}
			>
				<Form.Item
					name="name"
					label="Name"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="description"
					label="Description"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="remaining_amount"
					label="Remaining Amount"
					rules={[{ required: true }]}
				>
					<InputNumber />
				</Form.Item>
				<Form.Item
					name="time_begin"
					label="Time Begin"
					rules={[{ required: true }]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
					name="time_end"
					label="Time End"
					rules={[{ required: true }]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
					name="code"
					label="User Code"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="value"
					label="Value (%)"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
                        Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
