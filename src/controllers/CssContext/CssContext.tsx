import { createContext, useState, useCallback, useContext, type ReactNode, useEffect } from 'react';
import tokens from '@doubleedesign/doublee-site-style/doublee-tokens.css?raw';
import styles from '@doubleedesign/doublee-site-style/doublee-common.css?raw';
import { tidyCss } from '../../utils.ts';

export type CssFileType = 'fonts' | 'tokens' | 'styles';

type CssContextValue = {
	css: {
		fonts?: string;
		tokens?: string;
		styles?: string;
	},
	setCss: (key: CssFileType, content: string) => void;
	reset: (key: CssFileType) => void;
};

const CssContext = createContext<CssContextValue>({
	css: {
		fonts: '',
		tokens: '',
		styles: ''
	},
	setCss: () => {},
	reset: () => {}
});

export const CssProvider = ({ children }: { children: ReactNode }) => {
	const [content, setContent] = useState({
		fonts: '',
		tokens: '',
		styles: ''
	});
	const [originalContent] = useState(content);

	const fetchDefaultCss = useCallback(async () => {
		const fonts = await fetch('https://doublee.dev/fonts/fonts.css')
			.then(res => {
				return res.text();
			}).then(data => {
				return data;
			});

		// Don't import the font-face rules twice when this data is used to inject styles into the preview
		const modifiedTokensFile = tokens.replace('@import \'https://doublee.dev/fonts/fonts.css\';', '');

		setContent({
			fonts,
			tokens: tidyCss(modifiedTokensFile),
			styles: tidyCss(styles)
		});
	}, []);

	const setCss = useCallback((key: CssFileType, content: string) => {
		setContent(prev => ({
			...prev,
			[key]: content
		}));
	}, []);

	const reset = useCallback((key: CssFileType) => {
		setContent(prev => ({
			...prev,
			[key]: originalContent[key]
		}));
	}, [originalContent]);

	useEffect(() => {
		fetchDefaultCss().then();
	}, [fetchDefaultCss]);

	const value = {
		css: content,
		setCss,
		reset
	};

	return <CssContext.Provider value={value}>{children}</CssContext.Provider>;
};

type CssContextResult = {
	css?: string;
	setCss: (content: string) => void;
	reset: () => void
};

export function useCss(key: CssFileType): CssContextResult {
	const context = useContext(CssContext);
	if (!context) {
		throw new Error('useCss must be used within a <CssProvider>');
	}

	return {
		css: context.css[key],
		setCss: (content: string) => context.setCss(key, content),
		reset: () => context.reset(key)
	};
}
