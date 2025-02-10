import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function AnswerCheckbox({ question, handleChange }) {
	const [checkboxes, setCheckboxes] = useState([]);

	useEffect(() => {
		// Inicializar el estado de los checkboxes basado en las opciones de la pregunta
		setCheckboxes(question.options.map(() => false));
	}, [question.options]);

	const handleCheckboxChange = (index) => {
		const updatedCheckboxes = checkboxes.map((checked, i) =>
			i === index ? !checked : checked
		);
		setCheckboxes(updatedCheckboxes);
		handleChange(updatedCheckboxes);
	};

	return (
		<div className="answer">
			<label>{question.title}</label>
			{question.options.map((option, index) => (
				<div className="answer__checkbox" key={index}>
					<input
						type="checkbox"
						className="answer__checkbox--input"
						checked={checkboxes[index]}
						onChange={() => handleCheckboxChange(index)}
					/>
					<p>{option}</p>
				</div>
			))}
		</div>
	);
}
