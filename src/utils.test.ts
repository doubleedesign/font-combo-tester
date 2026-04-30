import { updateFontData } from './utils.ts';

const originalMetrics = {
	'baseline': 0,
	'xHeight': 4.26,
	'capHeight': 6.35,
	'ascender': 7.5,
	'descender': -2.5
};

describe('updateFontData', () => {
	it('returns the original metrics if no adjustments are provided (numeric values)', () => {
		const adjustments = {
			sizeAdjust: 100,
			ascenderOverride: 0,
			descenderOverride: 0,
		};

		const updatedMetrics = updateFontData(originalMetrics, adjustments);
		
		expect(updatedMetrics).toEqual(originalMetrics);
	});

	it('returns the original metrics if no adjustments are provided (undefined values)', () => {
		const adjustments = {
			sizeAdjust: undefined,
			ascenderOverride: undefined,
			descenderOverride: undefined,
		};

		const updatedMetrics = updateFontData(originalMetrics, adjustments);

		expect(updatedMetrics).toEqual(originalMetrics);
	});

	it('returns the original metrics if no adjustments are provided (mixed values)', () => {
		const adjustments = {
			sizeAdjust: 100,
			ascenderOverride: undefined,
			descenderOverride: 0,
		};

		const updatedMetrics = updateFontData(originalMetrics, adjustments);

		expect(updatedMetrics).toEqual(originalMetrics);
	});

	it('moves the x-height up if sizeAdjust is more than 100%', () => {
		const adjustments = {
			sizeAdjust: 120,
			ascenderOverride: 0,
			descenderOverride: 0,
		};

		const updatedMetrics = updateFontData(originalMetrics, adjustments);

		expect(updatedMetrics.xHeight).toEqual(originalMetrics.xHeight * 1.2);
	});

	it('moves the x-height down if sizeAdjust is less than 100%', () => {
		const adjustments = {
			sizeAdjust: 80,
			ascenderOverride: 0,
			descenderOverride: 0,
		};

		const updatedMetrics = updateFontData(originalMetrics, adjustments);

		expect(updatedMetrics.xHeight).toEqual(originalMetrics.xHeight * 0.8);
	});

	it('moves the cap-height up if sizeAdjust is more than 100%', () => {
		const adjustments = {
			sizeAdjust: 120,
			ascenderOverride: 0,
			descenderOverride: 0,
		};

		const updatedMetrics = updateFontData(originalMetrics, adjustments);

		expect(updatedMetrics.capHeight).toEqual(originalMetrics.capHeight * 1.2);
	});

	it('moves the cap-height down if sizeAdjust is less than 100%', () => {
		const adjustments = {
			sizeAdjust: 80,
			ascenderOverride: 0,
			descenderOverride: 0,
		};

		const updatedMetrics = updateFontData(originalMetrics, adjustments);

		expect(updatedMetrics.capHeight).toEqual(originalMetrics.capHeight * 0.8);
	});

	// TODO: Account for ascender and descender overrides
	// TODO: What if both ascent and descent override are provided?

});