class Vo_BaoKu {
	public id = 0;
	/**宝库ids */
	public bk = 0;
	/**奖励道具 */
	public reward = [];
	/** 消耗道具*/
	public consume = [];
	/**限购次数 */
	public time = 0;
	/**是否为新品 */
	public xinpin = 0;
	/**在周几打9折 */
	public dazhe = 0;
	/**在周几限时 */
	public xianshi = 0;
	/**vip等级购买条件 */
	public vip = 0;
	/**已购买数量 */
	public count = 0;
	/**排序 */
	public sortNum = 0;
	public constructor() {
	}

	public initcfg(id) {
		let self = this;
		self.id = id;
		let cfg = Config.bkitem_236[id];
		self.bk = cfg.bk;
		self.reward = JSON.parse(cfg.reward);
		self.consume = JSON.parse(cfg.consume);
		self.time = cfg.time;
		self.xinpin = cfg.xinpin;
		self.dazhe = cfg.dazhe;
		self.xianshi = cfg.xianshi;
		self.vip = cfg.vip;
		self.sortNum = cfg.px;
	}

	public static create(id): Vo_BaoKu {
		let vo = new Vo_BaoKu();
		vo.initcfg(id);
		return vo;
	}
}