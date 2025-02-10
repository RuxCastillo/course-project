import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}

export default function AutoCompleteRestricted({
	addAllowedUser,
	deleteAllowedUser,
	allowedUsers,
}) {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const { t } = useTranslation();

	const fetchResults = useCallback(
		debounce(async (query) => {
			if (query.length < 3) {
				setResults([]);
				return;
			}

			try {
				const response = await fetch(
					`${API_URL}/api/users/search?query=${query}`
				);
				const data = await response.json();
				setResults(data);
			} catch (error) {
				console.error('Error fetching search results:', error);
			}
		}, 300), // 300 ms de retraso
		[]
	);

	useEffect(() => {
		fetchResults(query);
	}, [query, fetchResults]);

	function handleClickLi(str) {
		setQuery(str);
		setResults([]);
	}

	function handleClickAdd() {
		addAllowedUser(query);
		setQuery('');
	}

	return (
		<section className="acr__section">
			<p>{t('search_username')}</p>
			<div>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Type to search..."
					className="general__campo--input"
				/>
				<button className="general__tags--button" onClick={handleClickAdd}>
					{t('add')}
				</button>
			</div>
			{results.length > 0 && (
				<ul className="acr__ul">
					{results.map((user) => (
						<li
							key={user.id}
							className="acr__li"
							onClick={() => handleClickLi(user.username)}
						>
							{user.username} ({user.email})
						</li>
					))}
				</ul>
			)}
			<div>
				{allowedUsers.map((user) => {
					return (
						<p>
							{user}
							<button onClick={() => deleteAllowedUser(user)}>Delete</button>
						</p>
					);
				})}
			</div>
		</section>
	);
}
