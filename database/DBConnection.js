const { SQLConfig } = require("../config.json");
const Knex = require("knex");
const SQL = require("mssql");

const getKnexConnection = (database = "DiscordBot") => {
	try {
		return Knex({
			client: "mssql",
			connection: {
				database,
				...SQLConfig,
				options: {
					enableArithAbort: true,
					trustedConnection: true,
					encrypt: false, // for azure
					trustServerCertificate: true, // change to true for local dev / self-signed certs
				},
			},
			pool: { min: 0, max: 7, idleTimeoutMillis: 10000 },
		});
	} catch (error) {
		console.error(`Knex database connection failed! ${error}`);
		throw error;
	}
};

const getSqlConnection = async (database = "DiscordBot") => {
	try {
		const connection = await SQL.connect({
			database,
			...SQLConfig,
			pool: { min: 0, max: 7, idleTimeoutMillis: 10000 },
			options: {
				enableArithAbort: true,
				trustedConnection: true,
				encrypt: false, // for azure
				trustServerCertificate: true, // change to true for local dev / self-signed certs
			},
		});
		return connection;
	} catch (error) {
		console.error(`MSSQL database connection failed! ${error}`);
		throw error;
	}
};

module.exports = {
	getKnexConnection,
	getSqlConnection,
};
