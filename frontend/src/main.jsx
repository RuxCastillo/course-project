import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import App from './App.jsx';
import Start from './Start.jsx';
import { GlobalStateProvider } from './store/GlobalState';

createRoot(document.getElementById('root')).render(
	<GlobalStateProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/login" element={<Start />} />
			</Routes>
		</BrowserRouter>
	</GlobalStateProvider>
);
