import Search from './Search';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { useGlobalState } from './store/GlobalState';

export default function User() {
	const { state, dispatch } = useGlobalState();
	function handleSignOut() {
		dispatch({ type: 'LOGOUT' });
		navigate('/');
		console.log(localStorage);
	}
	return (
		<main>
			<NavBar />
			<div className="user__gray-area"></div>
			<div className="user">
				<h1 className="user__h1">User</h1>
				<img className="user__img" src="" alt="imagen" />
			</div>
			<section className="user__section">
				<div className="user__table--1">Template</div>
				<div className="user__table--2">Forms</div>
				<div className="user__blank-space"></div>
				<div className="user__table">table</div>
			</section>
			<Link to="/createTemplate" className="user__create">
				+ Create Template
			</Link>
		</main>
	);
}
