import { useState } from 'react';
import { useTranslation } from 'react-i18next';
let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}
console.log(API_URL);

export default function Register({ handleSignIn }) {
	const [showPassword, setShowPassword] = useState(false);
	const { t } = useTranslation();

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
					<p>{t('start_journey')}</p>
					<h2 className="login__sign">{t('sign_up_in_app')}</h2>
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
						{t('usename')}
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
						{t('password')}
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
				<button className="login__button">{t('sign_up')}</button>
			</form>
			<div className="login__account">
				<p className="login__account--p">{t('already_account')}</p>
				<a
					href=""
					className="login__account--a"
					onClick={(e) => {
						e.preventDefault();
						handleSignIn();
					}}
				>
					{' '}
					{t('log_in')}
				</a>
			</div>
		</>
	);
}
