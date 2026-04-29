import { createContext, useContext, type ReactNode, useState, useEffect } from 'react';
import '../../../node_modules/lib-font/lib/inflate.js';
import '../../../node_modules/lib-font/lib/unbrotli.js';
// @ts-expect-error TS7016: Could not find a declaration file for module
import { Font } from '../../../node_modules/lib-font/lib-font.js';

type FontMetricKey = 'baseline' | 'xHeight' | 'capHeight' | 'ascender' | 'descender';

type FontContextType = {
	[key in FontMetricKey]?: number;
};

const FontContext = createContext<FontContextType>({});

export const FontContextProvider = ({ children }: { children: ReactNode }) => {
	const [data, setData] = useState<FontContextType>({});
	const [error, setError] = useState<string | null>(null);
	// TODO: Make this configurable in the UI
	const fontUrl = 'https://doublee.dev/fonts/BerkeleyOldStyleBook.woff2';

	// Prevent extra re-renders of unknown cause by explicitly only running when the font URL is set/changed
	useEffect(() => {
		const baseFont = new Font('Berkeley Old Style');
		baseFont.src = fontUrl;
		baseFont.onerror = () => setError('Failed to load font data');
		baseFont.onload = (event: any) => {
			if(event.detail.font) {
				setError(null);
				const measurements = event.detail.font.opentype.tables['OS/2'];
				setData({
					baseline: 0,
					xHeight: measurements?.sxHeight / 100,
					capHeight: measurements?.sCapHeight / 100,
					ascender: measurements?.sTypoAscender / 100,
					descender: measurements?.sTypoDescender / 100
				});
			}
		};
	}, [fontUrl]);


	const value = {
		...data
	};

	return error
		? <>Error loading font data, please hard refresh to try again.</>
		: <FontContext.Provider value={value}>{children}</FontContext.Provider>;
};


export function useFontData() {
	const context = useContext(FontContext);
	if (!context) {
		throw new Error('useCss must be used within a <CssProvider>');
	}

	return context;
}
