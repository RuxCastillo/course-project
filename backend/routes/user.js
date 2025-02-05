import express from 'express';
import prisma from '../client.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/user/data', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;

		const templates = await prisma.template.findMany({
			where: { created_by: userId },
		});

		const forms = await prisma.form.findMany({
			where: { user_id: userId },
		});

		res.json({ templates, forms });
	} catch (error) {
		console.error('Error fetching user data:', error);
		res.status(500).json({ error: 'Failed to fetch user data' });
	}
});

export default router;
