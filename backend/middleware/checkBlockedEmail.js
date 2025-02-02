export async function checkBlockedEmail(req, res, next) {
	const userId = req.body.email;
	console.log(userId, 'userId');

	try {
		const userResult = await db.query('SELECT * FROM task4 WHERE email = $1', [
			userId,
		]);
		const dbUser = userResult.rows[0];
		console.log(dbUser, 'dbUser');

		if (!dbUser || dbUser.blocked) {
			return res.sendStatus(403);
		}

		next();
	} catch (err) {
		console.error('Error checking user blocked status:', err);
		res
			.status(500)
			.json({ message: 'Error checking user blocked status', error: err });
	}
}

export default checkBlockedEmail;
