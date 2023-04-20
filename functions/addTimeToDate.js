const moment = require("moment-timezone");

module.exports = (timeStr) => {
	const timeArr = timeStr.split(" ");
	let duration = moment.duration();

	timeArr.forEach((time) => {
		const num = parseInt(time.slice(0, -1));
		const unit = time.slice(-1);

		switch (unit) {
			case "m":
				duration.add(num, "minutes");
				break;
			case "h":
				duration.add(num, "hours");
				break;
			case "d":
				duration.add(num, "days");
				break;
		}
	});

	const newDate = moment().add(duration);

	return newDate.tz("africa/cairo").format("MMMM Do YYYY, h:mm:ss a");
};
