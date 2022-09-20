class Vo_HomeGoal {
	public constructor() {
	}

	public id;
	public lib: Ifdmb_019;
	public state;

	initCfg(cfg) {
		let s = this;
		s.lib = cfg;
		s.id = cfg.id
	}

	public sortIndex: number;
	public update() {
		this.sortIndex = this.lib.id;
		if (this.state == 1) {//可领取
			this.sortIndex = this.sortIndex - 1000;
		} else if (this.state == 2) {//已领取
			this.sortIndex = this.sortIndex + 1000;
		}
	}

	public get nextto() {
		return this.lib.nextto
	}

	public get name() {
		return this.lib.name;
	}

	public get fenlei() {
		return this.lib.fenlei;
	}
	public get award() {
		return this.lib.award;
	}

}