import { type FC, type ReactNode, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { StyleSheetManager } from 'styled-components';

interface ShadowDomWrapperProps {
	stylesheetContent: string;
	children: ReactNode;
}

export const ShadowDomWrapper: FC<ShadowDomWrapperProps> = ({ stylesheetContent, children }) => {
	const hostRef = useRef<HTMLDivElement>(null);
	const [shadowRoot, setShadowRoot] = useState<ShadowRoot>();
	const [styleEl] = useState(() => document.createElement('style'));

	useEffect(() => {
		if (hostRef.current && !hostRef.current.shadowRoot) {
			const root = hostRef.current.attachShadow({ mode: 'open' });
			root.appendChild(styleEl); // styled-components will inject into this where styled components are used within the children
			setShadowRoot(root);
		}
	}, [styleEl]);

	useEffect(() => {
		if (!shadowRoot) {
			return;
		}

		let customStyleEl = shadowRoot.querySelector('style[data-custom]');
		if (!customStyleEl) {
			customStyleEl = document.createElement('style');
			customStyleEl.setAttribute('data-custom', '');
			shadowRoot.appendChild(customStyleEl);
		}
		customStyleEl.textContent = stylesheetContent;
	}, [stylesheetContent, shadowRoot]);

	return (
		<div ref={hostRef}>
			{shadowRoot && createPortal(
				<StyleSheetManager target={styleEl}>
					{children}
				</StyleSheetManager>,
				shadowRoot
			)}
		</div>
	);
};