/**霸体状态*/
class BaTiState {
	private static POOL = [];
	public static create(): BaTiState {
		var p = BaTiState.POOL;
		if (p.length) {
			return p.shift();
		}
		return new BaTiState();
	}

	public constructor() {
	}

	public role: SceneCharRole;
	public lifeTime = 0;
	public maxTime = 1000;
	public update(ctx) {
		this.lifeTime += ctx.dt;
		if (this.lifeTime >= this.maxTime) {
			ctx.d = 1;
		}
	}

	public onAdd() {
		this.lifeTime = 0;
		this.maxTime = Config.changshu_101[2].num/100;
		this.role.immuneHSt++;
		this.role.view.alpha = 0.75;
	}

	public onRemove() {
		this.role.immuneHSt--;
		this.role.view.alpha = 1;
		this.role = null;
		this.maxTime = 1000;
		BaTiState.POOL.push(this);
	}

	public onEvent(evt, arg) {

	}
}