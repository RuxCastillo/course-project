import express from 'express';
import prisma from '../client.js';

const router = express.Router();

router.get('/api/searchByTag', async (req, res) => {
	const { name } = req.query;

	if (!name) {
		return res.status(400).json({ error: 'Query parameter is required' });
	}

	try {
		const templates = await prisma.template.findMany({
			where: {
				templateTags: {
					some: {
						tag: {
							name: {
								contains: name,
								mode: 'insensitive',
							},
						},
					},
				},
			},
			include: {
				templateTags: {
					include: {
						tag: true,
					},
				},
			},
		});
		res.json(templates);
	} catch (error) {
		console.error('Error searching templates by tag:', error);
		res.status(500).json({ error: 'Failed to search templates by tag' });
	}
});

export default router;
