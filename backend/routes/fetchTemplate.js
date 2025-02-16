import express from 'express';
import prisma from '../client.js';

const router = express.Router();

router.get('/api/fetchTemplate/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const template = await prisma.template.findUnique({
			where: { id: parseInt(id) },
			include: {
				templateTags: {
					include: {
						tag: true,
					},
				},
				questions: true,
				forms: {
					include: {
						answers: true,
						user: true,
					},
				},
				comments: true,
				allowedUsers: true,
			},
		});

		if (!template) {
			return res.status(404).json({ error: 'Template not found' });
		}

		const response = {
			title: template.title,
			description: template.description,
			tags: template.templateTags.map((tt) => tt.tag.name),
			is_public: template.is_public,
			questions: template.questions,
			results: template.forms.map((form) => ({
				id: form.id,
				created_at: form.created_at,
				updated_at: form.updated_at,
				answers: form.answers,
				user: {
					username: form.user.username,
				},
			})),
			allowedUsers: template.allowedUsers,
			aggregation: template.aggregation,
			topic: template.topic,
			create: template.create,
			image_url: template.image_url,
		};

		res.json(response);
	} catch (error) {
		console.error('Error fetching template:', error);
		res.status(500).json({ error: 'failed to fetch template' });
	}
});

export default router;
