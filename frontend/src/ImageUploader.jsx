import { useState } from 'react';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}

export default function ImageUploader({ onUpload }) {
	const [uploading, setUploading] = useState(false);

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'theapp'); // Reemplaza con tu upload preset de Cloudinary

		setUploading(true);

		try {
			const response = await fetch(
				'https://api.cloudinary.com/v1_1/dsrvuksv9/image/upload',
				{
					method: 'POST',
					body: formData,
				}
			);
			const data = await response.json();
			const imageUrl = data.secure_url;

			// Llamar a la función onUpload con la URL de la imagen
			onUpload(imageUrl);
			console.log(imageUrl);
		} catch (error) {
			console.error('Error uploading image:', error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div>
			<input type="file" onChange={handleImageUpload} />
			{uploading && <p>Uploading...</p>}
		</div>
	);
}
