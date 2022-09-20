class ReduceDefStateTimer {
	public constructor() {
	}
	private static POOL = [];
	public static create(): ReduceDefStateTimer {
		var p = ReduceDefStateTimer.POOL;
		if (p.length) {
			return p.shift();
		}
		return new ReduceDefStateTimer();
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
	}

	public onRemove() {
		this.isWorking = false;
		this.role.reduceDef = 0;
		this.role = null;
		ReduceDefStateTimer.POOL.push(this);
	}

	public onEvent(evt, arg) {
		var role = this.role;
	}
}