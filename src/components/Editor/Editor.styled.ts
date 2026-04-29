import styled from 'styled-components';

export const EditorWrapper = styled.div`
	min-width: 1280px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	height: 100dvh;
	width: 100dvw;
`;

type EditorPanelProps = {
	size?: 'narrow' | 'wide';
};

export const EditorPanel = styled.div<EditorPanelProps>`
	grid-column: ${props => props.size === 'wide' ? 'span 3' : ''};
`;
