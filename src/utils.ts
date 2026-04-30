import { chain } from 'lodash';
import type { FontAdjustments, FontMetrics } from './types.ts';

export function extractFontFaceDeclarationData(css: string): Record<string, string>[] {
	let chunkIndex = 0;
	const chunks = chain(css.split('\n'))
		.groupBy((line: string | string[]) => {
			if (line.includes('@font-face')) chunkIndex++;

			return chunkIndex;
		})
		.values()
		.value();

	const cssLines = chunks.map(chunk => chunk.slice(1, -1)).filter(chunk => chunk.length > 1);

	return cssLines.map(chunk => {
		return chunk.reduce((acc, line) => {
			const [property, value] = line.split(':').map(part => part.trim());
			// Skip the src field because we're not using it and excluding it makes it easier to split the other lines
			if(property === 'src') return acc;

			if (property && value) {
				//@ts-expect-error TS7053: Element implicitly has an any type because expression of type string can't be used to index type {}
				acc[property] = value.replace(/;$/, ''); // Remove trailing semicolon
			}

			return acc;
		}, {});
	});
}

export function updateFontData(originalMetrics: FontMetrics, adjustments: FontAdjustments): FontMetrics {
	if(!actualAdjustments(adjustments)) return originalMetrics;

	const { baseline, xHeight, capHeight, ascender, descender } = originalMetrics;
	const { sizeAdjust = 100, ascenderOverride = 0, descenderOverride = 0 } = adjustments;

	// e.g., 120% → 1.2
	const sizeScale = sizeAdjust / 100;

	// Scale proportional metrics according to the scaled-down size adjustment (e.g., if sizeAdjust is 85%, scale by 0.85)
	const scaledXHeight   = xHeight   * sizeScale;
	const scaledCapHeight = capHeight * sizeScale;
	const scaledAscender  = ascender  * sizeScale;
	const scaledDescender = descender * sizeScale;

	// TODO: Account for ascender and descender overrides

	return {
		baseline,
		xHeight:    scaledXHeight,
		capHeight:  scaledCapHeight,
		ascender:   scaledAscender,
		descender:  scaledDescender
	};
}

function actualAdjustments(maybeAdjustments: FontAdjustments): FontAdjustments|null {
	if(Object.values(maybeAdjustments).every(value => value === undefined)) {
		return null;
	}

	if(maybeAdjustments.sizeAdjust === 100 && !maybeAdjustments.ascenderOverride && !maybeAdjustments.descenderOverride) {
		return null;
	}

	return maybeAdjustments;
}

export function tidyCss(css: string): string {
	// Remove charset declarations
	const result = css.replace('@charset "UTF-8";', '');

	// Remove empty lines at the start and end of the string
	const lines = result.split('\n');
	while (lines.length > 0 && lines[0].trim() === '') {
		lines.shift();
	}
	while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
		lines.pop();
	}

	// Find any source map comments remove them
	const sourceMapIndex = lines.findIndex(line => line.trim().startsWith('/*# sourceMappingURL='));
	if (sourceMapIndex !== -1) {
		lines.splice(sourceMapIndex, 1);
	}

	let trimmedLines = addEmptyLineAfter('}', lines, ['}']);
	trimmedLines = addEmptyLineBefore('@layer', trimmedLines);
	trimmedLines = addEmptyLineBefore('@media', trimmedLines);
	trimmedLines = addEmptyLineBefore(':root', trimmedLines, ['@layer', '@media']);

	return trimmedLines.join('\n');
}

function addEmptyLineBefore(token: string, lines: string[], ifNotAfter?: string[]): string[] {
	const resultLines: string[] = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Don't add an empty line if the previous line is empty
		const prevIsEmpty = i > 0 ? lines[i - 1].trim() === '' : true;
		// Don't add an empty line if the previous line contains any of the specified tokens
		const shouldNotAddEmptyLine = ifNotAfter && i > 0 && ifNotAfter.some(t => lines[i - 1].includes(t));

		if (line.includes(token) && !prevIsEmpty && !shouldNotAddEmptyLine) {
			resultLines.push('');
		}

		resultLines.push(line);
	}

	return resultLines;
}

function addEmptyLineAfter(token: string, lines: string[], ifNotFollowedBy?: string[]): string[] {
	const resultLines: string[] = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		resultLines.push(line);

		// Don't add an empty line if the next line is already empty
		const nextIsEmpty = i < lines.length - 1 ? lines[i + 1].trim() === '' : true;
		// Don't add an empty line if the next line contains any of the specified tokens
		const shouldNotAddEmptyLine = ifNotFollowedBy && i < lines.length - 1 && ifNotFollowedBy.some(t => lines[i + 1].includes(t));

		if (line.includes(token) && !nextIsEmpty && !shouldNotAddEmptyLine) {
			resultLines.push('');
		}
	}

	return resultLines;
}