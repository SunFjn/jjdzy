class Vo_ZhuanPanTarget {
	public cfg: Isgzpmb_261;
	public state: number = 0;
	public constructor() {
	}

	public initCfg(value: number) {
		this.cfg = Config.sgzpmb_261[value];
	}

	public static create(id: number) {
		let vo = new Vo_ZhuanPanTarget();
		vo.initCfg(id);
		return vo;
	}
}