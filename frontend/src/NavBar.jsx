import Search from './Search';
import { useGlobalState } from './store/GlobalState';
import { useNavigate, Link } from 'react-router-dom';
import logo from './assets/the app.png';

export default function NavBar() {
	const { state, dispatch } = useGlobalState();
	const navigate = useNavigate();

	function handleSignOut() {
		dispatch({ type: 'LOGOUT' });
		navigate('/');
		console.log(localStorage);
	}

	function handleClickLogo() {
		navigate('/');
	}

	return (
		<nav className="app__navbar">
			<img src={logo} alt="" className="app__logo" onClick={handleClickLogo} />
			{state.isAuth && (
				<Link to="/user" className="app__sign">
					Profile
				</Link>
			)}
			{state.isAuth ? (
				<button onClick={handleSignOut} className="app__sign">
					Sign out
				</button>
			) : (
				<Link to="/login" className="app__sign">
					Sign In / Register
				</Link>
			)}
			<Search />
		</nav>
	);
}
