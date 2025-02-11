import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from './store/GlobalState';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}

export default function Settings() {
	const { state, dispatch } = useGlobalState();
	const [openSettings, setOpenSettings] = useState(false);
	const { i18n } = useTranslation();
	const { t } = useTranslation();

	function clickOnSettings() {
		setOpenSettings((prevState) => !prevState);
	}

	function clickOnLang() {
		let currentLang;
		if (state.user) {
			currentLang = state.user.language;
		}
		if (currentLang == undefined) {
			currentLang == 'en';
		}
		console.log(currentLang);
		let newLang = 'es';

		if (currentLang === 'en') {
			newLang = 'es';
		} else if (currentLang === 'es') {
			newLang = 'en';
		}

		i18n.changeLanguage(newLang);
		dispatch({ type: 'SET_LANGUAGE', payload: newLang });
		if (state.isAuth) {
			changeLangDB(newLang);
		}
	}

	async function changeLangDB(language) {
		try {
			const response = await fetch(`${API_URL}/api/changeLang`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${state.token}`,
				},
				body: JSON.stringify({ language }),
			});
			if (!response.ok) {
				throw new Error('Failed to change language');
			}
			const data = await response.json();
			console.log('Language changed successfully in db', data);
		} catch (err) {
			console.error('Error changing language:', err);
		}
	}

	function toggleTheme() {
		const newTheme = state.user.theme === 'light' ? 'dark-mode' : 'light';
		dispatch({ type: 'SET_THEME', payload: newTheme });
		if (newTheme === 'light') {
			document.body.classList.remove('dark-mode');
		} else {
			document.body.classList.add('dark-mode');
		}
		if (state.isAuth) {
			updateThemeInDB({ theme: newTheme });
		}
	}

	async function updateThemeInDB(obj) {
		try {
			const response = await fetch(`${API_URL}/api/changeTheme`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${state.token}`,
				},
				body: JSON.stringify(obj),
			});
			if (!response.ok) {
				throw new Error('Failed to update theme');
			}
			const data = await response.json();
			console.log('user theme updated succesfully in db', data);
		} catch (err) {
			console.error('Error updating theme', err);
		}
	}

	return (
		<div>
			<button onClick={clickOnSettings}>Settings</button>
			{openSettings && (
				<div>
					<button onClick={clickOnLang}>lang</button>
					<button onClick={toggleTheme}>theme</button>
				</div>
			)}
		</div>
	);
}
