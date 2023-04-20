module.exports = (time) => {
	// Parse the input time string into an object with separate values for weeks, days, hours, and minutes
	const timeParts = time.match(/(\d+)(d|h|m)/g);
	if (!timeParts) {
		console.log("Test");
	}
	const timeValues = {
		w: 0,
		d: 0,
		h: 0,
		m: 0,
	};
	for (let i = 0; i < timeParts.length; i++) {
		const timePart = timeParts[i];
		const timeValue = parseInt(timePart.slice(0, -1));
		const timeUnit = timePart.slice(-1);
		timeValues[timeUnit] = timeValue;
	}

	// Construct the cron expression based on the input time
	let cronExpression = "";
	if (timeValues.m > 0) {
		cronExpression = `*/${timeValues.m} * * * *`;
	}
	if (timeValues.h > 0) {
		cronExpression = `${timeValues.m || 0} */${timeValues.h} * * *`;
	}
	if (timeValues.d > 0) {
		cronExpression = `${timeValues.m || 0} */${timeValues.h || 0} */${
			timeValues.d
		} * *`;
	}
	// Return the resulting cron expression
	return cronExpression;
};
