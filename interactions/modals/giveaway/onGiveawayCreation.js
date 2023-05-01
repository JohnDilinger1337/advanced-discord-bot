/**

@file Sample modal interaction
This file defines the 'newgiveaway' command, which posts a new giveaway in the specified Discord channel.
@author JohnDilinger
@since 3.2.0
@version 3.2.2
*/
// Require necessary dependencies
const { ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { buildEmbed, addTimeToDate } = require("../../../functions");
const { getKnexConnection } = require("../../../database/DBConnection");
const runGiveaway = require("../../../services/giveaway/onRunningGiveaways");
/**
	
	@typedef {import('../../../typings').ModalInteractionCommand} ModalInteractionCommand
	*/
/**
	
	@type {ModalInteractionCommand}
	
	*/
module.exports = {
	id: "newgiveaway",

	/**
	
	This method executes right after using the 'newgiveaway' command, which posts a new giveaway in the specified Discord channel.
	
	@param {import('discord.js').CommandInteraction} interaction - The interaction object representing the user input.
	*/
	async execute(interaction) {
		// Get the user inputs from the interaction fields
		const embedTitle = interaction.fields.getTextInputValue("giveaway_title");
		const embedContent =
			interaction.fields.getTextInputValue("giveaway_message");
		const embedImage = interaction.fields.getTextInputValue("giveaway_image");
		const channel = interaction.channel;
		const duration = interaction.fields.getTextInputValue("giveaway_duration");
		const winnersCout =
			interaction.fields.getTextInputValue("giveaway_winners");

		// Create the buttons to be displayed in the giveaway message
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
			// Fetch the specified channel from the Discord API
			const guildName = interaction.guild.name;
			const guildIcon = interaction.guild.iconURL();

			// Create the giveaway message embed
			const embed = buildEmbed({
				title: embedTitle,
				message: embedContent,
				author: {
					name: guildName,
					...(guildIcon && { iconURL: guildIcon }),
				},
				...(embedImage && { image: embedImage }),
			});

			// Send the giveaway message in the specified channel, and save the message ID to the database
			const message = await channel.send({
				embeds: [embed],
				components: [buttons],
			});

			const [{ ID: giveawayID }] = await getKnexConnection()
				.table("RunningGiveaways")
				.insert({
					Channel_ID: channel.id,
					Message_ID: message.id,
					Duration: duration,
				})
				.returning("ID");
			await runGiveaway(giveawayID, message, duration, winnersCout);
			// Send a confirmation message to the user (currently commented out)
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
