import styled from 'styled-components';

export const PreviewContentWrapper = styled.div<{ $zoomLevel: number }>`
	transform: scale(${props => props.$zoomLevel / 100});
	transform-origin: top left;
	padding: var(--spacing-xl);
`;

export const PreviewContentItem = styled.figure<{ $size: string; $family: string }>`
	margin: 0;
	font-family: ${props => `var(--font-family-${props.$family})`};
	font-size: ${props => `var(--font-size-${props.$size})`};
`;
