import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import App from './App.jsx';
import Start from './Start.jsx';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/login" element={<Start />} />
		</Routes>
	</BrowserRouter>
);
