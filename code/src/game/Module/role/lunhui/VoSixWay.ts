class VoSixWay {
	private _fenJ: number = 0;//0不分解  1分解

	public set fenJ(num:number)
	{
		this._fenJ = num;
	}

	public get fenJ():number
	{
		return this._fenJ;
	}

	public constructor() {
	}

	public pos:number = 0;//装备位置
	public id:number = 0;//装备印记id
	public lv:number = 0;//等级
	public star:number = 0;//星级
	public readEquipMsg(data: BaseBytes) {
		let s = this;
		s.pos = data.readInt();
		s.id = data.readInt();
		s.lv = data.readInt();
		s.star = data.readInt();
		s.initLib();
	}

	// public bagPos:number = 0;//背包位置索引
	public isLock:number = 0;//是否被锁住 0没有1有
	public readBagMsg(data: BaseBytes) {
		let s = this;
		s.pos = data.readInt();
		s.id = data.readInt();
		s.lv = data.readInt();
		s.star = data.readInt();
		s.isLock = data.readInt();
		s.initLib();
	}

	public readMsgBuy(data: BaseBytes) {
		let s = this;
		s.pos = data.readInt();//位置
		s.id = data.readInt();//id
		s.lv = data.readInt();//星级
		s.star = data.readInt();//等级
		s.initLib();
	}

	public copy(): VoSixWay {
		let v = new VoSixWay();
		v.id = this.id;
		v.pos = this.pos;
		v.lv = this.lv;
		v.star = this.star;
		v.fenJ = this.fenJ;
		v.cfg = this.cfg;
		return v;
	}

	public clear() {
		let s = this;
		s.id = 0;
		s.lv = 0;
		s.star = 0;
		s.cfg = null;
		s.fenJ = 0;
	}

	public cfg: Isixdaoyj_505 = null;
	public initLib() {
		let s = this;
		s.cfg = Config.sixdaoyj_505[s.id];
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

	public get power(): number {
		let total:number = 0;
		let power:number = this.cfg ? this.cfg.power1 : 0;
		let lvPower = power * this.lv;
		let id:number = this.id * 100 + this.star;
		let cfg:Isixdaostar_505 = Config.sixdaostar_505[id];
		let starPower = cfg? cfg.power:0;
		total = lvPower + starPower;
		return total;
	}

	public get maxLv(): number {
		return this.cfg ? this.cfg.lv + (this.star - 1) * this.cfg.lvup : 0;
	}

	public get maxStar(): number {
		return this.cfg ? this.cfg.star : 0;
	}

	public get fjNum() {
		let s = this;
		let num:number = 0;
		let cfg:Isixdaolv_505 = Config.sixdaolv_505[s.lv];
		if(s.cfg.pz == 2)
		{
			num = cfg.fj2;
		}else if(s.cfg.pz == 3)
		{
			num = cfg.fj3;
		}else if(s.cfg.pz == 4)
		{
			num = cfg.fj4;
		}else if(s.cfg.pz == 5)
		{
			num = cfg.fj5;
		}else if(s.cfg.pz == 6)
		{
			num = cfg.fj6;
		}else{
			num = cfg.fj8;
		}
		return s.star * s.cfg.fj + num;
	}

	private _attr1: number[][];
	public get attr(): number[][] {
		let s = this;
		if (s._attr1 == null) {
			s._attr1 = JSON.parse(s.cfg.arrt1);
		}
		//属性合并
		let arr = [];
		let starCfg = s.getStarCfg();
		let attr2 = starCfg ? JSON.parse(starCfg.attr) : [];
		for (let i = 0; i < s._attr1.length; i++) {
			let at = s._attr1[i];
			let ty = Number(at[0])
			let val = Number(at[1])
			arr[i] = [];
			arr[i][0] = ty;
			arr[i][1] = val * s.lv;
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

	private getStarCfg(): Isixdaostar_505 {
		let s = this;
		if (s.star > 0) {
			let tpId: string = s.star > 9 ? (s.star + "") : ("0" + s.star)
			let starid = s.id + tpId;
			return Config.sixdaostar_505[starid];
		}
		return null
	}
}