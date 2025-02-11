import express from 'express';
import prisma from '../client.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/changeTheme', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;
		const { theme } = req.body;

		const updateTheme = await prisma.user.update({
			where: { id: userId },
			data: { theme },
		});

		res.json({ message: 'Theme updated successfully', user: updateTheme });
	} catch (error) {
		console.error('error updating theme', error);
		res.status(500).json({ error: 'Failed to update theme' });
	}
});

export default router;
