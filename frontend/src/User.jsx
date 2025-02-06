import Search from './Search';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { useGlobalState } from './store/GlobalState';
import { useEffect, useState } from 'react';
import UserTable from './UserTable';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}
console.log(API_URL);

export default function User() {
	const { state, dispatch } = useGlobalState();
	const [templates, setTemplates] = useState([]);
	const [forms, setForms] = useState([]);
	const [tableState, setTableState] = useState(true);

	function handleClickChangeTable() {
		setTableState((prevState) => !prevState);
	}

	useEffect(() => {
		const fetchUserData = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				console.error('No token found');
				return;
			}

			try {
				const response = await fetch(`${API_URL}/api/user/data`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.json();
				setTemplates(data.templates);
				setForms(data.forms);
				console.log(data);
			} catch (err) {
				console.error('Error fetching user data:', err);
			}
		};

		fetchUserData();
	}, []);

	return (
		<main>
			<NavBar />
			<div className="user__gray-area"></div>
			<div className="user">
				<h1 className="user__h1">{state.user.username}</h1>
				<img className="user__img" src="" alt="imagen" />
			</div>
			<section className="user__section">
				<div className="user__table--1" onClick={handleClickChangeTable}>
					Template
				</div>
				<div className="user__table--2" onClick={handleClickChangeTable}>
					Forms
				</div>
				<div className="user__blank-space"></div>
				<section className="user__table">
					{tableState ? (
						<UserTable rows={templates} />
					) : (
						<UserTable rows={forms} />
					)}
				</section>
			</section>
			<Link to="/createTemplate" className="user__create">
				+ Create Template
			</Link>
		</main>
	);
}
