import { Form, Input, Button, Select, Checkbox, Image } from "antd";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import movieDbApiConfig from "app/api/theMovieDBApi/config";
import { movie } from "app/api/theMovieDBApi/movie";
import { MovieModel, MovieModelCamelCase } from "app/model/movie";
import { converDate, getRandomInt } from "app/utils/my-library";
import { ReactElement, useEffect, useState } from "react";

const { Option } = Select;

const placeholder_image =
    "data:image/png;base64,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";

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};
const tailLayout = {
	wrapperCol: { offset: 4, span: 20 },
};

interface Props {
    initialValue?: MovieModel;
    onSubmit: (movie: Partial<MovieModel>) => void;
}

export default function MovieForm({
	initialValue,
	onSubmit,
}: Props): ReactElement {
	const [form] = Form.useForm();

	const onFinish = (values: Partial<MovieModel>) => {
		const movie = {
			// id:movieId+"",
			
			...values,
		
		};
		
		onSubmit(movie);
	};

	const [backdrop, setBackdrop] = useState<string>("error");
	const [poster, setPoster] = useState<string>("error");
	const [movieId, setMovieId] = useState<string>();

	useEffect(() => {
		if (initialValue) {
			form.setFieldsValue({
				id: initialValue.id as string,
				backdrop_path: initialValue.backdrop_path,
				title: initialValue.title,
				original_title: initialValue.original_title,
				overview: initialValue.overview.slice(0,1000),
				poster_path: initialValue.poster_path,
				release_date: converDate(initialValue.release_date),
				budget: initialValue.budget,
				homepage: initialValue.homepage,
				isTVSeries: initialValue.isTVSeries,
				adult: initialValue.adult,
			});
			setMovieId(initialValue.id);
			setPoster(movieDbApiConfig.originalImage(initialValue.poster_path));
			setBackdrop(
				movieDbApiConfig.originalImage(initialValue.backdrop_path),
			);
		}
	}, []);

	async function handleRandomValue() {
		const id: any = getRandomInt(50000);
		try {
			const res = await theMovieDBApi.movie.getById(id);
			const movie_detail: MovieModel = res as MovieModel;
			
			form.setFieldsValue({
				// id: movie_detail.id,
				backdrop_path: movie_detail.backdrop_path,
				title: movie_detail.title,
				original_title: movie_detail.original_title,
				overview: movie_detail.overview.slice(0, 1000),
				poster_path: movie_detail.poster_path,
				release_date: converDate(movie_detail.release_date),
				budget: movie_detail.budget,
				homepage: movie_detail.homepage,
				isTVSeries: false,
				adult: movie_detail.adult,
			});
			setMovieId(movie_detail.id);
			setPoster(movieDbApiConfig.originalImage(movie_detail.poster_path));
			setBackdrop(
				movieDbApiConfig.originalImage(movie_detail.backdrop_path),
			);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
			<Form.Item
				name="backdrop_path"
				label="Backdrop Image"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Image
					className="mt-5"
					width={200}
					src={backdrop}
					fallback={placeholder_image}
				/>
			</Form.Item>
			<Form.Item name="title" label="Title" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item
				name="original_title"
				label="Original Title"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="overview"
				label="Overview"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="poster_path"
				label="Poster"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Image
					className="mt-5"
					width={200}
					src={poster}
					fallback={placeholder_image}
				/>
			</Form.Item>
			<Form.Item
				name="release_date"
				label="Release Date"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="homepage"
				label="Homepage"
				rules={[{ required: false }]}
			>
				<Input />
			</Form.Item>
			<Form.Item name="adult" valuePropName="checked" {...tailLayout}>
				<Checkbox>Is Adult</Checkbox>
			</Form.Item>

			<Form.Item
				name="isTVSeries"
				valuePropName="checked"
				{...tailLayout}
			>
				<Checkbox>Is TV Series</Checkbox>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
                    Submit
				</Button>
			</Form.Item>
			<Button
				onClick={() => {
					handleRandomValue();
				}}
			>
                Random Movie
			</Button>
		</Form>
	);
}
