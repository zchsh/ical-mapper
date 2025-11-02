import * as ics from "ics";

const event = {
	start: [2018, 5, 30, 6, 30],
	duration: { hours: 6, minutes: 30 },
	title: "Bolder Boulder",
	description: "Annual 10-kilometer run in Boulder, Colorado",
	location: "Folsom Field, University of Colorado (finish line)",
	url: "http://www.bolderboulder.com/",
	geo: { lat: 40.0095, lon: 105.2669 },
	busyStatus: "BUSY",
	organizer: { name: "Admin", email: "Race@BolderBOULDER.com" },
};

ics.createEvent(event, (error, value) => {
	if (error) {
		console.log(error);
		return;
	}
	// Log out the ICS string
	console.log(value);
	// Base-64 encode the ICS string
	const base64string = btoa(value);
	console.log(base64string);
	const base64href = "data:text/calendar;base64," + base64string;
	console.log(base64href);

	const utf8href = "data:text/calendar;charset=utf8," + encodeURI(value);
	console.log(utf8href);
});
