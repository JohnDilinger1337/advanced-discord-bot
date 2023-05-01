/**
 * @file Sample help command with slash command.
 * @author JohnDilinger
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const {
	ActionRowBuilder,
	Events,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	SlashCommandBuilder,
} = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("newgiveaway")
		.setDescription("Create a new giveaway."),

	async execute(interaction) {
		// Create the modal
		const modal = new ModalBuilder()
			.setCustomId("newgiveaway")
			.setTitle("Create New Giveaway!");

		// Add components to modal

		// Create the text input components
		const titleInput = new TextInputBuilder()
			.setCustomId("giveaway_title")
			.setLabel("Giveaway Title:")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder("The giveaway title!")
			.setRequired(true);

		const messageInput = new TextInputBuilder()
			.setCustomId("giveaway_message")
			.setLabel("Giveaway Content:")
			.setStyle(TextInputStyle.Paragraph)
			.setPlaceholder("The giveaway content!")
			.setRequired(true);

		const imageInput = new TextInputBuilder()
			.setCustomId("giveaway_image")
			.setLabel("Giveaway Image:")
			.setStyle(TextInputStyle.Paragraph)
			.setPlaceholder("Leave it empty if you don't wanna add image.")
			.setRequired(false);

		const durationInput = new TextInputBuilder()
			.setCustomId("giveaway_duration")
			.setLabel("Giveaway Date:")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder("eg. (1d 3h 10m)")
			.setRequired(true);

		const winnersInput = new TextInputBuilder()
			.setCustomId("giveaway_winners")
			.setLabel("Winners Cout:")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder("The giveaway winners cout!")
			.setRequired(true);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const titleActionRow = new ActionRowBuilder().addComponents(titleInput);

		const messageActionRow = new ActionRowBuilder().addComponents(messageInput);

		const imageActionRow = new ActionRowBuilder().addComponents(imageInput);

		const durationActionRow = new ActionRowBuilder().addComponents(
			durationInput
		);

		const winnersActionRow = new ActionRowBuilder().addComponents(winnersInput);

		// Add inputs to the modal
		modal.addComponents(
			titleActionRow,
			messageActionRow,
			imageActionRow,
			durationActionRow,
			winnersActionRow
		);

		// Show the modal to the user
		await interaction.showModal(modal);
	},
};
