import Search from './Search';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { useGlobalState } from './store/GlobalState';
import { useEffect, useState } from 'react';
import UserTable from './UserTable';
import ImageUploader from './imageUploader';
import form from './assets/form.jpg';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation();

	console.log(state);

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

	const handleImageUpload = async (imageUrl) => {
		try {
			const token = localStorage.getItem('token');
			const updateResponse = await fetch(
				`${API_URL}/api/user/updateProfileImage`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ imageUrl }),
				}
			);
			const updateData = await updateResponse.json();

			// Actualizar el estado global con la nueva imagen de perfil
			dispatch({ type: 'UPDATE_PROFILE_IMAGE', payload: imageUrl });
		} catch (error) {
			console.error('Error updating profile image:', error);
		}
	};

	return (
		<main>
			<NavBar />
			<div className="user__gray-area">
				<img src={form} alt="form" className="user__background-form" />
			</div>
			<div className="user">
				<h1 className="user__h1">{state.user.username}</h1>
				<div className="user__relative">
					<img
						className="user__img"
						src={state.user.profileImage}
						alt="imagen"
					/>
					<ImageUploader onUpload={handleImageUpload} />
				</div>
			</div>
			<section className="user__section">
				<div className="user__table--1" onClick={handleClickChangeTable}>
					{t('template')}
				</div>
				<div className="user__table--2" onClick={handleClickChangeTable}>
					{t('forms')}
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
				{t('create_template')}
			</Link>
		</main>
	);
}
