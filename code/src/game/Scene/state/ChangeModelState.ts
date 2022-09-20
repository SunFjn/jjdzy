class ChangeModelState {
	private static POOL = [];
	public static create(): ChangeModelState {
		var p = ChangeModelState.POOL;
		if (p.length) {
			return p.shift();
		}
		return new ChangeModelState();
	}

	public constructor() {
	}

	public role: SceneCharRole;
	public remainTime = 2500;
	public autoRemove = 1;//自动移除
	public isWorking: boolean = false;
	public shakex = 1;
	public shakeInterv = 0;

	public update(ctx) {
		var self = this;
		self.remainTime -= ctx.dt;
		if (self.remainTime <= 0) {
			ctx.d = 1;
		}
	}

	public onAdd() {
		let self = this;
		var role = self.role;
		role.dizz_state++;
		role.invalid |= 1;
		role.endSkill();
		self.isWorking = true;
		EffectMgr.addEff("eff/500033/ani", role.view, 0, self.role.namey - self.role.h, 1000, 1000, false,1,Main.skill_part_type);
	}

	public onRemove() {
		let s = this;
		if (s.role) {
			if (s.role.dizz_state > 0) {
				s.role.dizz_state--;
			} else {
				s.role.dizz_state = 0;
			}
			s.role.changeModel = 0;
			s.role.setPlayTime();
			s.role = null;
		}
		s.isWorking = false;
		if (ChangeModelState.POOL.indexOf(this) == -1) ChangeModelState.POOL.push(s);
	}

	public onEvent(evt, arg) {

	}
}