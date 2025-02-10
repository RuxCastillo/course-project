import Search from './Search';
import { useGlobalState } from './store/GlobalState';
import { useNavigate, Link } from 'react-router-dom';
import logo from './assets/the app.png';
import Settings from './Settings';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
	const { state, dispatch } = useGlobalState();
	const navigate = useNavigate();
	const { t } = useTranslation();

	function handleSignOut() {
		dispatch({ type: 'LOGOUT' });
		navigate('/');
	}

	function handleClickLogo() {
		navigate('/');
	}

	return (
		<nav className="app__navbar">
			<img src={logo} alt="" className="app__logo" onClick={handleClickLogo} />
			{state.isAuth && (
				<Link to="/user" className="app__sign">
					{t('profile')}
				</Link>
			)}
			{state.isAuth ? (
				<button onClick={handleSignOut} className="app__sign">
					{t('sign_out')}
				</button>
			) : (
				<Link to="/login" className="app__sign">
					{t('sign_in_register')}
				</Link>
			)}
			<Search />
			<Settings />
		</nav>
	);
}
