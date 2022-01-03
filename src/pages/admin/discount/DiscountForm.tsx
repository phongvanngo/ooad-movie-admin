import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { Discount } from "app/model/discount";
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
    initialValue?: Discount;
    onSubmit: (discount: Partial<Discount>) => void;
}

export default function DiscountForm({
	initialValue,
	onSubmit,
}: Props): ReactElement {
	const [form] = Form.useForm();

	const onFinish = (values: Partial<Discount>) => {
		onSubmit({
			...values,
			time_begin: convertDateTimeForPostData(values.time_begin),
			time_end: convertDateTimeForPostData(values.time_end),
		});
	};

	useEffect(() => {
		console.log(initialValue);
		if (initialValue) {
			console.log("fsfef",new Date(parseInt(initialValue.time_begin)));
			form.setFieldsValue({
				name: initialValue.name,
				description: initialValue.description,
				remaining_amount: initialValue.remaining_amount,
				// time_begin: new Date(parseInt(initialValue.time_begin)),
				// time_end: new Date(parseInt(initialValue.time_end)),
				code: initialValue.code,
				value: initialValue.value,
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
					label="Discount Code"
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
