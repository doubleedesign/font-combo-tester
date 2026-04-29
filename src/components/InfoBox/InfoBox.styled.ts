import styled from 'styled-components';

export const InfoBoxWrapper = styled.div`
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.3);
	border-left: 4px solid var(--color-info);
	font-family: var(--font-family-accent);
	margin: var(--spacing-lg);
	padding: var(--spacing-md);
	
	p {
		
		&:first-child {
			margin-top: 0;
		}
		
		&:last-child {
			margin-bottom: 0;
		}
	}
`;
