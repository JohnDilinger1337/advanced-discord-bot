const { getKnexConnection } = require("../database/DBConnection");
const { CronJob } = require("cron");

/**
 * @description Executes when client is ready (bot initialization).
 * @param {import('../typings').Client} client Main Application Client.
 */

async function sendNotifications(client) {
	try {
		const IDs = [];
		const data = await getKnexConnection().select().from("Notifier");
		for (const row of data) {
			const channel = await client.channels.fetch(row.ChannelID);
			await channel.send({ content: row.Message });
			console.log(
				`Successfully sent message to ${channel.name} (${channel.id})`
			);
			IDs.push(row.ID);
		}
		if (IDs.length > 0) {
			await getKnexConnection().delete().from("Notifier").whereIn("ID", IDs);
		}
	} catch (error) {
		console.error("An error occurred while processing notifications:", error);
	} finally {
		getKnexConnection().destroy();
	}
}

module.exports = async (client) => {
	// Run the function once on startup
	await sendNotifications(client);

	// Set up a cron job to run the function every 2 seconds
	const job = new CronJob("*/2 * * * * *", async () => {
		await sendNotifications(client);
	});
	job.start();
};
