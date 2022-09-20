class VO_LeiChongFanLi {
	public constructor() {
	}
	/**累计充值rmb*/
	lj : number;
	/**活动期数*/
	qs : number;
	/**奖励*/
	reward : any[];
	/**索引id*/
	id : number;
	/**领取状态（0：不可领取，1：可领取，2：已领取 */
	state : number;
	/**当前选择的项 */
	currentIndex : number;
	tips : string;
	public init(cfg)
	{
		this.lj = cfg.lj;
		this.qs = cfg.qs;
		this.reward = cfg.reward;
		this.id = cfg.id;
		this.tips = cfg.tips;
	}

	public getSortIndex(){
		let ret = this.id;
		if(this.state == 1){
			ret -= 10000;
		} else if(this.state == 2){
			ret += 10000;
		}
		return ret;
	}
}