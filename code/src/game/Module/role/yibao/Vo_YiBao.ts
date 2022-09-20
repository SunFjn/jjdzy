class Vo_YiBao {
	public constructor() {
	}
	/**id** */
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
	/**	战力	** */
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
	/**效果 */
	public xgArr: Array<any> = [];
	/**升星效果 */
	public starxgArr: Array<any> = [];
	/**星级 */
	public starLv: number = 0;
	/**0可激活 1激活2未激活 */
	public state = 0;
	public cfg: Iyb_217;
	public initcfg(id: number): void {
		let self = this;
		self.id = id;
		let cfg = Config.yb_217[id];
		self.name = cfg.name;
		self.icon = cfg.icon;
		self.imageID = cfg.pic;
		self.quality = cfg.pin;
		self.attArr = JSON.parse(cfg.attr1);
		self.starAttArr = JSON.parse(cfg.starattr1);
		self.power = cfg.power;
		self.starPower = cfg.starpower;
		self.costArr = JSON.parse(cfg.item);
		self.drugMax = cfg.max;
		self.starMax = cfg.star;
		self.way = cfg.way;
		self.xgArr = JSON.parse(cfg.xg);
		self.starxgArr = JSON.parse(cfg.starxg);
		self.cfg = cfg;
	}

	public static create(id: number): Vo_YiBao {
		let vo: Vo_YiBao = new Vo_YiBao();
		vo.initcfg(id);
		return vo;
	}
}