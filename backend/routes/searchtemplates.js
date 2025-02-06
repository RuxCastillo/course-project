import express from 'express';
import prisma from '../client.js';

const router = express.Router();

// Ruta para obtener un template por su ID
router.get('/api/searchtemplates/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const template = await prisma.template.findUnique({
			where: { id: parseInt(id, 10) },
			include: {
				questions: true, // Incluye las preguntas relacionadas si es necesario
				allowedUsers: true, // Incluye los usuarios permitidos si es necesario
			},
		});

		if (!template) {
			return res.status(404).json({ error: 'Template not found' });
		}

		res.json(template);
	} catch (error) {
		console.error('Error fetching template:', error);
		res.status(500).json({ error: 'Failed to fetch template' });
	}
});

export default router;
