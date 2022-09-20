class VoEquip implements IGridImpl {
	public constructor() {
	}

	sid: number = 0;
	id: number;
	icon: string;
	get qColor(): number {
		return Color.QUALITYCOLOR[this.quality];
	}
	quality: number;
	count: number = 1;
	name: string;
	cfg: Izhuangbei_204;
	gType: number;
	showEffect: boolean = false;
	paixu: number;
	qh: number = 0;    //当前等级对应的编号
	bs: Array<number> = [0, 0, 0, 0];
	/**额外标识 1显示0默认*/
	extra: number;
	tips: string;

	/**拥有者的装备位置索引 */
	public ownPos: number;
	public basePower: number = 0;
	public starLv: number = 0;
	public zhuHunLv: number = 0;
	public zhuHunExp: number = 0;
	/**装备升星战力 */
	public upstarPower: number = 0;

	//神装洗练
	/**气血洗练 */
	public xlhp = 0;
	/**攻击洗练*/
	public xlatk = 0;
	/**防御洗练 */
	public xldef = 0;

	public initLib(id: number): void {
		this.id = id;
		this.cfg = Config.zhuangbei_204[id];
		this.name = this.cfg.n;
		this.basePower = this.cfg.zhanli;
		this.quality = this.cfg.q;
		this.icon = this.cfg.icon;
		this.paixu = this.cfg.paixu;
		this.tips = this.cfg.tips;
		if (this.quality >= 5) {
			this.showEffect = true;
		}
		this._baseAttr = null;
	}

	/**装备穿戴等级 */
	_lev: number = -1;
	get level(): number {
		if (this._lev == -1) {
			var lv = JSON.parse(this.cfg.lv)
			this._lev = Number(lv[0][1]);
			this._zs = Number(lv[0][0]);
		}
		return this._lev;
	}
	/**装备转生 */
	_zs: number = -1
	get zs(): number {
		if (this._zs == -1) {
			var lv = JSON.parse(this.cfg.lv)
			this._lev = Number(lv[0][1]);
			this._zs = Number(lv[0][0]);
		}
		return this._zs;
	}

	/**虚拟等级 用来比较的 */
	get cmpzsLv(): number {
		return (this.zs + 1) * 1000 + this.level;
	}

	/**外部显示的名称 */
	get gridName(): string {
		return this.name
	}

	get condition(): string {
		var _name: string;
		if (this.zs > 0) {
			_name = Math.floor(this.zs / 1000) + "转";
		} else {
			_name = "Lv." + this.level;
		}
		return _name;
	}

	/**装备部件类型 */
	get type(): number {
		return this.cfg.part;
	}

	get jie(): number {
		return this.cfg.jie;
	}

	/**战斗力 只包过基础属性和额外属性 */
	public getPower(): number {
		let self = this;
		let power = ConfigHelp.powerFormulaArr([[102, self.xlhp], [103, self.xlatk], [104, self.xldef]]);
		power += this.basePower
		return power;
	}

	/**获取装备基础属性 */
	private _baseAttr: Array<any>
	public get baseAttr(): Array<any> {
		if (this._baseAttr == null) {
			this._baseAttr = JSON.parse(this.cfg.attr)
		}
		return this._baseAttr;
	}

	public static create(id: number): VoEquip {
		var vo: VoEquip = new VoEquip();
		vo.initLib(id);
		vo.gType = Enum_Attr.EQUIP;
		return vo;
	}

	public get gemLv(): number {
		let level: number = 0;
		for (let i = 0; i < this.bs.length; i++) {
			let gemcfg = Config.dzgem_209[this.bs[i]];
			if (gemcfg) {
				level += gemcfg.lv;
			}
		}
		return level;
	}
}