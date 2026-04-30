import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import '../../../node_modules/lib-font/lib/inflate.js';
import '../../../node_modules/lib-font/lib/unbrotli.js';
// @ts-expect-error TS7016: Could not find a declaration file for module
import { Font } from '../../../node_modules/lib-font/lib-font.js';
import { useCss } from '../CssContext/CssContext.tsx';
import { extractFontFaceDeclarationData, updateFontData } from '../../utils.ts';
import type { FontMetrics } from '../../types.ts';

type FontContextType = {
	metrics: FontMetrics | null;
	// If @font-face adjustments have been made, how much to shift the overlay displaying the metrics to keep it aligned
	baselineShift?: number;
};

const FontContext = createContext<FontContextType>({ metrics: null, baselineShift: 0 });

export const FontContextProvider = ({ children }: { children: ReactNode }) => {
	const { css } = useCss('fonts');
	const [originalMetrics, setOriginalMetrics] = useState<FontMetrics | null>(null);
	const [error, setError] = useState<string | null>(null);
	// TODO: Make this configurable in the UI
	const fontName = 'Berkeley Old Style';
	const fontUrl = 'https://doublee.dev/fonts/BerkeleyOldStyleBook.woff2';

	useEffect(() => {
		const baseFont = new Font(fontName);
		baseFont.src = fontUrl;
		baseFont.onerror = () => setError('Failed to load font data');
		baseFont.onload = (event: any) => {
			if(event.detail.font) {
				setError(null);

				const measurements = event.detail.font.opentype.tables['OS/2'];
				const metrics = {
					baseline: 0,
					xHeight: measurements?.sxHeight / 100,
					capHeight: measurements?.sCapHeight / 100,
					ascender: measurements?.sTypoAscender / 100,
					descender: measurements?.sTypoDescender / 100,
				};

				setOriginalMetrics(metrics);
			}
		};

		// Remove the font-face rules injected by the LibJS script that loads the fonts we're measuring, because that declaration will override ours
		const injectedFontStylesheets = document.querySelectorAll('.injected-by-Font-js');
		injectedFontStylesheets.forEach((sheet) => {
			sheet.parentNode?.removeChild(sheet);
		});
	}, [fontUrl]);

	const adjustments = useMemo(() => {
		if(!css) return {};

		const fontFaceData = extractFontFaceDeclarationData(css);
		const bodyFontNormal = fontFaceData.find(font => {
			return font['font-family'] === `"${fontName}"` && font['font-weight'] === '400' && font['font-style'] === 'normal';
		});

		return {
			sizeAdjust: parseInt(bodyFontNormal?.['size-adjust']?.replace('%', '') ?? '0') ?? 0,
			ascenderOverride: parseInt(bodyFontNormal?.['ascent-override']?.replace('%', '') ?? '0') ?? 0,
			descenderOverride: parseInt(bodyFontNormal?.['descent-override']?.replace('%', '') ?? '0') ?? 0,
		};
	}, [css]);

	const data = useMemo(() => {
		if(!originalMetrics) return { metrics: null, baselineShift: 0 };
		if(!adjustments || Object.values(adjustments).every(value => value === 0)) return { metrics: originalMetrics, baselineShift: 0 };

		const updated = updateFontData(originalMetrics, adjustments);

		return {
			metrics: updated,
			baselineShift: (updated.descender - originalMetrics.descender) * 2
		};
	}, [originalMetrics, adjustments]);

	return error
		? <>Error loading font data, please hard refresh to try again.</>
		: <FontContext.Provider value={data}>{children}</FontContext.Provider>;
};


export function useFontData() {
	const context = useContext(FontContext);
	if (!context) {
		throw new Error('useFontData must be used within a <FontContextProvider>');
	}

	return context;
}
