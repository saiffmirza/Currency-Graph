import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Fragment } from "react";

export const Graph = ({
	dates,
	usd,
	cad,
	eur,
	currency,
}: {
	dates: string[];
	usd: string[];
	cad: string[];
	eur: string[];
	currency: string;
}) => {
	const arrayData = []; //creating an array of objects with the data we got from the API
	for (let i = 0; i < dates.length; i++) {
		arrayData.push({
			currency: currency,
			Date: dates[i],
			USD: usd[i],
			CAD: cad[i],
			EUR: eur[i],
		});
	}

	return (
		<Fragment>
			<LineChart
				width={800}
				height={400}
				data={arrayData}
				style={{ top: "50px" }}
			>
				<Line
					type="monotone"
					dataKey={currency !== "USD" ? "USD" : ""}
					stroke="#D1C6AD"
					strokeWidth={3}
				/>
				<Line
					type="monotone"
					dataKey={currency !== "CAD" ? "CAD" : ""}
					stroke="#A1869E"
					strokeWidth={3}
				/>
				<Line
					type="monotone"
					dataKey={currency !== "EUR" ? "EUR" : ""}
					stroke="#0B1D51"
					strokeWidth={3}
				/>
				<XAxis dataKey="Date" tickSize={5} ticks={dates}></XAxis>
				<YAxis
					tickSize={8}
					padding={{ top: 30, bottom: 30 }}
					domain={["dataMin", "dataMax"]}
					ticks={[0, 0.5, 1]}
				></YAxis>
				<Tooltip />
			</LineChart>
		</Fragment>
	);
};
