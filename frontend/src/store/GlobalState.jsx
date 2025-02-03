import { createContext, useReducer, useContext } from 'react';

const initialState = {
	isAuth: false,
	user: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isAuth: true,
				user: action.payload,
			};
		case 'LOGOUT':
			localStorage.clear();
			return {
				...state,
				isAuth: false,
				user: null,
			};
		default:
			return state;
	}
};

const GlobalState = createContext();

export const GlobalStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<GlobalState.Provider value={{ state, dispatch }}>
			{children}
		</GlobalState.Provider>
	);
};

export const useGlobalState = () => {
	return useContext(GlobalState);
};
