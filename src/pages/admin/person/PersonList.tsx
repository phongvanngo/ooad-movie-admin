import {
	EditOutlined,
	EllipsisOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Image, Pagination, Skeleton } from "antd";
import movieDbApiConfig from "app/api/theMovieDBApi/config";
import { Person } from "app/model/person";
import { selectTablePagination } from "app/redux/person/personSlice";
import {
	personActions,
	selectPersonList,
	selectPersonLoading,
} from "app/redux/person/personSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { filterArrayBySearchTerm } from "app/utils/my-library";
import CustomButtonItemDelete from "components/common/CustomButtonItemDelete";
import PageLoader from "components/common/PageLoader";
import React, { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";

const { Meta } = Card;

interface Props {
    searchTerm: string;
}

export default function PersonList({ searchTerm }: Props): ReactElement {
	const dispatch = useAppDispatch();
	const persons = useAppSelector(selectPersonList);
	const pagination = useAppSelector(selectTablePagination);
	const loading = useAppSelector(selectPersonLoading);
	const navigate = useNavigate();

	const currentListPerson = filterArrayBySearchTerm(
		persons,
		searchTerm,
	) as Person[];

	console.log(pagination);

	useEffect(() => {
		dispatch(personActions.setEditingPerson(undefined));
		dispatch(personActions.fetchPersonListFromTheMovieDB(1));

		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			{loading ? <PageLoader /> : ""}
			<div className="flex flex-wrap gap-5">
				{persons.map((person) => {
					return (
						<Card
							key={person.id}
							hoverable
							style={{ width: 200 }}
							cover={
								<Image
									preview
									// height={100}
									src={movieDbApiConfig.originalImage(
										person.profile_path,
									)}
								/>
							}
							actions={[
								<CustomButtonItemDelete
									key="delete"
									message="Are you sure"
									onDelete={() => {
										dispatch(
											personActions.deletePersonSuccess(
												person.id,
											),
										);
									}}
								/>,
								<EditOutlined
									key="edit"
									onClick={() => {
										dispatch(personActions.setEditingPerson(person));
										navigate(
											`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.CAST}/${person.id}`,
										);
									}}
								/>,
								<EllipsisOutlined key="ellipsis" />,
							]}
						>
							<Skeleton loading={loading} avatar active>
								<Meta
									title={person.name}
									description={person.known_for_department}
								/>
							</Skeleton>
						</Card>
					);
				})}
			</div>
			<div className="mt-5 flex justify-end">
				<Pagination
					onChange={(current) => {
						window.scrollTo(0, 0);
						dispatch(
							personActions.fetchPersonListFromTheMovieDB(
								current,
							),
						);
					}}
					defaultCurrent={1}
					current={pagination?.current || 1}
					total={pagination?.total || 10}
				/>
			</div>
		</div>
	);
}
