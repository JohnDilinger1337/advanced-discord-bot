/**
 * @file Sample ping command
 * @author JohnDilinger
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {(function(string=): (*|Knex<any, unknown[]>|undefined))|{}}
 */
const { getKnexConnection } = require("../../database/DBConnection");
module.exports = {
	name: "rollgiveaway",
	description: "Roll a giveaway",
	args: true,
	permissions: "Administrator",

	async execute(message, args) {
		const messageID = args[0];
		const winnersCount = args[1];
		const data = await getKnexConnection()
			.select()
			.from("GiveawayWinnersSelect");
		let winners = [];
		if (data.length > 0) {
			for (let i = 0; i < winnersCount; i++) {
				const random = Math.floor(Math.random() * data.length);
				let winner = data[random].Winner_DiscordID;
				if (!winners.includes(winner)) winners.push(winner);
				else i--; // Don't progress the loop if no winner is selected.
			}
			if (!winners.length < 1) {
				const id = await getKnexConnection()
					.select("Giveaway_ID")
					.from("GiveawayWinnersReward")
					.limit(1)
					.orderBy("Date", "desc");
				for (let i = 0; i < winners.length; i++) {
					console.log(winners.join());
					message.channel.send(
						`Random Selected winner ${i + 1}: <@${winners[i]}>`
					);
					await getKnexConnection()
						.table("GiveawayWinnersReward")
						.insert({
							Giveaway_ID: id.length > 0 ? id[0].Giveaway_ID + 1 : 1,
							Winner_DiscordID: winners[i],
						});
				}
				message.reply({
					content: "The giveaway has been successfully rolled.",
					ephemeral: true,
				});
			}
		} else {
			message.reply({
				content: "Failed to roll please try again!",
				ephemeral: true,
			});
		}
	},
};
