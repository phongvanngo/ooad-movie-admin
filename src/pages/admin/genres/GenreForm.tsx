import { Form, Input, Button, Select } from "antd";
import { genreApi } from "app/api/genres";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import { TheMovieDB_GenrePayload } from "app/api/theMovieDBApi/genre";
import { Genre } from "app/model/genre";
import { DataResponse } from "app/model/PayloadResponse";
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
    initialValue?: Genre;
    onSubmit: (genre: Partial<Genre>) => void;
}

export default function GenreForm({
	initialValue,
	onSubmit,
}: Props): ReactElement {
	const [form] = Form.useForm();

	const onFinish = (values: Partial<Genre>) => {
		onSubmit({...values,genre_id_fake:"new"});
	};

	useEffect(() => {
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
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
                        Submit
					</Button>
				</Form.Item>
			</Form>
			<Button
				className=""
				type="link"
				onClick={async () => {
					const genres_1: TheMovieDB_GenrePayload =
                        await theMovieDBApi.genre.getAll();
					const genres_2: TheMovieDB_GenrePayload =
                        await theMovieDBApi.genre.getAllTVGenres();
					const genres = [...genres_1.genres, ...genres_2.genres];
					genres.forEach((genre) => {
						const newGenre: Partial<Genre> = {
							genre_id_fake: genre.id,
							name: genre.name,
						};
						const response = genreApi.add(newGenre);
					});
				}}
			>
				Random
			</Button>
		</div>
	);
}
