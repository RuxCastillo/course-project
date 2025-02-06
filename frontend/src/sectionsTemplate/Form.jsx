import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}

export default function form() {
	const { id } = useParams();
	const [template, setTemplate] = useState(null);

	useEffect(() => {
		async function fetchTemplate() {
			try {
				const response = await fetch(`${API_URL}/api/searchtemplates/${id}`);
				if (!response.ok) {
					throw new Error('Failed to fetch template');
				}
				const data = await response.json();
				setTemplate(data);
			} catch (error) {
				console.error('Error fetching template:', error);
			}
		}

		fetchTemplate();
	}, [id]);

	if (!template) {
		return <div>Loading...</div>;
	}

	console.log(template);

	return (
		<div>
			<h1>{template.title}</h1>
			<p>{template.description}</p>
			{/* Renderiza otros campos del template según sea necesario */}
		</div>
	);
}
