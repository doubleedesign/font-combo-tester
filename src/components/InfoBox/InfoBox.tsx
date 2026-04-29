import { type FC, type ReactNode } from 'react';
import { InfoBoxWrapper } from './InfoBox.styled';

interface InfoBoxProps {
	children: ReactNode;
}

const InfoBox: FC<InfoBoxProps> = ({ children }) => (
	<InfoBoxWrapper>
		{children}
	</InfoBoxWrapper>
);

export default InfoBox;
