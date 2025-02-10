import { useTranslation } from 'react-i18next';
export default function Search() {
	const { t } = useTranslation();
	return (
		<div className="search">
			<input type="text" placeholder={t('search')} className="search__input" />
		</div>
	);
}
