import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { Person } from "app/model/person";
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
    initialValue?: Person;
    onSubmit: (person: Partial<Person>) => void;
}

export default function PersonForm({
	initialValue,
	onSubmit,
}: Props): ReactElement {
	const [form] = Form.useForm();

	const onFinish = (values: Partial<Person>) => {
		onSubmit({
			...values,
		});
	};

	useEffect(() => {
		console.log(initialValue);
		if (initialValue) {
			form.setFieldsValue({
				name: initialValue.name,
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
					label="Person Code"
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
