class Vo_JueXing {
	type: number;
	id: number;
	skilllv0: number = 0;
	skilllv1: number = 0;
	skilllv2: number = 0;
	suitLv: number = 0;
	quality;
	icon: number;
	name: string;
	costId: number;
	starLv: number;
	iconUrl: string;
	imageID: number;
	skills: string;
	tptx: number;
	public static create(id, quality, icon, name, costId, starLv, imageID, tptx): Vo_JueXing {
		var ret = Pool.getItemByClass("Vo_JueXing", Vo_JueXing);
		ret.id = id;
		ret.quality = quality;
		ret.icon = icon;
		ret.name = name;
		ret.costId = costId;
		ret.starLv = starLv;
		ret.imageID = imageID;
		ret.tptx = tptx;
		return ret;
	}

	public dispose() {
		let ret = this;
		ret.id = 0;
		ret.quality = 0;
		ret.icon = null;
		ret.name = null;
		ret.costId = 0;
		ret.starLv = 0;
		Pool.recover("Vo_JueXingData", ret);
	}
}