import express from 'express';
import checkBlockedEmail from '../middleware/checkBlockedEmail.js';
const router = express.Router();

router.post('/api/login', checkBlockedEmail, async (req, res) => {
	const { email, password, rememberMe } = req.body;

	try {
		const result = await db.query('SELECT * FROM task4 WHERE email = $1', [
			email,
		]);
		const user = result.rows[0];

		if (user && (await bcrypt.compare(password, user.password))) {
			const expiresIn = rememberMe ? '7d' : '1h';
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET,
				{
					expiresIn,
				}
			);
			res.status(200).json({ message: 'Login successful', token });
		} else {
			res.status(401).json({ message: 'Invalid credentials' });
		}
	} catch (err) {
		console.error('Error logging in:', err);
		res.status(500).json({ message: 'Error logging in', error: err });
	}
});

export default router;
