import styled from 'styled-components';

export const Toolbar = styled.div`
    display: flex;
	gap: 1rem;
    align-items: flex-end;
	height: 3rem;
	box-sizing: border-box;
    // Make the shadow extend to the edges without being visible on the sides
    box-shadow: 0 0.5rem 0.5rem -0.5rem rgba(0, 0, 0, 0.3);
	width: calc(100% + 1rem);
	margin: 0 -0.5rem;
	padding-inline: 0.5rem;
`;