class Vo_HomeTask {
	public constructor() {
	}

	public id: number;
	public state: number;
	public lib: Ifdrc_019
	public initLib(cfg) {
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

	public get name() {
		return this.lib.name;
	}

	public get icon() {
		return this.lib.icon;
	}

	public get nextto() {
		return this.lib.nextto;
	}

	public get award() {
		return this.lib.award;
	}
}