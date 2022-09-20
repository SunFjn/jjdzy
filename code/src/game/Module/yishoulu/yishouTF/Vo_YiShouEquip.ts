class Vo_YiShouEquip {
	public cfg: Iystfzb_752;
	public jie = 0;
	public level = 0;
	public color = 1;
	public initLib(id: number) {
		let self = this;
		self.cfg = Config.ystfzb_752[id];
		self.setColor(1000);
		self.setLevel(10000);
	}

	public levelcfg: Iystfsj_752;
	public setLevel(value: number) {
		let self = this;
		self.level = value;
		self.levelcfg = Config.ystfsj_752[value];
	}

	public colorcfg: Iystfsp_752;
	public setColor(value: number) {
		let self = this;
		self.color = value;
		self.colorcfg = Config.ystfsp_752[value];
	}

	public static create(id: number) {
		let vo = new Vo_YiShouEquip();
		vo.initLib(id);
		return vo;
	}
}