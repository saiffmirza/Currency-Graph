import { Button } from "@material-ui/core";
import { Fragment, useState, useEffect } from "react";
import { Graph } from "./Graph";
import axios from "axios";

export const FetchData = ({
	currency,
	startDate,
	endDate,
}: {
	currency: string;
	startDate: Date;
	endDate: Date;
}) => {
	// converting the dates to a form that is acceptable to the url
	let start = startDate.toISOString().substring(0, 10);
	let end = endDate.toISOString().substring(0, 10);

	const [data, setData] = useState([""]);
	const [dates, setDates] = useState([""]);
	const [usd, setUSD] = useState([""]);
	const [cad, setCAD] = useState([""]);
	const [eur, setEUR] = useState([""]);

	const getData = async () => {
		//getting data from the API
		try {
			const response = await axios.get(
				`https://api.exchangerate.host/timeseries?start_date=${start}&end_date=${end}&base=${currency}&symbols=USD,CAD,EUR`
			);
			setData(response.data.rates);
		} catch {}
	};

	useEffect(() => {
		const conversion = () => {
			//taking out usd, cad and eur values from the response and making respective arrays of them
			const recursiveSearch = (
				obj: { [x: string]: any },
				searchKey: string,
				results = []
			) => {
				const r = results;
				Object.keys(obj).forEach((key) => {
					const value: string[] = obj[key];
					if (key === searchKey && typeof value !== "object") {
						r.push(value);
					} else if (typeof value === "object") {
						recursiveSearch(value, searchKey, r);
					}
				});
				return r;
			};

			setUSD(recursiveSearch(data, "USD"));
			setCAD(recursiveSearch(data, "CAD"));
			setEUR(recursiveSearch(data, "EUR"));
		};
		conversion();

		const date = Object.keys(data); //array of the dates
		setDates(date);
	}, [data]);

	return (
		<Fragment>
			<Button
				onClick={getData}
				variant="contained"
				color="primary"
				style={{ display: "block", width: "100px", top: "20px" }}
			>
				Search
			</Button>
			<Graph dates={dates} usd={usd} cad={cad} eur={eur} currency={currency} />
		</Fragment>
	);
};
