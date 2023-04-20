const {
	getKnexConnection,
	getSqlConnection,
} = require("../../database/DBConnection");

const CommandConfigurations = {};

(async () => {
	const rows = await getKnexConnection().select().from("CommandConfiguration");
	for (const row of rows) {
		CommandConfigurations[row.CommandName] = row;
	}
})();

module.exports = class {
	constructor(name, description, args, permissions) {
		this.name = name;
		this.description = description;
		this.args = args;
		this.permissions = permissions;
	}

	async execute(message, args, procedure, commandName) {
		try {
			const procedureName = procedure.shift();
			const procedureParams = procedure;
			const pool = await getSqlConnection();
			const request = pool.request();
			for (let i = 0; procedureParams.length > i; i++) {
				const paramName = procedureParams[i].match(/@(\w+)/)[1];
				request.input(paramName, args[i]);
			}

			const result = await request.execute(procedureName);
			const msg = CommandConfigurations[commandName];
			result.returnValue === 1
				? message.reply({ content: msg.ValidRequestMsg })
				: message.reply({ content: msg.InvalidRequestMsg });

			pool.release();
		} catch (err) {
			console.error(err);
			message.reply({
				content: "An error occurred while executing this command.",
			});
		}
	}
};
