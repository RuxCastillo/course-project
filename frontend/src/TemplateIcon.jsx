import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TemplateIcon({ template }) {
	const navigate = useNavigate();

	function handleClick() {
		navigate(`/form/${template.id}`);
	}
	return (
		<div className="templateIcon" onClick={handleClick}>
			<strong>{template.title}</strong>
			<p>{template.description}</p>
		</div>
	);
}
