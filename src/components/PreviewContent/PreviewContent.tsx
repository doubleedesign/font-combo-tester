import type { FC } from 'react';
import { ShadowDomWrapper } from '../ShadowDomWrapper/ShadowDomWrapper.tsx';
import { PreviewContentItem, PreviewContentWrapper } from './PreviewContent.styled';
import { useCss } from '../../controllers/CssContext/CssContext.tsx';

type PreviewContentProps = {
	size: string;
	families: string[];
};

const PreviewContent: FC<PreviewContentProps> = ({ size, families }) => {
	const { css: fonts } = useCss('fonts');
	const { css: tokens } = useCss('tokens');
	const { css: styles } = useCss('styles');

	return (
		<ShadowDomWrapper stylesheetContent={`${fonts}\n${tokens}\n${styles}`}>
			<PreviewContentWrapper>
				{families.map((family) => (
					<PreviewContentItem key={family} $size={size} $family={family}>
						<span>The quick brown fox jumps over the lazy dog</span>
					</PreviewContentItem>
				))}
			</PreviewContentWrapper>
		</ShadowDomWrapper>
	);
};

export default PreviewContent;
