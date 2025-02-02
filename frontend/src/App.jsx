import './App.css';
import { useNavigate, Link } from 'react-router-dom';

function App() {
	const navigate = useNavigate();

	return (
		<>
			Hola mundo <Link to="/login">click aqui para ir a login</Link>
		</>
	);
}

export default App;
