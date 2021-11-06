import React from "react";

import { Container, Header, Main, Footer, Cards } from "components";
import Pokemon from "components/examples/pokemon";


const Home: React.FC = () => {
	console.log("hello");
	return (
		<Container>
			<Pokemon />
			<Header />
			<Main />
			<Cards />
			<Footer />
		</Container>
	);
};

export default Home;
