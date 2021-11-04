import React from "react";

import { Container, Header, Main, Footer, Cards } from "components";

const Home: React.FC = () => {
	return (
		<Container>
			<div>
				<Header />
				<Main />
				<Cards />
				<Footer />
			</div>
		</Container>
	);
};

export default Home;
