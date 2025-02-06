import { createContext, useReducer, useContext } from 'react';

const initialState = {
	isAuth: false,
	user: null,
	token: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isAuth: true,
				token: action.payload,
			};
		case 'LOGOUT':
			localStorage.clear();
			return {
				...state,
				isAuth: false,
				user: null,
			};
		case 'SET_USER_DATA':
			return {
				...state,
				user: action.payload,
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
