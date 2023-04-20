// /**
//  * @file Sample ping command
//  * @author JohnDilinger
//  * @since 1.0.0
//  * @version 3.2.2
//  */

// /**
//  * @type {(function(string=): (*|Knex<any, unknown[]>|undefined))|{}}
//  */
// const sql = require("mssql");
// const knex = require("../../database/KnexDB");
// const sqlConfig = {
// 	user: "sa",
// 	password: "john@123",
// 	database: "DiscordBot",
// 	server: "localhost",
// 	pool: {
// 		max: 10,
// 		min: 0,
// 		idleTimeoutMillis: 30000,
// 	},
// 	options: {
// 		encrypt: false, // for azure
// 		trustServerCertificate: true, // change to true for local dev / self-signed certs
// 	},
// };
// module.exports = {
// 	name: "claimreward",
// 	description: "Claim a giveaway reward!",
// 	args: true,

// 	async execute(message, args) {
// 		const charName = args[0];
// 		const userID = message.author.id;
// 		try {
// 			// make sure that any items are correctly URL encoded in the connection string
// 			sql
// 				.connect(sqlConfig)
// 				.then((pool) => {
// 					// Stored procedure
// 					return pool
// 						.request()
// 						.input("UserID", userID)
// 						.input("CharName", charName)
// 						.execute("giveawayReward");
// 				})
// 				.then(async (result) => {
// 					if (result.returnValue === 1) {
// 						await knex().raw(
// 							`DELETE TOP(1) GiveawayWinnersReward WHERE Winner_DiscordID = ?`,
// 							userID
// 						);
// 						// await knex().delete().from("GiveawayWinnersReward").where("Winner_DiscordID", userID).limit(1);
// 						message.reply({
// 							content: `Your giveaway reward has been successfully sent to ${charName}.`,
// 						});
// 					} else
// 						message.reply({
// 							content: `Either you are not a winner or you have already earned your reward!`,
// 						});
// 				})
// 				.catch((err) => console.log(err));
// 		} catch (err) {
// 			// ... error checks
// 			console.log(err);
// 		}
// 	},
// };
