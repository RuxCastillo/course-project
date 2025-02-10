import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from './store/GlobalState';
import { useTranslation } from 'react-i18next';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}
console.log(API_URL);

export default function Login({ handleSignIn }) {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();
	const { state, dispatch } = useGlobalState();
	const { t } = useTranslation();

	function handleShowPassword() {
		setShowPassword((prevState) => !prevState);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await fetch(`${API_URL}/api/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, rememberMe }),
			});
			if (response.ok) {
				const data = await response.json();
				console.log('data', data);
				localStorage.setItem('token', data.token);
				console.log(localStorage);
				dispatch({ type: 'LOGIN', payload: data.token });
				navigate('/');
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
					<h2 className="login__sign">{t('sign_in_app')}</h2>
				</div>
				<div className="login__inputs">
					<label htmlFor="email" className="login__label">
						E-mail
					</label>
					<input
						type="text"
						id="email"
						className="login__input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<i className="login__icon fas fa-envelope"></i>
				</div>
				<div className="login__inputs">
					<label htmlFor="password" className="login__label">
						{t('password')}
					</label>
					<input
						type={showPassword ? 'text' : 'password'}
						id="password"
						className="login__input"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<i
						className="login__icon fas fa-eye"
						onClick={handleShowPassword}
					></i>
				</div>
				<div className="login__checkboxs">
					<input
						type="checkbox"
						name="remember"
						id="remember"
						className="login__checkbox"
						checked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
					/>
					<label htmlFor="remember">{t('remember_me')}</label>
				</div>
				<button to="/table" className="login__button">
					{t('sign-in')}
				</button>
			</form>
			<div className="login__account">
				<p className="login__account--p">{t('dont_have_account')} </p>
				<a
					href=""
					className="login__account--a"
					onClick={(e) => {
						e.preventDefault();
						handleSignIn();
					}}
				>
					{' '}
					{t('sign_up')}
				</a>
			</div>
		</>
	);
}
