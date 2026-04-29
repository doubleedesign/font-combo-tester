import styled from 'styled-components';

export const PreviewContentWrapper = styled.div<{ $zoomLevel: number }>`
	transform: scale(${props => props.$zoomLevel / 100});
	transform-origin: top left;
	padding: var(--spacing-xl);
	position: relative;
`;

export const PreviewContentItem = styled.figure<{ $size: string; $family: string }>`
	margin: 0;
	font-family: ${props => `var(--font-family-${props.$family})`};
	font-size: ${props => `var(--font-size-${props.$size})`};
	position: absolute;
	top: var(--spacing-xl);
	left: var(--spacing-xl);
    color: var(--color-body-text);
	
	&[data-family="body"]:not(:only-child) {
		color: var(--color-body-text-muted);
		opacity: 0.5;
	}
`;
