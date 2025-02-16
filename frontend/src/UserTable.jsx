import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function UserTable({ rows }) {
	const { t } = useTranslation();
	const navigate = useNavigate();

	function handleClickRow(str) {
		navigate(`/template/${str}`);
	}

	return (
		<table className="userTable">
			<thead className="userTable__thead">
				<tr>
					<th className="userTable__th">{t('title')}</th>
					<th className="userTable__th">{t('topic')}</th>
					<th className="userTable__th">{t('public')}</th>
					<th className="userTable__th">{t('description')}</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row, index) => {
					if (row.template) {
						row = row.template;
					}

					return (
						<tr
							className="userTable__tr"
							onClick={() => handleClickRow(row.id)}
						>
							<td>{row.title}</td>
							<td>{row.topic}</td>
							<td>{row.is_public ? 'Yes' : 'No'}</td>
							<td>{row.description}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
