// Separate module for timedMessages logic
module.exports = async (client) => {
	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */

	const timedMessages = client.timedMessages;

	// Execute timedMessage.execute() in parallel using Promise.all()
	await Promise.all(
		timedMessages.map(async (timedMessage) => {
			try {
				await timedMessage.execute(
					timedMessage.embed,
					timedMessage.cronJob,
					client
				);
			} catch (error) {
				// Handle errors from timedMessage.execute() appropriately
				console.error(`Error executing timedMessage: ${error.message}`);
			}
		})
	);
};
