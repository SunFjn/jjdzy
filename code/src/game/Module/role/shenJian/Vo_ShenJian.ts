class Vo_ShenJian {
	public constructor() {
	}
	/**神剑id** */
	public id: number;
	/**	名字** */
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
	/**	激活（升星）道具* */
	public costArr: Array<any> = [];
	/**	属性丹上限* */
	public drugMax;
	/**	升星上限* */
	public starMax;
	/**获取途径 */
	public way: string;
	/**获取途径 */
	public miaoshu: string;
	/**星级 */
	public starLv: number = 0;
	/**0已装备1可激活 2激活3未激活 */
	public state: number = 0;
	public cfg: Isword_216;
	public initcfg(id: number): void {
		let self = this;
		self.id = id;
		let cfg = Config.sword_216[id];
		self.name = cfg.name;
		self.icon = cfg.icon;
		self.imageID = cfg.pic;
		self.quality = cfg.pin;
		self.attArr = JSON.parse(cfg.attr);
		self.starAttArr = JSON.parse(cfg.starattr);
		self.power = cfg.power;
		self.starPower = cfg.starpower;
		self.costArr = JSON.parse(cfg.item);
		self.drugMax = cfg.max;
		self.starMax = cfg.star;
		self.way = cfg.way;
		self.miaoshu = cfg.miaoshu;
		self.cfg = cfg;
	}

	public static create(id: number): Vo_ShenJian {
		let vo: Vo_ShenJian = new Vo_ShenJian();
		vo.initcfg(id);
		return vo;
	}
}