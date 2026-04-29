import { type FC } from 'react';
import { EditorPanel, EditorWrapper } from './Editor.styled';
import { CodePanelGroup } from '../CodePanelGroup/CodePanelGroup.tsx';

interface EditorProps {}

const Editor: FC<EditorProps> = () => {
	return (
		<EditorWrapper>
			<EditorPanel size="narrow">
				<CodePanelGroup />
			</EditorPanel>
			<EditorPanel size="wide">

			</EditorPanel>
		</EditorWrapper>
	);
};

export default Editor;
