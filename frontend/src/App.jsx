import './App.css';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalState } from './store/GlobalState';
import { useEffect, useState } from 'react';
import Search from './Search';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}
console.log(API_URL);

function App() {
	const navigate = useNavigate();
	const { state, dispatch } = useGlobalState();
	const [laestTempates, setLatestTemplates] = useState([]);
	const [popularTemplates, setPopularTemplates] = useState([]);
	const [tags, setTags] = useState([]);
	console.log(state);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			dispatch({ type: 'LOGIN', payload: token });
		}

		const fetchData = async () => {
			try {
				const response = await fetch(`${API_URL}/api/templates`);
				const data = await response.json();
				setLatestTemplates(data.latestTemplates);
				setPopularTemplates(data.popularTemplates);
				setTags(data.tags);
				console.log(data);
			} catch (err) {
				console.error('Error fetching templates:', err);
			}
		};

		fetchData();
	}, []);

	function handleSignOut() {
		dispatch({ type: 'LOGOUT' });
		navigate('/');
		console.log(localStorage);
	}

	return (
		<div id="app__main">
			<nav className="app__navbar">
				{state.isAuth && <Link to="/user">Profile</Link>}
				{state.isAuth ? (
					<button onClick={handleSignOut}>sign out</button>
				) : (
					<Link to="/login" className="app__sign">
						Sign In / Register
					</Link>
				)}
				<Search />
			</nav>

			<h1 className="app__h1">Welcome to the app</h1>
			<section className="app__section">
				<h2 className="app__h2">latest</h2>
			</section>
			<section className="app__section">
				<h2 className="app__h2">5 most popular</h2>
			</section>
			<section className="app__section">
				<h2 className="app__h2">tag cloud</h2>
			</section>
		</div>
	);
}

export default App;
