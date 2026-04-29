import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';
import { PreviewPanelSelect, PreviewPanelToolbar, PreviewPanelWrapper } from './PreviewPanel.styled.ts';
import { useEffect, useRef, useState } from 'react';

export const PreviewPanel = () => {
	const sizes = ['sm', 'md', 'lg', 'xl', 'xxl', 'display'];
	const families = ['body', 'headings', 'accent'];
	const [size, setSize] = useState('md');
	const [family, setFamily] = useState('body');

	const sizeOptions = sizes.map((size) => ({ id: size, name: size }));
	const familyOptions = families.map((family) => ({ id: family, name: family }));

	const sizeContainerRef = useRef(null);
	const familyContainerRef = useRef(null);
	const sizeTriggerRef = useRef(null);
	const familyTriggerRef = useRef(null);

	// Ensure the container refs get defined for the popovers, or else they don't render initially
	const [, forceUpdate] = useState(0);
	useEffect(() => {
		forceUpdate(1);
	}, []);

	return (
		<PreviewPanelWrapper>
			<PreviewPanelToolbar>
				<PreviewPanelSelect ref={sizeContainerRef}>
					<Select onChange={(key) => setSize(key)} defaultValue={size}>
						<Label>Size</Label>
						<Button ref={sizeTriggerRef}><SelectValue /></Button>
						<Popover triggerRef={sizeTriggerRef} UNSTABLE_portalContainer={sizeContainerRef?.current}>
							<ListBox items={sizeOptions}>
								{(item) => <ListBoxItem>{item.name}</ListBoxItem>}
							</ListBox>
						</Popover>
					</Select>
				</PreviewPanelSelect>
				<PreviewPanelSelect ref={familyContainerRef}>
					<Select onChange={(key) => setFamily(key) } defaultValue={family}>
						<Label>Family</Label>
						<Button ref={familyTriggerRef}><SelectValue /></Button>
						<Popover triggerRef={familyTriggerRef} UNSTABLE_portalContainer={familyContainerRef?.current}>
							<ListBox items={familyOptions}>
								{(item) => <ListBoxItem>{item.name}</ListBoxItem>}
							</ListBox>
						</Popover>
					</Select>
				</PreviewPanelSelect>
			</PreviewPanelToolbar>
		</PreviewPanelWrapper>
	);
};