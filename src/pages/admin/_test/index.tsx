import React, { ReactElement } from "react";



type MYICON = {
    title:string,
    MyIcon:()=> ReactElement;
}

const myicon : MYICON = {
	title:"hello",
	MyIcon : (): ReactElement =>
		(<div>hi</div>)
};


export default function Demo(): ReactElement {
	return (
		<div>
			<MenuItem title="" icon={<myicon.MyIcon />}/>
		</div>
	);
}


interface Props {
    icon: ReactElement;
    title: string;
}
function MenuItem({ icon, title }: Props): ReactElement {
	
	return <>
		{icon}
	</>;
}
