import { Select } from "antd";
import { Genre } from "app/model/genre";
import React, { ReactElement, useEffect, useState } from "react";

interface Props {
    genres: Genre[];
    initialValues: string[];
    onChange: (value) => void;
}
const { Option } = Select;
export default function SelectGenreForm({
	genres,
	initialValues,
	onChange,
}: Props): ReactElement {
	const handleChange = (value) => {
		console.log(value);
		setValues(value);
	};
	const [values, setValues] = useState<string[]>([]);


	useEffect(() => {
		console.log("initial values",initialValues);
		const GenreIDs = initialValues.map(genre=>{
			const index = genres.findIndex(e => e.genre_id_fake === genre);
			return genres[index]?.id || genre;

		});
		setValues(GenreIDs);
	}, [initialValues]);

	return (
		<div>
			<Select
				value={values}
				mode="tags"
				// style={{ width: "100%" }}
				placeholder="Tags Mode"
				onChange={handleChange}
			>
				{genres.map((genre) => (
					<Option value={genre.id} key={genre.id}>
						{genre.name}
					</Option>
				))}
			</Select>
		</div>
	);
}
