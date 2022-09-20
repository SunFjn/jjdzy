class Vo_HomeMaid {
	public constructor() {
	}

	public id = 0;
	private _star = 0;
	private _lv = 0;
	public exp = 0;
	public isAct = false
	public cfg: Ishinv_020;
	public cfgStar: Isnsx_020;
	public cfgLv: Isnsj_020;

	public init(cfg: Ishinv_020) {
		let s = this;
		s.cfg = cfg
		s.id = cfg.id;
		s.isAct = false;
		s.setStar(0)
		s.setLv(0)
	}

	public setLv(v) {
		let s = this;
		s._lv = v;
		s.cfgLv = Config.snsj_020[s.quality * 10000 + v];
	}

	public get lv() {
		return this._lv;
	}

	public setStar(v) {
		let s = this;
		s._star = v;
		s.cfgStar = Config.snsx_020[s.quality * 1000 + v]
	}

	public get star() {
		return this._star
	}

	public get quality() {
		return this.cfg.pinzhi;
	}

	public get name() {
		return this.cfg.mingzi;
	}
}