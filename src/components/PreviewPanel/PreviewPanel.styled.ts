import styled from 'styled-components';
import { Toolbar } from '../common.ts';

export const PreviewPanelWrapper = styled.div`
`;

export const PreviewPanelToolbar = styled(Toolbar)`
	justify-content: flex-end;
`;

export const PreviewPanelSelect = styled.div`
	display: flex;
	gap: var(--spacing-xxs);
	align-items: center;
    padding: var(--spacing-xs) var(--spacing-sm);

    .react-aria-Select {
        font-family: var(--font-family-labels);
        display: flex;
        gap: var(--spacing-xs);
		align-items: center;

        .react-aria-Label {
            font-weight: var(--font-weight-medium);
            color: var(--color-body-text-muted);
        }
		
        .react-aria-Button {
			width: 120px;
			flex-basis: 120px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            font-family: var(--font-family-labels);
            font-size: var(--font-size-base);
            border: 0;
            border-radius: 0.25rem;
            padding: var(--spacing-xs);
            background: var(--color-light);

            &:after {
                content: '▼';
                font-size: 0.65em;
            }
        }
    }
	
	.react-aria-Popover {
		transform: translateY(-0.5rem);
	}

    .react-aria-ListBox {
		width: 120px;
		background: var(--color-light);
		border-bottom-left-radius: 0.25rem;
		border-bottom-right-radius: 0.25rem;

        .react-aria-ListBoxItem {
            font: var(--font-labels);
			font-size: var(--font-size-base);
			font-weight: var(--font-weight-light);
            cursor: pointer;
			text-align: start;
			padding: var(--spacing-xxs) var(--spacing-xs);
			
			&:hover, &:focus {
				background: var(--color-primary);
				color: contrast-color(var(--color-primary));
				border: 0;
				outline: none;
			}
			
			&[data-hovered="true"] {
				border: 0;
				outline: none;
            }
        }
    }
`;
