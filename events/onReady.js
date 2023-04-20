/**
 * @file Ready Event File.
 * @author JohnDilinger
 * @since 1.0.0
 * @version 3.2.2
 */
const notifier = require("../services/notifier");
const startTimedMessage = require("../services/startTimedMessages");
const grindingRace = require("../services/grindingRace");

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {
		if (
			client.settings.find((setting) => setting.setting_name === "notifier")
				.setting_boolean_value
		) {
			notifier(client);
		}
		if (
			client.settings.find(
				(setting) => setting.setting_name === "timed_message"
			).setting_boolean_value
		) {
			startTimedMessage(client);
		}
		if (
			client.settings.find(
				(setting) => setting.setting_name === "grinding_race"
			).setting_boolean_value
		) {
			grindingRace(client);
		}
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
