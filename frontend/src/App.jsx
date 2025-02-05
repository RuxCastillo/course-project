import './App.css';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalState } from './store/GlobalState';
import { useEffect, useState } from 'react';
import Search from './Search';
import NavBar from './NavBar';
import TemplateIcon from './TemplateIcon';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}
console.log(API_URL);

function App() {
	const navigate = useNavigate();
	const { state, dispatch } = useGlobalState();
	const [lastTemplates, setLatestTemplates] = useState([]);
	const [popularTemplates, setPopularTemplates] = useState([]);
	const [tags, setTags] = useState([]);
	console.log(state);

	useEffect(() => {
		console.log('se acciono el useeffect de la pagina principal');
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

	return (
		<div id="app__main">
			<NavBar />

			<h1 className="app__h1">Welcome to the app</h1>
			<section className="app__section">
				<h2 className="app__h2">Latest</h2>
				<div className="app__div">
					{lastTemplates.map((template) => {
						return <TemplateIcon template={template} />;
					})}
				</div>
			</section>
			<section className="app__section">
				<h2 className="app__h2">Most popular</h2>
			</section>
			<section className="app__section">
				<h2 className="app__h2">Tags cloud</h2>
			</section>
		</div>
	);
}

export default App;
