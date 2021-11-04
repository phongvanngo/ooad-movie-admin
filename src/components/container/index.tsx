import React from "react";

type Props = {
	children:React.ReactElement
}
export const Container = ({ children }:Props):React.ReactElement => {
	return <div className="min-h-screen flex flex-col">{children}</div>;
};
