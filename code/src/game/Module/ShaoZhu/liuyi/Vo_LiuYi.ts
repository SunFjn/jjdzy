class Vo_LiuYi {
	public constructor() {
	}

	public szId//少主
	public xtId//学堂
	public lyArr: Vo_LiuYi_LY[];//六艺

	cfg: Isonsixschool_267

	public readMsg(data: BaseBytes) {
		let s = this;
		s.szId = data.readInt();
		s.xtId = data.readByte();
		s.lyArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v = new Vo_LiuYi_LY();
			v.readMsg(data)
			s.lyArr.push(v)
		}
		s.initCfg();
	}

	public initCfg() {
		let s = this;
		s.cfg = Config.sonsixschool_267[s.xtId]
		s._openSix = {}
		let six: number[] = JSON.parse(s.cfg.six)[0];
		for (let i = 0; i < six.length; i++) {
			s._openSix[six[i]] = true;
		}
	}

	public initSt() {
		let s = this;
		for (let i = 0; i < s.lyArr.length; i++) {
			s.lyArr[i].st = 0;
		}
	}
	public _openSix
	public get openSix() {
		return this._openSix
	}
}