import { Button, Checkbox, Form, Image, Input, Select } from "antd";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import movieDbApiConfig from "app/api/theMovieDBApi/config";
import { Genre } from "app/model/genre";
import { MovieModel } from "app/model/movie";
import { selectGenreList } from "app/redux/genre/genreSlice";
import { useAppSelector } from "app/redux/store";
import { converDate, getRandomInt } from "app/utils/my-library";
import moment from "moment";
import { ReactElement, useEffect, useState } from "react";
import SelectGenreForm from "./SelectGenreForm";

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

	const onFinish = (values: MovieModel) => {
		const movie = {
			genre_ids: selectedGenres,
			movie_id_fake: movieIdFake,
			// genres: movieGenres,
			...values,
		};
		console.log(movie);
		onSubmit(movie);
	};
	const [loading, setLoading] = useState<boolean>(false);
	const [backdrop, setBackdrop] = useState<string>("error");
	const [poster, setPoster] = useState<string>("error");
	const [videosOfMovie, setVideosOfMovie] = useState<string[]>([]);
	const [movieGenres, setMovieGenres] = useState<Genre[] | string[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [movieId, setMovieId] = useState<string>();
	const [movieIdFake, setMovieIdFake] = useState<string>();
	const genres = useAppSelector(selectGenreList);

	useEffect(() => {
		if (initialValue) {
			form.setFieldsValue({
				id: initialValue.id as string,
				backdrop_path: initialValue.backdrop_path,
				title: initialValue.title,
				original_title: initialValue.original_title,
				overview: initialValue.overview.slice(0, 1000),
				poster_path: initialValue.poster_path,
				release_date: moment(
					new Date(initialValue.release_date),
				).format("DD/MM/YYYY"),
				budget: initialValue.budget,
				homepage: initialValue.homepage,
				isTVSeries: initialValue.isTVSeries,
				adult: initialValue.adult,
			});
			setMovieId(initialValue.id);
			setMovieGenres(initialValue.genre_ids);
			setPoster(movieDbApiConfig.originalImage(initialValue.poster_path));
			// setMovieGenres(initialValue.genre_ids);
			setBackdrop(
				movieDbApiConfig.originalImage(initialValue.backdrop_path),
			);
		}
	}, []);

	async function handleRandomValue() {
		let found = false;
		while (!found) {
			const id: any = getRandomInt(50000);
			try {
				const res = await theMovieDBApi.movie.getMovieAndVideosById(id);
				console.log(res);
				const videos = res.videos;
				// const videos = await theMovieDBApi.movie.getVideosOfMovie(id);
				const newVideos = videos.map(
					(e) => "https://www.youtube.com/embed/" + e.key,
				);
				const movie_detail: MovieModel = res as MovieModel;
				console.log(movie_detail.backdrop_path, newVideos);
				if (!movie_detail.backdrop_path || !newVideos[0]) throw Error();
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
					trailer1: newVideos[0],
					trailer2: newVideos[1],
				});
				setMovieIdFake(movie_detail.id);
				setVideosOfMovie(newVideos);
				setMovieId(movie_detail.id);
				setPoster(
					movieDbApiConfig.originalImage(movie_detail.poster_path),
				);
				setBackdrop(
					movieDbApiConfig.originalImage(movie_detail.backdrop_path),
				);
				setLoading(false);
				setMovieGenres(movie_detail.genres);
				found = true;
				window.scrollTo(0, 0);
			} catch (error) {
				console.log(error);
			}
		}
	}

	console.log("gemres", movieGenres);
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
			<Form.Item {...tailLayout} label="Genres">
				<SelectGenreForm
					genres={genres}
					onChange={(values) => {
						console.log(values);
						setSelectedGenres(values);
					}}
					initialValues={movieGenres}
				/>
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
				name="trailer1"
				label="Trailer 1"
				rules={[{ required: false }]}
			>
				<Input />
			</Form.Item>
			<Form.Item {...tailLayout}>
				{videosOfMovie[0] ? (
					<iframe
						height={300}
						src={videosOfMovie[0]}
						title="description"
						width={500}
					/>
				) : (
					""
				)}
			</Form.Item>
			<Form.Item
				name="trailer2"
				label="Trailer 2"
				rules={[{ required: false }]}
			>
				<Input />
			</Form.Item>
			<Form.Item {...tailLayout}>
				{videosOfMovie[1] ? (
					<iframe
						height={300}
						src={videosOfMovie[1]}
						title="description"
						width={500}
					/>
				) : (
					""
				)}
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
				type="primary"
				loading={loading}
				onClick={() => {
					setLoading(true);
					handleRandomValue();
				}}
			>
                Random Movie
			</Button>
		</Form>
	);
}
