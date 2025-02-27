import express from 'express';
import checkBlockedEmail from '../middleware/checkBlockedEmail.js';
import prisma from '../client.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

//borre checkbloquedemail de aqui como middleware
router.post('/api/login', async (req, res) => {
	const { email, password, rememberMe } = req.body;
	console.log(email, password, rememberMe);

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

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
