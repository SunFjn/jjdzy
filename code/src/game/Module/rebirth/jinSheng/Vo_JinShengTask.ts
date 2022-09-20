class Vo_JinShengTask {
	/**任务id */
	public id: number;
	/**后置任务 */
	public next: number;
	/**任务开启条件（通关关卡数） */
	public open: number;
	/**任务类型 */
	public type: number;
	/**任务参数1 */
	public can1: number;
	/**任务参数2 */
	public can2: number;
	/**任务官职经验 */
	public exp: number;
	/**任务元宝奖励 */
	public yb: number;
	/**任务条件 */
	public tips: string;
	/**跳转界面 */
	public ui: number;
	/**当前进度 */
	public curCount: number;
	/**领取状态 */
	public state: number;
	/**最大 */
	public max: number;
	/**开服天数 */
	public kfDay: number;
	public constructor() {
	}

	public initcfg(id): void {
		let self = this;
		self.id = id;
		let cfg = Config.uptask_231[id];
		self.next = cfg.next;
		self.open = cfg.open;
		self.type = cfg.type;
		self.can1 = cfg.can1;
		self.can2 = cfg.can2;
		self.exp = cfg.exp;
		self.yb = cfg.yb;
		self.tips = cfg.tips;
		self.ui = cfg.ui;
		self.kfDay = cfg.time;
	}

	public static create(id): Vo_JinShengTask {
		let vo: Vo_JinShengTask = new Vo_JinShengTask();
		vo.initcfg(id);
		return vo;
	}
}