class InvincibleStateTimer {
	public constructor() {
	}
	private static POOL = [];
	public static create(): InvincibleStateTimer {
		var p = InvincibleStateTimer.POOL;
		if (p.length) {
			return p.shift();
		}
		return new InvincibleStateTimer();
	}

	public role: SceneCharRole;
	public timerRemain = 0;
	public autoRemove = 1;//自动移除
	public isWorking: boolean = false;
	public update(ctx) {
		this.timerRemain -= ctx.dt;
		if (this.timerRemain <= 0) {
			ctx.d = 1;
		}
	}

	public onAdd() {
		this.isWorking = true;
		this.role.invincible = 1;
		this.role.view.alpha = 0.75;
	}

	public onRemove() {
		this.isWorking = false;
		if(DEBUG){
			if(!this.role){
				throw new Error("can't find role");
			}
		}
		if(this.role){
			this.role.invincible = 0;
			this.role.view.alpha = 1;
			this.role = null;
		}
		InvincibleStateTimer.POOL.push(this);
	}

	public onEvent(evt, arg) {
		var role = this.role;
	}
}