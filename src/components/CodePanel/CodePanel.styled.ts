import styled from 'styled-components';

export const CodePanelWrapper = styled.div`
	height: 100%;
	width: 100%;
	
    .prismjs {
        height: 100%;

        > div {
            height: 100% !important;
            width: 100% !important;
			box-sizing: border-box;

            > div {
                height: 100% !important;
				width: 100% !important;
				font-family: inherit;
				font-size: inherit;
            }

            pre {
                height: 100% !important;
            }
        }
    }
`;
