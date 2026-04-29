import styled from 'styled-components';

export const PreviewContentWrapper = styled.div`
`;

export const PreviewContentItem = styled.figure<{ $size: string; $family: string }>`
	margin: 0;
	font-family: ${props => `var(--font-family-${props.$family})`};
	font-size: ${props => `var(--font-size-${props.$size})`};
`;
