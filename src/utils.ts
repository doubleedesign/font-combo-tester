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