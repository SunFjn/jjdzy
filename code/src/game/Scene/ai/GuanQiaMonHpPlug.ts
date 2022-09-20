class GuanQiaMonHpPlug {

	public static P:GuanQiaMonHpPlug[] = [];
	public static create() {
		var pool = GuanQiaMonHpPlug.P;
		return pool.length ? pool.pop() : new GuanQiaMonHpPlug();
	}

	public autoRemove = 1;
	
	public constructor() {
	}

	public role:SceneCharRole;
	public lt:number;

	public update(ctx) {
		var now = egret.getTimer()
		if(now - this.lt >= 3000) {
			if(this.role.curhp > 1) {
				this.role.curhp = 1;
			}
			ctx.d = 1;
		}
	}

	public onAdd() {
		this.lt = egret.getTimer();
	}

	public onRemove() {
		GuanQiaMonHpPlug.P.push(this);
	}

	public onEvent(evt, arg) {
	}
}