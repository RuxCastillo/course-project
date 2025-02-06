import express from 'express';
import prisma from '../client.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/user/userData', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
			},
		});

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		console.log('hola');
		console.log(user);
		res.json(user);
	} catch (error) {
		console.error('Error fetching user data:', error);
		res.status(500).json({ error: 'Failed to fetch user data' });
	}
});

export default router;
