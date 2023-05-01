const { getKnexConnection } = require("../../database/DBConnection");

module.exports = class {
	constructor(giveawayID, message, duration, winnersCout) {
		this.giveawayID = giveawayID;
		this.message = message;
		this.duration = duration;
		this.winnersCout = winnersCout;

		// Start the giveaway automatically when a new giveaway initialized
		this.start();
	}

	// Start the giveaway
	async start() {
		// Extract days, hours, and minutes from the duration string
		const days = this.duration.includes("d")
			? parseInt(this.duration.split("d")[0])
			: 0;
		const hours = this.duration.includes("h")
			? parseInt(this.duration.split("h")[0].split(" ").pop())
			: 0;
		const minutes = this.duration.includes("m")
			? parseInt(this.duration.split("m")[0].split(" ").pop())
			: 0;

		// Convert the duration to milliseconds
		const durationMs = ((days * 24 + hours) * 60 + minutes) * 60 * 1000;

		// Set the timeout for the calculated duration
		setTimeout(async () => {
			const winners = await getKnexConnection().raw(
				`exec OnGiveawaySelectWinners ${this.giveawayID}, ${this.winnersCout};`
			);

			console.log(winners);
		}, durationMs);

		console.log(`Started giveaway ${this.giveawayID}`);
	}

	// // Roll the giveaway
	roll() {
		console.log(`Rolled the giveaway ${this.giveawayID}`);
	}

	// Pause the giveaway
	pause() {
		console.log(`Paused the giveaway ${this.giveawayID}`);
	}
};
