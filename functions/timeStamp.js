module.exports = (time) => {
	const timeParts = time.match(/(\d+)(d|h|m)/g);
	const timeValues = {
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

	const currentTime = new Date().getTime();
	const timeToAdd =
		timeValues.d * 24 * 60 * 60 * 1000 +
		timeValues.h * 60 * 60 * 1000 +
		timeValues.m * 60 * 1000;

	const newTimeStamp = currentTime + timeToAdd;

	return newTimeStamp;
};
