export default function TemplateIcon({ template }) {
	console.log(template);
	return (
		<div className="templateIcon">
			<strong>{template.title}</strong>
			<p>{template.description}</p>
		</div>
	);
}
