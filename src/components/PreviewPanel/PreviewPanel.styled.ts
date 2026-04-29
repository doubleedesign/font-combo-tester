import styled from 'styled-components';
import { Toolbar } from '../common.ts';

export const PreviewPanelWrapper = styled.div`
`;

export const PreviewPanelToolbar = styled(Toolbar)`
	justify-content: flex-end;
`;

export const PreviewPanelInput = styled.div`
	display: flex;
	gap: var(--spacing-xxs);
	align-items: flex-end;
    padding: var(--spacing-xs) var(--spacing-sm);        
	height: 100%;
    box-sizing: border-box;
    width: fit-content;
	margin-inline-start: var(--spacing-xl);
	
    .react-aria-CheckboxGroup,
    .react-aria-RadioGroup {
        font-family: var(--font-family-labels);
        display: flex;
		align-items: center;
		flex-wrap: wrap;
        gap: var(--spacing-sm);

        .react-aria-Label {
            font-weight: var(--font-weight-medium);
            color: var(--color-body-text-muted);
        }
    }

    .react-aria-Radio,
    .react-aria-Checkbox {
        padding-block: var(--spacing-xs);
        line-height: 1;
    }
		
	.react-aria-Radio {
		padding-inline: var(--spacing-md);
		line-height: 1;
		background: var(--color-light-muted);
		color: var(--color-body-text-muted);
		border-radius: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		
		&[data-selected="true"] {
			background: var(--color-primary);
			color: contrast-color(var(--color-primary));
		}
		
		&:not([data-selected="true"]):hover,
		&:not([data-selected="true"]):focus {
			background: var(--color-light);
			color: var(--color-body-text);
		}
	}
	
	.react-aria-Checkbox {
		display: flex;
		align-items: center;
		gap: var(--spacing-xxs);
		color: var(--color-body-text-muted);
		cursor: pointer;
		
		.checkbox {
			width: 1rem;
			height: 1rem;
			border: 1px solid var(--color-body-text-muted);
			border-radius: 4px;
			padding: 2px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
		}

        &[data-selected="true"] {
            color: var(--color-body-text);
			
			.checkbox {
				border-color: var(--color-primary);
				background: var(--color-primary);
				
                svg {
                    fill: contrast-color(var(--color-primary));
                }
			}
        }
	}
	
`;
