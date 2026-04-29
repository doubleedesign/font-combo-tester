import './App.css';
import Editor from './components/Editor/Editor.tsx';
import { CssProvider } from './controllers/CssContext/CssContext.tsx';

function App() {
	return (
		<CssProvider>
			<Editor/>
		</CssProvider>
	);
}

export default App;
