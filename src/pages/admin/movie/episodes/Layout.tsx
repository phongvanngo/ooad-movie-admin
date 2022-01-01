import { Button, Image, message } from "antd";
import { movieApi } from "app/api/movie";
import { MovieModel, MovieModelCamelCase } from "app/model/movie";
import React, { ReactElement, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import EpisodeList from "./EpisodeList";
import movieDbApiConfig from "app/api/theMovieDBApi/config";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
interface Props {
    movie?: string;
}

export default function EpisodeManagementLayout(): ReactElement {
	const { movieId } = useParams();
	const [movie, setMovie] = useState<MovieModelCamelCase>();
	const [selectedEpisodeId, setSelectedEpisodeId] = useState<string>();
	const navigate = useNavigate();
	async function getDetailMovie(id: string) {
		try {
			const response = await movieApi.getById(id);
			console.log(response);
			setMovie(response.data);
		} catch (error) {
			message.error("Đã có lỗi xảy ra");
		}
	}

	useEffect(() => {
		getDetailMovie(movieId);
	}, []);

	if (!movie)
		return (
			<div className="flex  content-center">
				<Spin />
			</div>
		);
	return (
		<div>
			<div className="flex">
				<div className="mr-5">
					<Image
						preview
						height={200}
						src={movieDbApiConfig.originalImage(movie.posterPath)}
					/>{" "}
				</div>
				<div>
					<h1 className="text-3xl">{movie.title}</h1>
					<p className="italic">List of episodes</p>
					<EpisodeList
						episodes={movie.episodes}
						handleSelectEpisode={(id) => {
							navigate(
								`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE}/${movie.id}/episode/${id}`,
							);
						}}
						selectedEpisodeId={selectedEpisodeId}
					/>
					<Button type="primary" icon={<PlusCircleOutlined />}>
                        New Epispde
					</Button>
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}

/* 

1. Flow 
    + click on button "episode management" -> change route
    + open list of episode page -> get api render list of episodes
    + click on episode -> change route detail episode, color the button


2. Api
    + get episodes of movie 
    + add episode
    + update episode
    + delete episode



3. Component
    1. Main Management Episode:  movie/id/episode
        render -> get Episodes -> states
        
        1. Episode Navigation

            1. Episode Add/ Edit

                1. Episode Form

4. Task
    - làm api
    - làm route từ manage movies dẫn đến episodes
    - render danh sách các episode trong episode management
    
    - setup router cho danh sách episode
    - set event đổ data form vào từng form nếu 

*/
