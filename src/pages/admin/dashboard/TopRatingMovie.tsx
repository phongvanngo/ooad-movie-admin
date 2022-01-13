import { Spin } from "antd";
import movieDbApiConfig from "app/api/theMovieDBApi/config";
import { movie } from "app/api/theMovieDBApi/movie";
import { MovieModel } from "app/model/movie";
import React, { ReactElement } from "react";
import "./style.scss";
interface Props {
    movies: MovieModel[];
	loading:boolean
}

export default function TopRatingMovie({ movies,loading }: Props): ReactElement {
	console.log(movies);
	return (
		<div className="relative w-full mt-10">
			<h1
				className="text-2xl font-bold "
				style={{
					color: "#001529",
				}}
			>
                Top Rating Movies
			</h1>
			{loading ? <div className="w-full h-96 flex justify-center items-center">
				<Spin size="large" />
			</div>:
				<div className="grid grid-cols-2  gap-10">
					{movies

						.filter((movie) => movie.enabled)
						.slice(0, 5)
						.map((movie) => (
							<MovieItem key={movie.id} movie={movie} />
						))}
				</div>
			}
		</div>
	);
}

function MovieItem({ movie }: { movie: MovieModel }): ReactElement {
	return (
		<div className="movie_card">
			<div className="flex items-center p-5 shadow-lg hover:scale-125 scale-100 transition-transform duration-100 rounded-lg">
				<img
					width={100}
					src={movieDbApiConfig.originalImage(movie?.poster_path)}
					alt="Sunset in the mountains"
				/>
				<div className="flex-1">
					<div className="px-6 py-2">
						<div className="font-bold text-xl mb-1">
							{movie?.title}
						</div>
						<p className="text-gray-700 text-base">
							{movie?.original_title}
						</p>
					</div>
					<div className="px-6 pt-4 pb-2">
						{movie.genres.map((genre) => (
							<span
								key={genre.id}
								className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1"
							>
                                #{genre.name}
							</span>
						))}
					</div>
				</div>
				<div className="flex-end text-center">
					<div className="font-bold text-5xl pr-5">
						{movie?.vote_average.toFixed(1)}
					</div>
					<div className="text-gray-900">
						{movie?.vote_count} &nbsp; votes
					</div>
				</div>
			</div>
			{/* <div className="max-w-sm w-60 rounded overflow-hidden shadow-lg">
				<img
					className="w-full"
					src={movieDbApiConfig.originalImage(movie?.poster_path)}
					alt="Sunset in the mountains"
				/>
				<div className="px-6 py-2">
					<div className="font-bold text-xl mb-1">{movie.title}</div>
					<p className="text-gray-700 text-base">
						{movie.original_title}
					</p>
				</div>
				<div className="px-6 pt-4 pb-2">
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #Rating:&nbsp; {movie.vote_average}
					</span>
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #{movie.vote_count} votes
					</span>
				</div>
			</div> */}
		</div>
	);
}
