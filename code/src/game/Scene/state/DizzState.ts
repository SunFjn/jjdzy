/**定身眩晕状态 */
class DizzState {

	private static POOL = [];
	public static create(): DizzState {
		var p = DizzState.POOL;
		if (p.length) {
			return p.shift();
		}
		return new DizzState();
	}

	public constructor() {
	}

	public role: SceneCharRole;
	public remainTime = 2500;
	public autoRemove = 1;//自动移除
	public isWorking: boolean = false;
	public shakex = 1;
	public shakeInterv = 0;
	/**1定身2眩晕 */
	public state: number = 0;
	public eff: Part;

	public update(ctx) {
		var self = this;
		self.remainTime -= ctx.dt;
		if (self.remainTime <= 0) {
			ctx.d = 1;
		}

		if (self.eff && self.role) {
			self.eff.mc.y = self.role.namey - self.role.h;
		}
	}

	public onAdd() {
		let self = this;
		var role = self.role;
		role.dizz_state++;
		role.invalid |= 1;
		role.endSkill();
		self.isWorking = true;
		if (self.eff) {
			EffectMgr.instance.removeEff(self.eff);
			self.eff = null;
			console.log("error");
		}
		switch (self.state) {
			case 1:
			case 2:
				self.eff = EffectMgr.addEff("eff/500014/ani", role.view, 0, self.role.namey - self.role.h, 1000, -1, true,1,Main.skill_part_type);
				break;
		}
	}

	public onRemove() {
		let s = this;
		if (s.role) {
			if (s.role.dizz_state > 0) {
				s.role.dizz_state--;
			} else {
				s.role.dizz_state = 0;
			}
			s.role.setPlayTime();
			s.role = null;
		}
		s.isWorking = false;
		if (s.eff) {
			EffectMgr.instance.removeEff(s.eff);
			s.eff = null;
		}
		if (DizzState.POOL.indexOf(this) == -1) DizzState.POOL.push(s);
	}

	public onEvent(evt, arg) {

	}
}