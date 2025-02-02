import logo from './assets/the app.png';
import background from './assets/background-blue.jpg';
import Login from './Login';
import Register from './Register';
import { useState } from 'react';

function Start() {
	const [signIn, setSignIn] = useState(true);

	function handleSignIn() {
		setSignIn((prevState) => !prevState);
	}

	return (
		<main className="start__main">
			<section className="start__login">
				<div className="h-1/8">
					<h1 className="start__title">THE APP</h1>
					<img src={logo} alt="" className="start__logo" />
				</div>
				{signIn ? (
					<Login handleSignIn={handleSignIn} />
				) : (
					<Register handleSignIn={handleSignIn} />
				)}
			</section>
			<section
				className="start__image"
				style={{ backgroundImage: `url(${background})` }}
			></section>
		</main>
	);
}

export default Start;
