class Vo_BaoWu {
	public constructor() {
	}

	/**宝物id** */
	public id: number;
	/**	宝物名字** */
	public name: string = "";
	/**		图标	** */
	public icon: number;
	/**	原画** */
	public imageID: number;
	/**	品质** */
	public quality: number;
	/**	属性** */
	public attArr: Array<any> = [];
	/**	升星属性** */
	public starAttArr: Array<any> = [];
	/**		战力	** */
	public power: number;
	/**	升星战力	* */
	public starPower: number;
	/**	道具技能	*	* */
	public skillVo: Vo_Skill;
	/**	激活（升星）道具* */
	public costArr: Array<any> = [];
	/**	属性丹上限* */
	public drugMax;
	/**	升星上限* */
	public starMax;
	/**0已装备1已装备2可激活 3激活4未激活 */
	public state: number;
	/**获取途径 */
	public way: string;
	public initcfg(id: number): void {
		let self = this;
		self.id = id;
		let cfg = Config.bao_214[id];
		self.name = cfg.name;
		self.icon = cfg.icon;
		self.imageID = cfg.pic;
		self.quality = cfg.pin;
		self.attArr = JSON.parse(cfg.attr);
		self.starAttArr = JSON.parse(cfg.starattr);
		self.power = cfg.power;
		self.starPower = cfg.starpower;
		self.skillVo = Vo_Skill.create(cfg.skill, 1, 1);
		self.costArr = JSON.parse(cfg.item);
		self.drugMax = cfg.max;
		self.starMax = cfg.star;
		self.way = cfg.way;
		self.state = 3;
	}

	/**星级 */
	private _starLv: number = 0;
	public set starLv(value: number) {
		this._starLv = value;
		if (value <= 0) {
			this.skillVo.starLv = this.skillVo.level = 1;
		} else {
			this.skillVo.starLv = this.skillVo.level = value;
		}
		this.skillVo.updatePower();
	}

	public get starLv(): number {
		return this._starLv;
	}

	public static create(id: number): Vo_BaoWu {
		let vo: Vo_BaoWu = new Vo_BaoWu();
		vo.initcfg(id);
		return vo;
	}
}