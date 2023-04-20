/**
 * Giveaway button interaction
 * @module ButtonInteractionCommand
 * @version 3.2.2
 * @since 3.0.0
 */

/**
 * Handles the 'join_giveaway' button interaction
 * @param {import('../../../typings').ButtonInteraction} interaction - The interaction object
 * @returns {Promise<void>}
 */

const { getKnexConnection } = require("../../../database/DBConnection");

async function execute(interaction) {
	try {
		const { id: userID, tag: userTag } = interaction.user;

		const giveaway = await getKnexConnection()
			.select("ID")
			.from("RunningGiveaways")
			.where("Message_ID", interaction.message.id)
			.first();

		const invalidUser = await getKnexConnection()
			.table("GiveawayParticipants")
			.select()
			.where({ User_ID: userID, Giveaway_ID: giveaway.ID })
			.first();

		if (invalidUser) {
			await interaction.reply({
				content: "You've already participated in this giveaway!",
				ephemeral: true,
			});
			return;
		}

		const { cache: roles } = interaction.member.roles;
		const roleNames = roles.map((role) => role.name);
		const formattedRoleNames = roleNames
			.filter((name) => name !== "@everyone")
			.join(", ");
		const userRoles = `[${formattedRoleNames}]` || "none";

		await getKnexConnection().table("GiveawayParticipants").insert({
			User_Tag: userTag,
			User_ID: userID,
			User_Roles: userRoles,
			Giveaway_ID: giveaway.ID,
		});

		await interaction.reply({
			content: "You have successfully joined the giveaway!",
			ephemeral: true,
		});
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	id: "join_giveaway",
	cooldown: 10,
	execute,
};
