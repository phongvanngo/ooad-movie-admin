import { selectGenreList, selectGenreLoading, genreActions } from "app/redux/genre/genreSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import React, { ReactElement, useEffect, useState } from "react";
import { List, Avatar, Button, Skeleton } from "antd";
import { Input } from "antd";
import {
	PlusCircleOutlined,DeleteOutlined, EditOutlined 
} from "@ant-design/icons";
import { Genre } from "app/model/genre";
import ButtonItemDelete from "components/common/ButtonItemDelete";

interface GenreItem extends Genre {
	loading?:boolean;
}

const skeletonGenreList:GenreItem[] = [... new Array(5)].map(()=>({loading:true,id:"",name:""}));

export default function GenreList(): ReactElement {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectGenreLoading);
	const listGenreData = useAppSelector(selectGenreList);
	const [listGenres, setListGenres] = useState<GenreItem[]>(skeletonGenreList);
	const [initLoading, setInitLoading] = useState(true);
	console.log("int",listGenres);
	useEffect(() => {
		if (!loading) {
			setInitLoading(false);
		}
	}, [loading]);

	useEffect(() => {
		if (listGenreData.length > 0) {
			setListGenres(listGenreData);
		}
	}, [listGenreData]);
	
	useEffect(() => {
		dispatch(genreActions.fetchGenreList());
	}, []);

	const onLoadMore =() => {
		setListGenres([...listGenres,...skeletonGenreList]);
		dispatch(genreActions.fetchGenreListFromTheMovieDB());
	};

	const loadMore =
		!initLoading && !loading ? (
			<div
				style={{
					textAlign: "center",
					marginTop: 12,
					height: 32,
					lineHeight: "32px",
				}}
			>

				<Button  onClick={()=>{onLoadMore();}}>LOAD MORE</Button>
			</div>
		) : null;

	const Header= ():ReactElement => {
		return (
			<div className="w-full flex justify-between items-center">
				<div className="text-lg font-bold">
					GENRES
				</div>
				<div className="flex items-center">
					<Input.Search className="mr-2" placeholder="input search text" enterButton size="middle" loading={false} />
					<Button type="primary" icon={<PlusCircleOutlined />}>
						CREATE
					</Button>
				</div>
			</div>
		);
	}; 


	return (
		<div>
			<List
				header={<Header/>}
				className="list-genre"
				loading={initLoading}
				itemLayout="horizontal"
				dataSource={listGenres}
				loadMore={loadMore}
				renderItem={item =>
					 (
						<List.Item
							actions={[<Button key="delete-genre" type="ghost"  size="small" icon={<EditOutlined />} />, <ButtonItemDelete message="Are your sure ?" key="genre-item-delete" onDelete={()=>{console.log("delete");}}/>]}
						>
							<Skeleton avatar title={false} active loading={item.loading}>
								<List.Item.Meta
									title={item.name}
								/>
							</Skeleton>
						</List.Item>
					)
				}
			/>
		</div>
	);
}


