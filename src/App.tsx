import "./App.css";
import { Fragment } from "react";

import { Inputs } from "./components/Inputs";

export const App = () => {
	return (
		<Fragment>
			<header className="header">
				<h1>Exchange Rates</h1>
				<h2>upptic development work trail</h2>
			</header>

			<Inputs />
		</Fragment>
	);
};
