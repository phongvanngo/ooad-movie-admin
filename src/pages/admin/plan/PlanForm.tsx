import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { Plan } from "app/model/plan";
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
    initialValue?: Plan;
    onSubmit: (plan: Partial<Plan>) => void;
}

export default function PlanForm({
	initialValue,
	onSubmit,
}: Props): ReactElement {
	const [form] = Form.useForm();

	const onFinish = (values: Partial<Plan>) => {
		onSubmit({
			...values,
		});
	};

	useEffect(() => {
		console.log(initialValue);
		if (initialValue) {
			form.setFieldsValue({
				price: initialValue.price,
				title: initialValue.title,
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
					name="title"
					label="Title"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="price"
					label="Price"
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
