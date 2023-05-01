const { getKnexConnection } = require("../database/DBConnection");
const { buildEmbed } = require("../functions");

module.exports = async (client) => {
	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client - The main application client.
	 */

	const grindingRaceEmbed = {
		title: "**Grinding Race**",
		message: "*__Below you'll find the top 20 players with their EXP & LVL__*",
		fields: [
			{
				name: "Character Name",
				value: "",
				inline: true,
			},
			{
				name: "Current Level",
				value: "",
				inline: true,
			},
			{
				name: "EXP",
				value: "",
				inline: true,
			},
		],
	};
	try {
		const grindingRaceSetting = client.settings.find(
			(setting) => setting.setting_name === "grinding_race"
		);

		if (!grindingRaceSetting) {
			console.error("Could not find 'grinding_race' setting");
			return;
		}

		const channelID = grindingRaceSetting.setting_value;

		const channel = await client.channels.fetch(channelID);

		setInterval(async () => {
			const result = await getKnexConnection().raw(
				"exec FetchGrindingRaceData"
			);

			const messages = await channel.messages.fetch({ limit: 1 });
			const lastMessage = messages.first();
			grindingRaceEmbed.fields.forEach((field) => (field.value = ""));

			result.forEach((Char) => {
				grindingRaceEmbed.fields[0].value += `\n${Char.CharName16}`;
				grindingRaceEmbed.fields[1].value += `\n${Char.CurLevel}`;
				grindingRaceEmbed.fields[2].value += `\n${Char.Exp}`;
			});

			if (lastMessage.author.bot) {
				await lastMessage.edit({ embeds: [buildEmbed(grindingRaceEmbed)] });
			} else {
				await channel.send({ embeds: [buildEmbed(grindingRaceEmbed)] });
			}
		}, 60000);
	} catch (error) {
		console.error(error);
	}
};
