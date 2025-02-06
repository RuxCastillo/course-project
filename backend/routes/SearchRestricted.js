import express from 'express';
import prisma from '../client.js';

const router = express.Router();

// Ruta para buscar usuarios por username o email
router.get('/api/users/search', async (req, res) => {
	const { query } = req.query;

	if (!query) {
		return res.status(400).json({ error: 'Query parameter is required' });
	}

	try {
		const users = await prisma.user.findMany({
			where: {
				OR: [
					{ username: { contains: query, mode: 'insensitive' } },
					{ email: { contains: query, mode: 'insensitive' } },
				],
			},
			select: {
				id: true,
				username: true,
				email: true,
			},
		});

		res.json(users);
	} catch (error) {
		console.error('Error searching users:', error);
		res.status(500).json({ error: 'Failed to search users' });
	}
});

export default router;
