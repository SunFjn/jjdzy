class RewardBackItemVO {
	public constructor() {
	}
	/**铜钱消耗*/
	conmuse;
	/**子副本*/
	fb : number;
	/**所属系统*/
	sys : number;
	/**系数（十万比）*/
	xs : number;
	/**奖励*/
	reward;
	/**元宝消耗*/
	conmuse1;
	/**id*/
	id : number;
	/**名字*/
	name : string;

	/**领取状态 1可领取，2已领取*/
	state : number;

	init(cfg)
	{
		this.conmuse = cfg.conmuse;
		this.conmuse1 = cfg.conmuse1;
		this.fb = cfg.fb;
		this.sys = cfg.sys;
		this.xs = cfg.xs;
		this.reward = cfg.reward;
		this.id = cfg.id;
		this.name = cfg.name;
	}

	public sortIndex(){
		let ret = this.id;
		if(this.state == 1){
			ret -= 10000;
		} else if(this.state == 2){
			ret += 10000;
		}
		return ret;
	}
}