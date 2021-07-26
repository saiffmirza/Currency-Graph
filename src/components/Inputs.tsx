import { Fragment, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
	createStyles,
	makeStyles,
	Theme,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	createTheme,
	ThemeProvider,
} from "@material-ui/core";

import { FetchData } from "./FetchData";

const theme = createTheme({
	palette: {
		primary: {
			main: "#51355A",
		},
		secondary: {
			main: "#9E2B25",
		},
	},
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			position: "relative",
			margin: "20px",
		},
	})
);

export const Inputs = () => {
	const classes = useStyles();

	const [startDate, setStartDate] = useState<Date | null>(null);
	const handleStartDateChange = (date: Date | null) => {
		setStartDate(date);
	};

	const [endDate, setEndDate] = useState<Date | null>(null);
	const handleEndDateChange = (date: Date | null) => {
		setEndDate(date);
	};

	const [currency, setCurrency] = useState("");
	const handleCurrencyChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setCurrency(event.target.value as string);
	};

	return (
		<Fragment>
			<ThemeProvider theme={theme}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<FormControl className={classes.formControl}>
						<div style={{ display: "block" }}>
							<InputLabel
								id="currencyLabel"
								style={{ position: "relative", top: "15px" }}
							>
								Currency
							</InputLabel>
							<Select
								defaultValue="Currency"
								value={currency}
								onChange={handleCurrencyChange}
								displayEmpty
								style={{ width: "150px" }}
							>
								<MenuItem value={"USD"}>USD</MenuItem>
								<MenuItem value={"CAD"}>CAD</MenuItem>
								<MenuItem value={"EUR"}>EUR</MenuItem>
							</Select>
						</div>
						<br />
						<section style={{ display: "block" }}>
							<DatePicker
								label="Start Date"
								format="yyyy-MM-dd"
								value={startDate}
								onChange={handleStartDateChange}
								disableFuture
								maxDate={endDate}
							/>
							<DatePicker
								label="End Date"
								format="yyyy-MM-dd"
								value={endDate}
								onChange={handleEndDateChange}
								minDate={startDate}
								maxDate={new Date()}
							/>
						</section>
						<FetchData
							currency={currency}
							startDate={startDate !== null ? startDate : new Date()}
							endDate={endDate !== null ? endDate : new Date()}
						/>
					</FormControl>
				</MuiPickersUtilsProvider>
			</ThemeProvider>
		</Fragment>
	);
};
