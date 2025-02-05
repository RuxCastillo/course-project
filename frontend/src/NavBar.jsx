import Search from './Search';
import { useGlobalState } from './store/GlobalState';
import { useNavigate, Link } from 'react-router-dom';
import { handleSignOut } from './Utilities';

export default function NavBar() {
	const { state, dispatch } = useGlobalState();
	function handleSignOut() {
		dispatch({ type: 'LOGOUT' });
		navigate('/');
		console.log(localStorage);
	}

	return (
		<nav className="app__navbar">
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
