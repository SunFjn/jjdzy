class VoPersonalBoss {
	public constructor() {
	}
	count: number = 0;
	rebornTime: number = 0;//复活时间
	isClearance:boolean =false;//是否通关

	name: string;
	id: number;
	condition: any[];
	bossid: number = 0;

	public initLib() {
		let lib = Config.solo_220[this.id];
		this.condition = JSON.parse(lib["con"])[0];
		this.bossid = JSON.parse(lib.boss)[0][1];
	}

	//是否可扫荡
	getClearSt():boolean{
		return this.isClearance && this.count >0&&this.isRefresh();
	}

	get sortIndex() {
		let _sortIndex = this.id;
		if (this.isActi()) {
			_sortIndex += 1000;
			if (this.isRefresh())
				_sortIndex += 1000;
		}else if (!this.isActi()) _sortIndex *= -1;
		return _sortIndex;
	}

	public setTime(val) {
		this.rebornTime = egret.getTimer() + val * 1000;
	}

	public isActi(): boolean {
		let vm = Model_player.voMine;
		let zs = vm.zsID;
		let lv =  Model_LunHui.realLv;
		let hasActi;
		if (this.condition[0] > 0) {
			hasActi = lv >= this.condition[0];
		} else {
			hasActi = zs >= this.condition[1];
		}
		return hasActi;
	}

	public isRefresh(): boolean {
		let has = this.rebornTime < egret.getTimer();
		return has;
	}
}