import styled from 'styled-components';

export const Toolbar = styled.div`
    display: flex;
	flex-wrap: wrap;
	gap: 1rem;
    align-items: flex-end;
	min-height: 4rem;
	box-sizing: border-box;
    // Make the shadow extend to the edges without being visible on the sides
    box-shadow: 0 0.5rem 0.5rem -0.5rem rgba(0, 0, 0, 0.3);
	width: calc(100% + 1rem);
	margin: 0 -0.5rem;
	padding-inline: 0.5rem;
`;

export const StyledButton = styled.button<{ $styleType?: 'solid' | 'outline' | 'subtle' }>`
    background: ${props => props.$styleType === 'solid' ? 'var(--color-primary)' : 'none'};
	border: ${props => props.$styleType === 'outline' ? '1px solid var(--color-body-text-muted)' : '0'};
	padding: var(--spacing-sm);
	box-sizing: border-box;
	cursor: pointer;
	border-radius: 0.25rem;
	transition: all 0.3s ease;
	display: inline-block;
	color: var(--color-body-text);
    font-family: var(--font-family-accent);

	&:hover, &:focus {
		background: ${props => props.$styleType === 'subtle' ? 'var(--color-light)' : ''};
		border: ${props => props.$styleType === 'outline' ? 'var(--color-primary' : ''};
		color: ${props => props.$styleType === 'outline' ? 'var(--color-primary)' : ''};
	}
	
	svg {
        fill: currentColor;
		display: block;
		width: 0.75rem;
		height: 0.75rem;
	}
`;