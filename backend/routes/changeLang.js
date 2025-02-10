import express from 'express';
import prisma from '../client.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/changeLang', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;
		const { language } = req.body;

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: { language },
		});

		res.json({ message: 'Language updated successfully', user: updatedUser });
	} catch (error) {
		console.error('Error updating language', error);
		res.status(500).json({ error: 'Failed to update language' });
	}
});

export default router;
