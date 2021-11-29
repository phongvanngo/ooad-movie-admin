export function GenerateLine({ num }: { num: number }): JSX.Element {
	const res: Array<JSX.Element> = [];
	for (let i = 0; i < num; i++) {
		res.push(<br />);
	}
	return <div>{res}</div>;
}
