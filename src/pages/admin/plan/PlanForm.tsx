import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { Plan } from "app/model/plan";
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
		console.log(values);
	};

	useEffect(() => {
		console.log(initialValue);
		if (initialValue) {
			form.setFieldsValue({
				price: initialValue.price,
				title: initialValue.title,
				descriptions: [
					{ entry: "novapo", content: "sfelfkjselkjf" },
					{ entry: "novapo", content: "sfelfkjselkjf" },
					{ entry: "novapo", content: "sfelfkjselkjf" },
					{ entry: "novapo", content: "sfelfkjselkjf" },
			
				],
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
				<Row>
					<Col span={4}>
						<div className="text-right">Descriptons: &nbsp;</div>
					</Col>
					<Col span={20}>
						<Form.List name="descriptions">
							{(fields, { add, remove }) => (
								<>
									{fields.map(
										({ key, name, ...restField }) => (
											<div
												key={key}
												className="flex items-center"
											>
												<div className="flex-1">
													<Row>
														<Col span={8}>
															<div>
																<Form.Item
																	{...restField}
																	className="mb-0"
																	name={[
																		name,
																		"entry",
																	]}
																	rules={[
																		{
																			required:
                                                                                true,
																			message:
                                                                                "Missing Entry ",
																		},
																	]}
																>
																	<Input placeholder="Entry" />
																</Form.Item>
															</div>
														</Col>
														<Col span={16}>
															<Form.Item
																className="mb-0"
																{...restField}
																name={[
																	name,
																	"content",
																]}
																rules={[
																	{
																		required:
                                                                            true,
																		message:
                                                                            "Missing content",
																	},
																]}
															>
																<Input.TextArea placeholder="Content" />
															</Form.Item>
														</Col>
													</Row>
												</div>
												<MinusCircleOutlined
													style={{
														marginBottom: "24px",
													}}
													className="flex items-center"
													onClick={() => remove(name)}
												/>
											</div>
										),
									)}
									<Form.Item>
										<Button
											type="dashed"
											onClick={() => add()}
											block
											icon={<PlusOutlined />}
										>
                                            Add field
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
					</Col>
				</Row>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
                        Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
