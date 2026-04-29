import {
	Checkbox,
	CheckboxGroup,
	Label,
	Radio, RadioGroup,
} from 'react-aria-components';
import { PreviewPanelInput, PreviewPanelToolbar, PreviewPanelWrapper } from './PreviewPanel.styled.ts';
import { useState } from 'react';
import PreviewContent from '../PreviewContent/PreviewContent.tsx';
import { StyledButton } from '../common.ts';

export const PreviewPanel = () => {
	const sizes = ['sm', 'base', 'md', 'lg', 'xl', 'xxl', 'display'];
	const families = ['body', 'headings', 'accent'];
	const [size, setSize] = useState('md');
	const [family, setFamily] = useState(['body', 'accent']);
	const [zoom, setZoom] = useState(200);

	const sizeOptions = sizes.map((size) => ({ id: size, name: size }));

	return (
		<PreviewPanelWrapper>

			<PreviewPanelToolbar>
				<PreviewPanelInput>
					<RadioGroup orientation="horizontal" onChange={(key) => setSize(key)} defaultValue={size}>
						<Label>Size</Label>
						{sizeOptions.map((option) => (
							<Radio key={option.id} value={option.id}>
								{option.name}
							</Radio>
						))}
					</RadioGroup>
				</PreviewPanelInput>

				<PreviewPanelInput>
					<CheckboxGroup value={family} onChange={setFamily}>
						<Label>Families</Label>
						{families.map((family) => (
							<Checkbox key={family} value={family} isReadOnly={family === 'body'}>
								{({ isSelected }) => (
									<>
										{/* eslint-disable-next-line max-len */}
										{ /* <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--> */}
										{/* eslint-disable-next-line max-len */}
										<span className="checkbox">{isSelected ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg> : ''}</span>
										<span>{family}</span>
									</>
								)}
							</Checkbox>
						))}
					</CheckboxGroup>
				</PreviewPanelInput>

				<PreviewPanelInput>
					<div className="range-selector">
						<Label htmlFor="zoom">Zoom</Label>
						<input
							id="zoom"
							type="range"
							min="50"
							max="300"
							value={zoom}
							onChange={(e) => setZoom(Number(e.target.value))}
						/>
						<span>{zoom}%</span>
						<StyledButton aria-label="Reset preview zoom to 100%" $styleType="subtle" onClick={() => setZoom(100)} aria-selected={zoom === 100}>
							100%
						</StyledButton>
						<StyledButton aria-label="Reset preview zoom to 200%" $styleType="subtle" onClick={() => setZoom(200)} aria-selected={zoom === 200}>
							200%
						</StyledButton>
					</div>
				</PreviewPanelInput>

			</PreviewPanelToolbar>

			<PreviewContent zoomLevel={zoom} size={size} families={family} />

		</PreviewPanelWrapper>
	);
};