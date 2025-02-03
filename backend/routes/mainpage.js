import express from 'express';
import prisma from '../client.js';
const router = express.Router();

router.get('/api/templates', async (req, res) => {
	try {
		const latestTemplates = await prisma.template.findMany({
			orderBy: {
				created_at: 'desc',
			},
			take: 5,
		});

		const popularTemplates = await prisma.template.findMany({
			orderBy: {
				forms: {
					_count: 'desc',
				},
			},
			take: 5,
			include: {
				forms: true,
			},
		});

		const tags = await prisma.tag.findMany();

		res.status(200).json({
			latestTemplates,
			popularTemplates,
			tags,
		});
	} catch (err) {
		console.error('Error fetching templates:', err);
		res.status(500).json({ message: 'Error fetching templates', error: err });
	}
});

export default router;
