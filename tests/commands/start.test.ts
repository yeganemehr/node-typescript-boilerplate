import startCommand from "../../src/commands/start";

test("Running the project", async () => {
	await startCommand.parseAsync([], {from: "user"});
	expect(true).toBe(true);
});