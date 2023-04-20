const cronExpression = require("./cronExpression");
const addTimeToDate = require("./addTimeToDate");
const { CronJob } = require("cron");

const time = addTimeToDate("2d 1h 10m");
console.log(time);
// try {
// 	const job = new CronJob(time, async () => {
// 		console.log("cron job");
// 	});
// 	job.start();
// 	console.log(`Scheduled`);
// } catch (error) {
// 	console.log(error);
// }
