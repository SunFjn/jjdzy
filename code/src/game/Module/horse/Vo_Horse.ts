class Vo_Horse {
	public constructor() {
	}

	id: number;//坐骑id
	_star: number;//坐骑升星id 
	_lv: number;//坐骑升级id

	/** 幻化id */
	hhId: number = 0;

	cfg: Izq_773;

	cfgLv: Izqsj_773;
	cfgStar: Izqsx_773;
	isAct = false;

	public init(cfg: Izq_773) {
		let s = this;
		s.cfg = cfg
		s.id = cfg.id;
		s.isAct = false;
		s.setStar(s.quality * 1000 + 0);
		s.setLv(s.quality * 100000 + 0);
		if (cfg.type == EnumHorse.TYPE_HH) {
			s.hhId = s.id * 1000; //初始化幻化id
		}
	}

	/** 移动速度 */
	public get speed(): number {
		let t = this;
		let t_speed = 0;
		switch (t.cfg.type) {
			case EnumHorse.TYPE_COMMON:
				t_speed = t.cfgStar.ydsd;
				break;
			case EnumHorse.TYPE_HH:
				t_speed = t.cfg.speed;
				break;
		}
		return t_speed;
	}

	/** 幻化配置 */
	public get cfgHH(): Ihorsepy_507 {
		return Config.horsepy_507[this.hhId];
	}

	/** 下一级幻化配置 */
	public get nextCfgHH(): Ihorsepy_507 {
		return Config.horsepy_507[this.cfgHH.next];
	}


	public setLv(v) {
		let s = this;
		s._lv = v;
		s.cfgLv = Config.zqsj_773[v];
	}

	public get lv() {
		return this._lv % 100000
	}

	public setStar(v) {
		let s = this;
		s._star = v;
		s.cfgStar = Config.zqsx_773[v]
	}

	public get star() {
		return this._star % 1000
	}

	public get quality() {
		return this.cfg.quality;
	}

	public get name() {
		return this.cfg.name;
	}

	/** 幻化 阶 */
	public get jie(): number {
		return ~~(this.hhId % 1000 / 10);
	}

	/** 幻化 级 */
	public get ji(): number {
		return this.hhId % 10;
	}

	public get jiejiStr(): string {
		let t = this;
		return t.jie + "阶" + t.ji + "级";
	}

	/** 检查是否可骑乘 */
	public checkCanRide(): boolean {
		let t = this;
		switch (t.cfg.type) {
			case EnumHorse.TYPE_COMMON:
				return t.star >= t.cfg.tiaojian;
			case EnumHorse.TYPE_HH:
				return t.hhId >= t.cfg.tiaojian;
			default:
				return false;
		}
	}

	public checkCanAct(pShowAlert: boolean): boolean {
		let t = this;
		let t_model = GGlobal.model_Horse;
		if (t.cfg.type == EnumHorse.TYPE_HH) {
			let t_ok = true;
			let t_list = JSON.parse(t.cfg.activation);
			for (let v of t_list) {
				let t_id = ~~v[0];
				let t_star = ~~v[1];
				let t_vo = t_model.getHorseVoById(t_id);
				if (!t_vo || t_vo.star < t_star) {
					t_ok = false;
					break;
				}
			}
			return t_ok;
		}
		else
			return false;
	}

	/** 幻化条件列表 */
	public get hhConditionList(): number[][] {
		let t = this;
		if (t.isAct) {
			if (t.cfgHH.up == "0" || t.cfgHH.up == 0) {
				return [];
			}
			else {
				return JSON.parse(t.cfgHH.up);
			}
		}
		else {
			return JSON.parse(t.cfg.activation);
		}
	}

	public get isMaxHH(): Boolean {
		let t = this;
		return t.nextCfgHH ? false : true;
	}

	public checkUpConditionHH(pShowAlert: boolean): boolean {
		let t = this;
		let t_model = GGlobal.model_Horse;
		let t_list = t.hhConditionList;
		let t_ok = true;
		if (t.isMaxHH)
			return false;
		for (let v of t_list) {
			let t_id = ~~v[0];
			let t_star = ~~v[1];
			let t_vo = t_model.getHorseVoById(t_id);
			if (!t_vo || t_vo.star < t_star) {
				t_ok = false;
				if (pShowAlert) {
					if (t.isAct) {
						if (t.cfgHH.next % 10 == 0) {
							ViewCommonWarn.text("升阶条件不满足");
						}
						else {
							ViewCommonWarn.text("升级条件不满足");
						}
					}
					else {
						ViewCommonWarn.text("激活条件不满足");
					}
				}
				break;
			}
		}
		return t_ok;
	}

	public checkConsumeHH(pShowAlert: boolean): boolean {
		let t = this;
		if (!t.isAct)
			return true;
		let t_list = ConfigHelp.makeItemListArr(t.cfgHH.consume);
		let t_itemId = t_list[0].id;
		return FastAPI.checkItemEnough(t_itemId, t_list[0].count, pShowAlert);
	}
}
