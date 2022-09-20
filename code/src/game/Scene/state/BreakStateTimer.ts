/**打断计时器*/
class BreakStateTimer {
	public constructor() {
	}

	private static POOL = [];
	public static create():BreakStateTimer {
		var p = BreakStateTimer.POOL;
		if(p.length) {
			return p.shift();
		}
		return new BreakStateTimer();
	}

	public role:SceneCharRole;
	public timerRemain = 0;
	public totalDmg:number;
	public isWorking:boolean=false;
	public autoRemove = 1;//自动移除

	public update(ctx) {
		this.timerRemain -= ctx.dt;
		if(this.timerRemain <= 0) {
			ctx.d = 1;
		}
	}

	public onAdd() {
		this.isWorking = true;
		this.totalDmg = 0;
		this.timerRemain = 3000;
	}

	public onRemove() {
		this.isWorking = false;
		this.role = null;

		BreakStateTimer.POOL.push(this);
	}

	public onEvent(evt,arg) {
		var role = this.role;
		if(evt == EVT_SC.EVT_HURT && role.curhp > 0) {
			if(!role.immuneDmg && !role.invincible) {//允许收到伤害
				if(!role.immuneHSt) {//允许伤害状态
					if(arg.bt) {//包含打断
						this.timerRemain = 3000;//重置计时器时间
					}
				}

				this.totalDmg += arg.dmgVal;
				if(this.totalDmg >= role.maxhp * 0.2) {//超过气血上限20%
					if(!role.immuneHSt && !role.scene.ignoreBati) {
						role.throw(0,-10);//强制倒地
						var bati = BaTiState.create();//获得霸体
						bati.role = role;
						role.addPlug(bati);
						role.removePlug(this);
					}
				}
			}
		}
	}
}