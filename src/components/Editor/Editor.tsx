import { type FC } from 'react';
import { CssProvider } from '../../controllers/CssContext/CssContext.tsx';
import { FontContextProvider } from '../../controllers/FontContext/FontContext.tsx';
import { EditorPanel, EditorWrapper } from './Editor.styled';
import { CodePanelGroup } from '../CodePanelGroup/CodePanelGroup.tsx';
import { PreviewPanel } from '../PreviewPanel/PreviewPanel.tsx';

interface EditorProps {}

const Editor: FC<EditorProps> = () => {
	return (
		<CssProvider>
			<FontContextProvider>
				<EditorWrapper>
					<EditorPanel size="narrow">
						<CodePanelGroup />
					</EditorPanel>
					<EditorPanel size="wide">
						<PreviewPanel />
					</EditorPanel>
				</EditorWrapper>
			</FontContextProvider>
		</CssProvider>
	);
};

export default Editor;
