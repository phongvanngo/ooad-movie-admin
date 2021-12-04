import store from "app/redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import AppRoutes from "routes";
import "styles/global.scss";
// import "antd/dist/antd.css";
import "./i18n";


function App(): JSX.Element {
	console.log("hello");
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<div className="App">
					{/* <Home /> */}
					<AppRoutes />
				</div>
			</Provider>
		</QueryClientProvider>
	);
}

export default App;
