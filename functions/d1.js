export async function onRequest({ env }) {
	try {
		await env.DB.exec('CREATE TABLE IF NOT EXISTS `test` (`uuid` TEXT PRIMARY KEY)');
		await env.DB.exec("INSERT INTO `test` (`uuid`) VALUES ('" + crypto.randomUUID() + "')");

		const ps = env.DB.prepare('SELECT * FROM `test`');
		const res = await ps.all();

		return Response.json(res.results);
	} catch(e) {
		return Response.json({ message: e.message, stack: e.stack, d1: env.DB });
	}
}
