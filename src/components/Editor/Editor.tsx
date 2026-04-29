import { type FC } from 'react';
import { EditorPanel, EditorWrapper } from './Editor.styled';
import { CodePanelGroup } from '../CodePanelGroup/CodePanelGroup.tsx';
import { PreviewPanel } from '../PreviewPanel/PreviewPanel.tsx';

interface EditorProps {}

const Editor: FC<EditorProps> = () => {
	return (
		<EditorWrapper>
			<EditorPanel size="narrow">
				<CodePanelGroup />
			</EditorPanel>
			<EditorPanel size="wide">
				<PreviewPanel />
			</EditorPanel>
		</EditorWrapper>
	);
};

export default Editor;
