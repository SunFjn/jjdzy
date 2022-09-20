class VoBaZhenTu {
	public constructor() {
	}

	public pos: number = 0;
	public id: number = 0;
	public level: number = 0;
	public starLv: number = 0;
	public locked: number = 0;

	public copy(): VoBaZhenTu {
		let v = new VoBaZhenTu();
		v.pos = this.pos;
		v.id = this.id;
		v.level = this.level;
		v.starLv = this.starLv;
		v.locked = this.locked;
		v.fenJ = this.fenJ;
		v.cfg = this.cfg;
		return v;
	}

	public clear() {
		// this.pos = 0;
		this.id = 0;
		this.level = 0;
		this.starLv = 0;
		this.locked = 0;
		this.fenJ = 0;
		this.cfg = null;
	}

	public readMsg(data: BaseBytes) {
		this.pos = data.readByte();//位置
		this.id = data.readInt();//符文id
		this.level = data.readInt();//符文等级
		this.starLv = data.readInt();//符文星级
		this.initLib();
	}


	public readMsgBag(data: BaseBytes) {
		this.pos = data.readInt();//位置
		this.id = data.readInt();//符文id
		this.level = data.readInt();//符文等级
		this.starLv = data.readInt();//符文星级
		this.locked = data.readByte();//锁
		this.initLib();
	}

	public readMsgBuy(data: BaseBytes) {
		this.pos = data.readInt();//位置
		this.id = data.readInt();//符文id
		this.starLv = data.readInt();//符文星级
		this.level = data.readInt();//符文等级
		this.locked = 0;//锁
		this.initLib();
	}
	public fenJ: number = 0;//0不分解  1分解
	public cfg: Ibztzf_261 = null;
	public initLib() {
		let s = this;
		s.cfg = Config.bztzf_261[s.id];
	}

	public get name(): string {
		return this.cfg ? this.cfg.name : "";
	}

	public get colorName() {
		return ConfigHelp.createColorName(this.name, this.pz)
	}
	public get pz(): number {
		return this.cfg ? this.cfg.pz : 0;
	}
	public get icon() {
		return this.cfg ? this.cfg.icon : "";
	}
	public get type(): number {
		return this.cfg ? this.cfg.type : 0;
	}

	public get maxStar(): number {
		return this.cfg ? this.cfg.star : 0;
	}

	public get maxLv(): number {
		return (this.starLv - 1) * this.cfg.lv + this.cfg.lv1
	}

	public get maxmaxLv(): number {
		return (this.maxStar - 1) * this.cfg.lv + this.cfg.lv1
	}

	public get power(): number {
		if (!this.cfg) {
			return 0;
		}
		let starCfg = this.getStarCfg();
		let starPower = starCfg ? starCfg.power : 0
		return this.level * this.cfg.power1 + starPower;
	}

	public get fjExp() {
		let fj = Config.bztlv_261[this.level]
		return fj["fj" + this.pz] + this.starLv * this.cfg.fj
	}

	public get fjGod() {
		if (this.cfg.sp == 0) return 0;
		return this.starLv * (JSON.parse(this.cfg.sp)[0][2])
	}

	public get tipDes() {
		return "分解后可获得" + this.fjExp + "符文经验"
	}

	// private _attr: number[][];
	private _attr1: number[][];
	public get attr(): number[][] {
		if (this._attr1 == null) {
			this._attr1 = JSON.parse(this.cfg.arrt1);
		}
		//属性合并
		let arr = [];
		let starCfg = this.getStarCfg();
		let attr2 = starCfg ? JSON.parse(starCfg.attr) : [];
		for (let i = 0; i < this._attr1.length; i++) {
			let at = this._attr1[i];
			let ty = Number(at[0])
			let val = Number(at[1])
			arr[i] = [];
			arr[i][0] = ty;
			arr[i][1] = val * this.level;
			for (let k = 0; k < attr2.length; k++) {
				let at2 = attr2[k];
				let ty2 = Number(at2[0])
				let val2 = Number(at2[1])
				if (ty2 == ty) {
					arr[i][1] += val2;
					break;
				}
			}
		}
		//有新属性
		let newArr = []
		for (let k = 0; k < attr2.length; k++) {
			let at2 = attr2[k];
			let ty2 = Number(at2[0])
			let val2 = Number(at2[1])
			let hasNew = true
			for (let i = 0; i < this._attr1.length; i++) {
				let at = this._attr1[i];
				let ty = Number(at[0])
				let val = Number(at[1])
				if (ty2 == ty) {
					hasNew = false;
					break;
				}
			}
			if (hasNew) { newArr.push([ty2, val2]); }
		}
		arr = arr.concat(newArr);
		return arr;
	}

	private getStarCfg(): Irunestar_261 {
		if (this.starLv > 0) {
			let tpId: string = this.starLv > 9 ? (this.starLv + "") : ("0" + this.starLv)
			let starid = this.id + tpId
			return Config.runestar_261[starid];
		}
		return null
	}
}