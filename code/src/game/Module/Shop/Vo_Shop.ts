class Vo_Shop {
	public constructor() {
	}

	/**索引id */
	public id: number;
	/**道具归类 */
	public store: number;
	/**玩家转生刷新范围 */
	public szArr: Array<any> = [];
	/**道具 */
	public itemArr: Array<any> = [];
	/**价格 */
	public moneyArr: Array<any> = [];
	/**原价 */
	public oldmoneyArr: Array<any> = [];
	/**折扣 */
	public off: number;
	/**购买次数 */
	public time: number;
	/**购买条件 */
	public condition: Array<any> = [];
	/**条件描述 */
	public tips: string;
	/**位置 */
	public pos: number;
	/**已购买数量 */
	public buyNum: number;
	public initcfg(id: number): void {
		this.id = id;
		let cfg = Config.list_218[id];
		this.store = cfg.store;
		this.szArr = JSON.parse(cfg.sz);
		this.itemArr = JSON.parse(cfg.item);
		this.moneyArr = JSON.parse(cfg.money);
		this.oldmoneyArr = JSON.parse(cfg.oldmoney);
		this.off = cfg.off;
		this.time = cfg.time;
		if (cfg.condition != "0") this.condition = JSON.parse(cfg.condition);
		this.tips = cfg.tips;
	}

	public static create(id: number): Vo_Shop {
		let vo: Vo_Shop = new Vo_Shop();
		vo.initcfg(id);
		return vo;
	}


	//专属活动
	public static createOnly(id: number): Vo_Shop {
		let vo: Vo_Shop = new Vo_Shop();
		vo.initcfgOnly(id);
		return vo;
	}
	//专属活动
	public initcfgOnly(id: number): void {
		this.id = id;
		let cfg = Config.zshdzssd_315[id];
		this.itemArr = cfg.item;
		this.moneyArr = cfg.money;
		this.pos = cfg.wz;
		this.time = cfg.time;
	}
}