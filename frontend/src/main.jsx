import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import App from './App.jsx';
import Start from './Start.jsx';
import { GlobalStateProvider } from './store/GlobalState';
import User from './User.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import CreateTemplate from './CreateTemplate.jsx';
import Form from './sectionsTemplate/Form.jsx';

createRoot(document.getElementById('root')).render(
	<GlobalStateProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/login" element={<Start />} />
				<Route
					path="/user"
					element={
						<ProtectedRoute>
							<User />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/createTemplate"
					element={
						<ProtectedRoute>
							<CreateTemplate />
						</ProtectedRoute>
					}
				/>
				<Route path="/form/:id" element={<Form />} />
			</Routes>
		</BrowserRouter>
	</GlobalStateProvider>
);
