import express from 'express';
const router = express.Router();

app.post('/api/register', async (req, res) => {
	const { email, username, password } = req.body;
	const uniqueIndex = uuidv4();
	const lastTimeSeen = new Date();
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const result = await db.query(
			'INSERT INTO task4 (unique_index, position, last_time_seen, email, full_name, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			[uniqueIndex, position, lastTimeSeen, email, fullName, hashedPassword]
		);
		console.log('User registered:', result.rows[0]);
		res
			.status(200)
			.json({ message: 'User registered successfully', data: result.rows[0] });
	} catch (err) {
		console.error('Error inserting user into database: ', err);
		res.status(500).json({ message: 'Error registering user', error: err });
	}
});

export default router;
