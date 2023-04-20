const { CronJob } = require("cron");
const { EmbedBuilder } = require("discord.js");

module.exports = class {
	constructor(ID, title, message, image, time, channelID) {
		this.embed = { ID, title, message, image };
		this.cronJob = { time, channelID };
	}

	async execute(embedMessage, cronJob, client) {
		try {
			const { time, channelID } = cronJob;
			const timeValue = parseInt(time);
			const timeUnit = time.charAt(time.length - 1);
			const channel = await client.channels.fetch(channelID);
			const embed = this.buildEmbed(embedMessage);

			const cronExpression = this.getCronExpression(timeUnit, timeValue);
			const job = new CronJob(cronExpression, async () => {
				await channel.send({ embeds: [embed] });
			});
			job.start();
			console.log(
				`Scheduled message for channel ${channel.id} at ${cronExpression}`
			);
		} catch (error) {
			console.error(`Failed to schedule message: ${error}`);
		}
	}

	getCronExpression(timeUnit, timeValue) {
		let cronExpression = "";

		switch (timeUnit) {
			case "s":
				cronExpression = `*/${timeValue} * * * * *`;
				break;
			case "m":
				cronExpression = `0 */${timeValue} * * * *`;
				break;
			case "h":
				cronExpression = `0 0 */${timeValue} * * *`;
				break;
			case "d":
				cronExpression = `0 0 0 */${timeValue} * *`;
				break;
			default:
				cronExpression = `0 0 0 0 0 0 *`;
				break;
		}

		return cronExpression;
	}
	buildEmbed(embedMessage) {
		const embed = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle(embedMessage.title)
			.setDescription(embedMessage.message)
			.setTimestamp()
			.setFooter({
				text: `Powered by JohnDilinger\u200b`,
			});

		if (embedMessage.image !== null) {
			embed.setImage(embedMessage.image);
		}

		if (embedMessage.author) {
			embed.setAuthor(
				embedMessage.author.name,
				embedMessage.author.iconURL,
				embedMessage.author.url
			);
		}

		if (embedMessage.fields) {
			embedMessage.fields.forEach((field) => {
				embed.addField(field.name, field.value, field.inline);
			});
		}

		return embed;
	}
};
