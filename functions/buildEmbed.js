const { EmbedBuilder } = require("@discordjs/builders");

module.exports = (embedMessage) => {
	const embed = new EmbedBuilder()
		.setColor(0x0099ff)
		.setTitle(embedMessage.title)
		.setDescription(embedMessage.message)
		.setTimestamp()
		.setFooter({
			text: `Powered by JohnDilinger\u200b`,
		});

	if (embedMessage.image !== undefined) {
		embed.setImage(embedMessage.image);
	}

	if (embedMessage.author) {
		embed.setAuthor({
			name: embedMessage.author.name,
			iconURL: embedMessage.author.iconURL,
		});
	}

	if (embedMessage.fields) {
		embedMessage.fields.forEach((field) => {
			embed.addFields({
				name: field.name,
				value: field.value,
				inline: field.inline,
			});
		});
	}

	return embed;
};
