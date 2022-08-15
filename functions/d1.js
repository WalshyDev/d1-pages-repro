import { Database } from '@cloudflare/d1';

export async function onRequest({ env }) {
	try {
		const DB = new Database(env.DB);

		await DB.exec('CREATE TABLE IF NOT EXISTS `test` (`uuid` TEXT PRIMARY KEY)');
		await DB.exec("INSERT INTO `test` (`uuid`) VALUES ('" + crypto.randomUUID() + "')");

		const ps = DB.prepare('SELECT * FROM `test`');
		const res = await ps.all();

		return Response.json(res.results);
	} catch(e) {
		return Response.json({ message: e.message, stack: e.stack, d1: env.DB });
	}
}
