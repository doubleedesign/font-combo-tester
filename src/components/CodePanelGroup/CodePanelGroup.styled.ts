import styled from 'styled-components';

export const CodePanelGroupWrapper = styled.div`
	height: 100%;
	
	.react-aria-Tabs {
		height: 100%;
		display: flex;
		flex-direction: column;
		
		.react-aria-TabList {
			font-family: var(--font-family-labels);
			display: flex;
			padding-block-start: var(--spacing-xs);
			
			.react-aria-Tab {
				display: block;
				padding: var(--spacing-xs) var(--spacing-sm);
				font-weight: var(--font-weight-medium);
				cursor: pointer;
				color: var(--color-body-text-muted);
				border-bottom: 3px solid transparent;
				transition: all 0.3s ease;
				
				&:hover, &:focus,
				&[aria-selected="true"] {
					color: var(--color-primary);
					border-color: currentColor;
                }
			}
		}
		
		.react-aria-TabPanels {
			flex-grow: 1;
			
			.react-aria-TabPanel {
				height: 100%;
			}
		}
	}
`;
