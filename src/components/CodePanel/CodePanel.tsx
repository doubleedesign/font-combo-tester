import type { FC } from 'react';
import { CodePanelWrapper } from './CodePanel.styled';
import { CodeInput } from '@srsholmes/react-code-input';
import Prism from 'prismjs';
import { type CssFileType, useCss } from '../../controllers/CssContext/CssContext.tsx';
import '@doubleedesign/doublee-site-style/doublee-prism.css';

interface CodePanelProps {
	fileType: CssFileType;
}

export const CodePanel: FC<CodePanelProps> = ( { fileType }) => {
	const { css, setCss } = useCss(fileType);

	return (
		<CodePanelWrapper>
			<div className="prismjs">
				<CodeInput
					language="css"
					placeholder=""
					prismJS={Prism}
					onChange={setCss}
					value={css ?? ''}
				/>
			</div>
		</CodePanelWrapper>
	);
};