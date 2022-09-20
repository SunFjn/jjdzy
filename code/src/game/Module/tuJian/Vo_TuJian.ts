class Vo_TuJian {
	public constructor() {
	}

	public quality: number;
	public ID: number;
	public name: string;
	public type: number;
	public pic: number;
	/**激活消耗 */
	public activation_jihuo: Array<any> = [];
	/**激活属性 */
	public attr_jihuo: Array<any> = [];
	public source: string;
	public power0: number = 0;
	public cfg: any;
	public initConfig(id: number): void {
		this.cfg = Config.picture_005[id];
		this.ID = id;
		this.type = this.cfg.type;
		this.name = this.cfg.name;
		this.pic = this.cfg.pic;
		this.quality = this.cfg.quality;
		this.activation_jihuo = JSON.parse(this.cfg.activation);
		this.attr_jihuo = JSON.parse(this.cfg.attr);
		this.source = this.cfg.get;
		this.power0 = this.cfg.power;
	}

	public isJiHuo: boolean = false;
	public starLv: number = 0;
	public attr_star: Array<any> = [];
	public consume_star: Array<any> = [];
	public des_star: string;
	public next_star: number;
	/**星级战力 */
	public power1: number = 0;
	public levelMax: number;
	public _starID: number = 0;
	public set starID(value: number) {
		this._starID = value;
		let cfg = Config.picstar_005[value];
		this.starLv = cfg.lv;
		this.attr_star = JSON.parse(cfg.attr);
		this.consume_star = JSON.parse(cfg.consume);
		this.next_star = cfg.next;
		this.levelMax = cfg.lvmax;
		this.des_star = cfg.describe;
		this.power1 = cfg.power;
	}

	public get starID(): number {
		return this._starID;
	}

	public attr_level: Array<any> = [];
	public consume_level: Array<any> = [];
	public power2: number = 0;
	public level: number;
	public next_level: number;
	private _levelID: number;
	public set levelID(value: number) {
		this._levelID = value;
		let cfg = Config.piclv_005[value];
		this.level = cfg.lv;
		if (cfg.attr != "0") {
			this.attr_level = JSON.parse(cfg.attr);
		} else {
			this.attr_level = [];
		}

		if (cfg.consume != "0") {
			this.consume_level = JSON.parse(cfg.consume);
		} else {
			this.consume_level = [];
		}

		this.next_level = cfg.next;
		this.power2 = cfg.power;
	}

	public get levelID(): number {
		return this._levelID;
	}

	public static create(id: number): Vo_TuJian {
		let vo: Vo_TuJian = new Vo_TuJian();
		vo.initConfig(id);
		return vo;
	}
}