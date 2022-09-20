class Vo_Activity {
	public constructor() {
	}

	// public readMsg(d:BaseBytes):void{
	// 	this.index = d.readInt();
	// 	this.id = d.readInt();
	// 	this.qs = d.readInt();
	// 	this.start = d.readInt();
	// 	this.end = d.readInt();
	// }
	public setData(groupId: number, index: number, id: number, qishu: number, start: number, end: number) {
		const self = this;
		self.groupId = groupId;
		self.index = index;
		self.id = id;
		self.qs = qishu;
		self.start = start;
		self.end = end;
		let cfg = Config.huodong_009[index];
		if (cfg) {
			self.sortNum = cfg.px;
			self.icon = cfg.icon + "";
		}
	}
	// public recover() {
	// 	const self = this;
	// 	self.setData(0, 0, 0, 0, 0, 0);
	// 	Vo_Activity.pool.push(self);
	// }
	public groupId: number;
	public index: number;
	public id: number;
	public qs: number;
	public start: number;//开始时间
	public end: number;//结束时间

	/** 活动状态 0：关闭 1：开启 */
	public status: number = 0;
	/** 活动排序 */
	public sortNum = 0;
	/** 活动图标 */
	public icon = "";

	private static pool = [];
	/**前端添加 */
	public static create() {
		// return this.pool.pop() || new Vo_Activity();
		return new Vo_Activity();
	}

	/**获取活动剩余时间 秒*/
	public getSurTime() {
		switch (this.id) {
			case UIConst.XIAOFEIPH:
				return this.end - Math.ceil(Model_GlobalMsg.getServerTime() / 1000) - 86400 * Config.xtcs_004[5301].num;
			case UIConst.SG_ZHUANPAN:
				return this.end - Math.ceil(Model_GlobalMsg.getServerTime() / 1000) - 86400 * Config.xtcs_004[5302].num;
			default:
				return Math.ceil((this.end * 1000 - Model_GlobalMsg.getServerTime()) / 1000);
		}

	}
}