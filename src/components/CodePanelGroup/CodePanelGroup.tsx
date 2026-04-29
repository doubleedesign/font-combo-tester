import type { FC } from 'react';
import { CodePanelGroupWrapper } from './CodePanelGroup.styled.ts';
import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	SelectionIndicator
} from 'react-aria-components/Tabs';
import { CodePanel } from '../CodePanel/CodePanel.tsx';
import { SharedElementTransition } from 'react-aria-components';
import { Toolbar } from '../common.ts';

type CodePanelGroupProps = {};

export const CodePanelGroup: FC<CodePanelGroupProps> = () => {
	return (
		<CodePanelGroupWrapper>
			<SharedElementTransition>
				<Tabs defaultSelectedKey="fonts">
					<Toolbar>
						<TabList aria-label="CSS Files">
							<Tab id="fonts">Fonts</Tab>
							<Tab id="tokens">Tokens</Tab>
							<Tab id="styles">Styles</Tab>
							<SelectionIndicator />
						</TabList>
					</Toolbar>
					<TabPanels>
						<TabPanel id="fonts">
							<CodePanel fileType="fonts" />
						</TabPanel>
						<TabPanel id="tokens">
							<CodePanel fileType="tokens" />
						</TabPanel>
						<TabPanel id="styles">
							<CodePanel fileType="styles" />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</SharedElementTransition>
		</CodePanelGroupWrapper>
	);
};
