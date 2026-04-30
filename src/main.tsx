import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@doubleedesign/doublee-site-style/doublee-tokens.css';
import '@doubleedesign/doublee-site-style/doublee-common.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>, 
);
