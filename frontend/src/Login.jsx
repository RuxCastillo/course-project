import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from './store/GlobalState';

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
					<p>Start your journey</p>
					<h2 className="login__sign">Sign in to The App</h2>
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
						Password
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
					<label htmlFor="remember">Remember me</label>
				</div>
				<button to="/table" className="login__button">
					Sign In
				</button>
			</form>
			<div className="login__account">
				<p className="login__account--p">Don't have an account? </p>
				<a
					href=""
					className="login__account--a"
					onClick={(e) => {
						e.preventDefault();
						handleSignIn();
					}}
				>
					{' '}
					Sign up
				</a>
			</div>
		</>
	);
}
