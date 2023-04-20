/**
 * @file Sample ping command
 * @author JohnDilinger
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
const test = `1020402310347767978`;
module.exports = {
	name: "ping",
	// Refer to typings.d.ts for available properties.
	execute(message, args) {
		message.channel.send({ content: `<@${test}>` });
	},
};
