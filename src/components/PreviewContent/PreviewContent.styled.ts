import styled from 'styled-components';

export const PreviewContentWrapper = styled.div`
	padding: var(--spacing-xl);
	position: relative;
`;

export const PreviewContentItem = styled.div<{ $size: string; $family: string, $zoomLevel: number }>`
	margin: 0;
	font-family: ${props => `var(--font-family-${props.$family})`};
	font-size: ${props => `var(--font-size-${props.$size})`};
	position: absolute;
	top: var(--spacing-xl);
	left: var(--spacing-xl);
	right: var(--spacing-xl);
    color: var(--color-body-text);
	height: ${props => `calc(${props.$zoomLevel / 100} * 1em)`};

	
    figure {
        margin: 0;
        transform: scale(${props => props.$zoomLevel / 100});
        transform-origin: top left;
    }
	
	p {
		line-height: 1;
	}

    &[data-family="body"] {
        position: relative;
		left: unset;
		top: unset;
		right: unset;
		
        &:not(:only-child) {
			p {
				color: var(--color-body-text-muted);
				opacity: 0.5;
            }
        }
	}
`;

export const PreviewOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: -2px;
	z-index: 500;
`;

export const LetterformLine = styled.button<{ $position?: number }>`
    background: 0;
	display: block;
	position: absolute;
    left: 0;
    right: 0;
	bottom: ${props => props.$position ? `${props.$position}%` : '0'};
	height: 10px; // make them larger for easier hovering
	transform: translateY(7px);
	border: 0;
	border-top: 1px solid var(--color-info);
    cursor: pointer;
	
	.letterform__label {
		position: absolute;
		right: 0;
		bottom: -0.5em;
		font: var(--font-captions);
		background: var(--color-accent);
		padding: var(--spacing-xxs) var(--spacing-sm);
		border-radius: 1rem;
		color: contrast-color(var(--color-accent));
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: 100;
	}
	
	&:hover, &:focus {
		border-color: var(--color-accent);
		
		.letterform__label {
			opacity: 1;
        }
	}
`;