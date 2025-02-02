import express from 'express';
import bcrypt from 'bcrypt';
import prismadb from '../client.js';
const router = express.Router();

router.post('/api/register', async (req, res) => {
	const { email, username, password } = req.body;
	console.log(email, username, password);
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const newUser = await prismadb.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
			},
		});
		console.log('User registered:', newUser);
		res
			.status(200)
			.json({ message: 'User registered successfully', data: newUser });
	} catch (err) {
		console.error('Error inserting user into database: ', err);
		res.status(500).json({ message: 'Error registering user', error: err });
	}
});

export default router;
