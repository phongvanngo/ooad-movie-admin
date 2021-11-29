import React from "react";

type Props = {
	children:JSX.Element[]
}
export const Container = ({ children }:Props):JSX.Element => {
	return <div className="min-h-screen flex flex-col">{children}</div>;
};
