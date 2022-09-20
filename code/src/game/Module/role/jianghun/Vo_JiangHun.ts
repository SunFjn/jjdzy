class Vo_JiangHun {
	/** 将魂ID*/
	public ID: number;
	/** 名称*/
	public name: string;
	/** 分类*/
	public type: number;
	/** 品质*/
	public quality: number;
	/** 头像*/
	public pic: number;
	/** 激活*/
	public activationArr: Array<any> = [];
	public exp: number;
	public constructor() {
	}

	public initcfg(id: number): void {
		let cfg = Config.general_006[id];
		this.ID = cfg.ID;
		this.name = cfg.name;
		this.type = cfg.type;
		this.quality = cfg.quality;
		this.pic = cfg.pic;
		this.activationArr = JSON.parse(cfg.activation);
		//判断将魂是否激活
	}

	public attArr: Array<any> = [];
	public next: number;
	public consumeArr: Array<any> = [];
	public power: number = 0;
	//类型*10000+品质*1000+等级
	private _level: number = 0;
	public set level(value: number) {
		let cfg = Config.genlv_006[value];
		this._level = cfg.lv;
		if (cfg.attr != "0") {
			this.attArr = JSON.parse(cfg.attr);
		}
		this.next = cfg.next;
		this.consumeArr = JSON.parse(cfg.consume);
		this.power = cfg.power;
	}

	public get level(): number {
		return this._level;
	}

	public get isJiHuo(): boolean {
		if (this.level > 0) {
			return true
		}
		return Model_RunMan.getIsPass(this.activationArr[0][0], this.activationArr[0][1]);
	}

	public static create(id: number): Vo_JiangHun {
		let vo: Vo_JiangHun = new Vo_JiangHun();
		vo.initcfg(id);
		return vo;
	}
}