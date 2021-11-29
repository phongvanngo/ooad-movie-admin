import React from "react";

import { Container, Header, Main, Footer, Cards } from "components/_reference/";


const Home: React.FC = () => {
	console.log("hello");
	return (
		<Container>
			<Header />
			<Main />
			<Cards />
			<Footer />
		</Container>
	);
};

export default Home;
