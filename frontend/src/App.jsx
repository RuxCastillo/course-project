import './App.css';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalState } from './store/GlobalState';
import { useEffect, useState } from 'react';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}
console.log(API_URL);

function App() {
	const navigate = useNavigate();
	const { isAuth } = useGlobalState();
	const [latestTempates, setLatestTemplates] = useState([]);
	const [popularTemplates, setPopularTemplates] = useState([]);
	const [tags, setTags] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${API_URL}/api/templates`);
				const data = await response.json();
				setLatestTemplates(data.latestTemplates);
				setPopularTemplates(data.popularTemplates);
				setTags(data.tags);
				console.log(latestTempates, popularTemplates, tags);
			} catch (err) {
				console.error('Error fetching templates:', err);
			}
		};

		fetchData();
	}, []);

	return (
		<main className="app__main">
			<nav className="app__navbar">
				<Link to="/login" className="app__sign">
					Sign In/Register
				</Link>
			</nav>

			<h1 className="app__h1">Welcome to the app</h1>
			<section className="app__section">
				<h2 className="app__h2">latest</h2>
			</section>
			<section className="app__section">
				<h2 className="app__h2">5most popular</h2>
			</section>
			<section className="app__section">
				<h2 className="app__h2">tag cloud</h2>
			</section>
		</main>
	);
}

export default App;
