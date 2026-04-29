import { type FC, useState, useEffect, useRef, useCallback } from 'react';
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
	const [content, setContent] = useState(css ?? '');
	const wrapperRef = useRef<HTMLDivElement>(null);
	// TODO: Add reset button

	// Don't propagate the code change to the context until the user leaves the editor (blur event)
	const onEditorLeave = useCallback(() => {
		setCss(content);
	}, [content, setCss]);

	useEffect(() => {
		if (!wrapperRef.current) return;
		const input = wrapperRef.current.querySelector('textarea');
		if(!input) return;

		input.addEventListener('blur', onEditorLeave);

		return () => {
			input.removeEventListener('blur', onEditorLeave);
		};

	}, [onEditorLeave]);

	return (
		<CodePanelWrapper ref={wrapperRef}>
			<div className="prismjs">
				<CodeInput
					language="css"
					placeholder=""
					prismJS={Prism}
					onChange={setContent}
					value={content}
				/>
			</div>
		</CodePanelWrapper>
	);
};