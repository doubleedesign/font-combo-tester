export type FontMetrics = {
	baseline: number;
	xHeight: number;
	capHeight: number;
	ascender: number;
	descender: number;
};

export type FontAdjustments = {
	sizeAdjust?: number;
	ascenderOverride?: number;
	descenderOverride?: number;
};