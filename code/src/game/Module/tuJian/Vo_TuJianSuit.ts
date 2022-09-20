class Vo_TuJianSuit {
	public constructor() {
	}

	//name	lv	need	attr	next	power
	public suitName: string;
	public suitNeed: number
	public suitAttArr: Array<any> = [];
	public suitNext: number;
	public suitPower: number = 0;
	public suitLv: number = 0;
	public type: number = 0;
	public tujianLv: number = 0;
	private _suitID: number;
	public set suitID(value: number) {
		this._suitID = value;
		let cfg = Config.picteam_005[value];
		this.suitLv = cfg.lv;
		this.suitName = cfg.name;
		this.suitNeed = cfg.need;
		if (cfg.attr != "0") {
			this.suitAttArr = JSON.parse(cfg.attr);
		}
		this.suitNext = cfg.next;
		this.suitPower = cfg.power;
		this.type = cfg.type;
	}

	public get suitID(): number {
		return this._suitID;
	}
}