import { type FC, useEffect, useMemo, useRef } from 'react';
import { ShadowDomWrapper } from '../ShadowDomWrapper/ShadowDomWrapper.tsx';
import { LetterformLine, PreviewContentItem, PreviewContentWrapper, PreviewOverlay } from './PreviewContent.styled';
import { useCss } from '../../controllers/CssContext/CssContext.tsx';
import { useFontData } from '../../controllers/FontContext/FontContext.tsx';
import type { FontMetrics } from '../../types.ts';

type PreviewContentProps = {
	size: string;
	families: string[];
	weight?: string;
	showMetrics?: boolean;
	zoomLevel?: number;
};

export const PreviewContent: FC<PreviewContentProps> = ({ size, families, weight, showMetrics, zoomLevel = 100 }) => {
	const { css: fonts } = useCss('fonts');
	const { css: tokens } = useCss('tokens');
	const { css: styles } = useCss('styles');

	useEffect(() => {
		if (!fonts) return;

		// Inject the font-face rules into the document head because they won't work in the shadow DOM
		let customStyleEl = document.querySelector('style[data-custom="doubleedesign"]');
		if(!customStyleEl) {
			customStyleEl = document.createElement('style');
			customStyleEl.setAttribute('data-custom', 'doubleedesign');
			document.head.appendChild(customStyleEl);
		}
		customStyleEl.textContent = fonts;
	}, [fonts]);

	return (
		<ShadowDomWrapper stylesheetContent={`${tokens}\n${styles}`}>
			<PreviewContentInner size={size} families={families} weight={weight} showMetrics={showMetrics} zoomLevel={zoomLevel} />
		</ShadowDomWrapper>
	);
};

function PreviewContentInner({ size, families, weight, showMetrics, zoomLevel }: PreviewContentProps) {
	const text = 'The quick brown fox jumps over the lazy dog';
	const textRef = useRef<HTMLDivElement>(null);
	const data = useFontData();

	const positionsFromBottomOfDiv = useMemo(() => {
		if(!data.metrics) return {};
		if(Object.keys(data.metrics).length === 0) return {};

		// We probably have proper FontMetrics object at this point, but TypeScript doesn't realise that
		const metrics = data.metrics as FontMetrics;

		const baselinePos = (Math.abs(metrics.descender ?? 0) + (metrics.baseline ?? 0));
		const shiftedBaselinePos = baselinePos + (data.baselineShift ?? 0);

		return ({
			baseline: shiftedBaselinePos * 10,
			xHeight: (shiftedBaselinePos + (metrics.xHeight ?? 0)) * 10,
			capHeight: (shiftedBaselinePos + (metrics.capHeight ?? 0)) * 10,
			ascender: (shiftedBaselinePos + (metrics.ascender ?? 0)) * 10,
			descender: 0 - Math.abs(shiftedBaselinePos - Math.abs(metrics.descender ?? 0)) * 10,
		});
	}, [data]);

	return (
		<PreviewContentWrapper ref={textRef}>
			{/* eslint-disable-next-line max-len */}
			<PreviewContentItem key="body" $size={size} $family="body" $weight={weight ?? 'normal'} data-family="body" data-weight={weight} $zoomLevel={zoomLevel ?? 100}>
				<figure>
					<p>{text}</p>
				</figure>
				{showMetrics && (
					<PreviewOverlay>
						{Object.entries(positionsFromBottomOfDiv).map(([key, value]) => (
							<LetterformLine className="letterform" key={key} $position={value}>
								<span className="letterform__label">{key}</span>
							</LetterformLine>
						))}
					</PreviewOverlay>)}
			</PreviewContentItem>

			{families.map((family) => family === 'body' ? null : (
				// eslint-disable-next-line max-len
				<PreviewContentItem key={family} $size={size} $family={family} $weight={weight ?? 'normal'} data-family={family} data-weight={weight} $zoomLevel={zoomLevel ?? 100}>
					<figure>
						<p>{text}</p>
					</figure>
				</PreviewContentItem>
			))}
			<code>font-weight: var(--font-weight-{weight})</code>
		</PreviewContentWrapper>
	);
}