import { Form, Input, Button, Select } from "antd";
import { Genre } from "app/model/genre";
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
	initialValue?:Genre
	onSubmit: (genre: Partial<Genre>)=>void
}

export default function GenreForm({initialValue,onSubmit}:Props):ReactElement  {
	const [form] = Form.useForm();

	const onFinish = (values: Partial<Genre>) => {
		onSubmit(values);
	};

	useEffect(() => {
		if(initialValue) {
			form.setFieldsValue({
				name:initialValue.name
			});
		}
	}, []);

	return (
		<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
			<Form.Item name="name" label="Name" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
                    Submit
				</Button>
			</Form.Item>
		</Form>
	);
};