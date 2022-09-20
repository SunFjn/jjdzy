class Vo_LiuYi_LY {
	public constructor() {
	}

	lyId: number
	lyLv: number
	st: number
	ks: number
	cfg: Isonsix_267

	public readMsg(data: BaseBytes) {
		let s = this;
		s.lyId = data.readByte();
		s.lyLv = data.readInt();
		s.st = data.readByte();
		s.initCfg();
	}

	public initCfg() {
		let s = this;
		let id = s.lyId * 1000 + s.lyLv
		s.cfg = Config.sonsix_267[id];
	}

	public initData(id) {
		let s = this;
		s.lyId = id;
		s.lyLv = 0;
		s.st = 0;
		s.initCfg();
	}
}