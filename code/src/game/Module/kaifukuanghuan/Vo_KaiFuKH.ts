class Vo_KaiFuKH {
	public constructor() {
	}
	id;
	st = 0;	//领奖状态
	sys;
	type;
	pro = 0;//当前进度
	lib;
	tabIndex;//所属tab
	day;//第几天开放
	/**限量奖励(特殊奖励)状态，0:未达到，1:可领取，2:已领取，3:已抢完 */
	limitSt = 0;	//限量奖励
	/**B:达标奖励状态，0:未达到，1:可领取，2:已领取 */
	reward = 0;		//达标奖励
	/**剩余数量 */
	lastNum = 0;
	init(cfg) {
		this.lib = cfg;
		this.id = cfg.id;
		this.sys = cfg.sys;
		this.type = cfg.type;
		this.tabIndex =  (cfg.id / 1000) >> 0;
		let date = JSON.parse(cfg.open);
		this.day = date[0][0];
	}

	public getSortIndex() {
		let ret = this.id;
		if (this.st == 2) {
			ret += 10000;
		} else if (this.st == 1) {
			ret -= 10000;
		}
		return ret;
	}

	public getSortIndex2(){
		let ret = this.id;
		// if(this.reward == 2 || this.limitSt == 2 || this.limitSt == 3){
		// 	ret += 10000;
		// } else if(this.reward == 1 || this.limitSt == 1){
		// 	ret -= 10000;  
		// }
		if(this.lastNum == 0 && this.reward == 2){ 
			ret += 20000; 
		} else if(this.limitSt == 1){ 
			ret -= 10000;
		} else if (this.reward == 1){
			ret -= 10000; 
		} else if(this.limitSt == 0 || this.reward == 0){
			ret -= 1000;
		} else if(this.reward == 2){
			ret += 10000;
		} else if(this.limitSt == 2){
			ret += 10000; 
		} else if(this.limitSt == 3){
			ret += 10000;
		}
		return ret;
	}
}