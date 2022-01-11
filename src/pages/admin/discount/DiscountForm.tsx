import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { Discount } from "app/model/discount";
import moment from "moment";
import "moment/locale/zh-cn";
import locale from "antd/lib/locale/zh_CN";
import { convertDateTimeForPostData } from "app/utils/my-library";
import { ReactElement, useEffect, useState } from "react";
const { RangePicker } = DatePicker;
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
			time_begin:rangeValue[0].format("DD/MM/YYYY"),
			time_end:rangeValue[1].format("DD/MM/YYYY"),
		});
	};
	const [rangeValue, setRangeValue] = useState<[moment.Moment,moment.Moment]>();

	useEffect(() => {
		console.log(initialValue);
		if (initialValue) {
			console.log("fsfef",new Date(parseInt(initialValue.time_begin)));
			const time_begin = moment(new Date(initialValue.time_begin));
			const time_end = moment(new Date(initialValue.time_end));
			setRangeValue([time_begin,time_end]); 
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

	
	function onChange(value:[moment.Moment,moment.Moment], dateString:string[]) {
		console.log("Selected Time: ", value);
		console.log("Formatted Selected Time: ", dateString);
		setRangeValue(value);
	}


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
					label="Time"
					rules={[{ required: true }]}
				>
					{/* <DatePicker /> */}
					<RangePicker
						value={rangeValue}
						showTime={{ format: "HH:mm" }}
						format="DD/MM/YYYY"
						onChange={onChange}
					/>
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
