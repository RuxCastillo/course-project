import { useState } from 'react';
let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}
console.log(API_URL);

export default function Register({ handleSignIn }) {
	const [showPassword, setShowPassword] = useState(false);

	function handleShowPassword() {
		setShowPassword((prevState) => !prevState);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		const formDataObj = Object.fromEntries(formData.entries());

		for (let [key, value] of formData.entries()) {
			console.log(key, value);
		}

		try {
			const response = await fetch(`${API_URL}/api/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formDataObj),
			});
			if (response.ok) {
				const data = await response.json();
				console.log('respuesta dle servidor: ', data);
				handleSignIn();
			} else {
				console.log('error en response.ok');
			}
		} catch (err) {
			console.log('error en el catch', err);
		}
	}

	return (
		<>
			<form className="login__form" onSubmit={handleSubmit}>
				<div className="login__title">
					<p>Start your journey</p>
					<h2 className="login__sign">Sign up to The App</h2>
				</div>
				<div className="login__inputs">
					<label htmlFor="email" className="login__label">
						E-mail
					</label>
					<input
						type="text"
						id="email"
						className="login__input"
						name="email"
						required
					/>
				</div>
				<div className="login__inputs">
					<label htmlFor="username" className="login__label">
						Username
					</label>
					<input
						type="text"
						id="username"
						className="login__input"
						name="username"
						required
					/>
				</div>
				<div className="login__inputs">
					<label htmlFor="password" className="login__label">
						Password
					</label>
					<input
						type={showPassword ? 'text' : 'password'}
						id="password"
						className="login__input"
						name="password"
						required
					/>
					<i
						className="login__icon fas fa-eye"
						onClick={handleShowPassword}
					></i>
				</div>
				<button className="login__button">Sign up</button>
			</form>
			<div className="login__account">
				<p className="login__account--p">Already have an account? </p>
				<a
					href=""
					className="login__account--a"
					onClick={(e) => {
						e.preventDefault();
						handleSignIn();
					}}
				>
					{' '}
					Log in
				</a>
			</div>
		</>
	);
}
