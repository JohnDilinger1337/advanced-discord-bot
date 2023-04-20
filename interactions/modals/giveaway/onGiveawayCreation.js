/**
 * @file Sample modal interaction
 * @author JohnDilinger
 * @since 3.2.0
 * @version 3.2.2
 */

const {
	ButtonStyle,
	ActionRowBuilder,
	ButtonBuilder,
	ComponentType,
} = require("discord.js");
const { buildEmbed, addTimeToDate } = require("../../../functions");
const { getKnexConnection } = require("../../../database/DBConnection");

/**
 * @type {import('../../../typings').ModalInteractionCommand}
 */
module.exports = {
	id: "newgiveaway",

	async execute(interaction) {
		const embedTitle = interaction.fields.getTextInputValue("giveaway_title");
		const embedContent =
			interaction.fields.getTextInputValue("giveaway_message");
		const embedImage = interaction.fields.getTextInputValue("giveaway_image");
		const channelID = interaction.fields.getTextInputValue("giveaway_channel");
		const duration = interaction.fields.getTextInputValue("giveaway_date");

		const buttons = new ActionRowBuilder().addComponents([
			new ButtonBuilder()
				.setCustomId("join_giveaway")
				.setLabel("Join Giveaway!")
				.setEmoji("🎉")
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId("date_giveaway")
				.setLabel(`${addTimeToDate(duration)} (GMT+2)`)
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(true),
		]);

		try {
			const channel = await interaction.client.channels.fetch(channelID);
			const guildName = interaction.guild.name;
			const guildIcon = interaction.guild.iconURL();

			const embed = buildEmbed({
				title: embedTitle,
				message: embedContent,
				author: {
					name: guildName,
					...(guildIcon && { iconURL: guildIcon }),
				},
				...(embedImage && { image: embedImage }),
			});
			const message = await channel.send({
				embeds: [embed],
				components: [buttons],
			});
			await getKnexConnection().table("RunningGiveaways").insert({
				Channel_ID: channelID,
				Message_ID: message.id,
				Duration: duration,
			});
			// await interaction.reply({
			// 	content: `The giveaway has been posted in <#${channelID}>!`,
			// 	ephemeral: true,
			// });
			return;
		} catch (error) {
			console.log(error);
		}
	},
};
