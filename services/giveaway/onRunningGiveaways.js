const { getKnexConnection } = require("../../database/DBConnection");
const Giveaway = require("../../lib/giveaway/giveaway");
module.exports = async (...giveaway) => {
	/**
	 * @description Executes when client is ready (bot initialization).
	 */

	try {
		const [giveawayID, message, duration, winnersCout] = giveaway;

		const initGiveaway = new Giveaway(
			giveawayID,
			message,
			duration,
			winnersCout
		);
		// console.log(initGiveaway);
	} catch (error) {
		console.error(error);
	}
};
