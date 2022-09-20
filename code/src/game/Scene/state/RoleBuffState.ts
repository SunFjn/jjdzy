class RoleBuffState {
	private static POOL = [];
	public static create(): RoleBuffState {
		var p = RoleBuffState.POOL;
		if (p.length) {
			return p.shift();
		}
		return new RoleBuffState();
	}

	public constructor() {
	}

	public role: SceneCharRole;
	public remainTime = 2500;
	public autoRemove = 1;//自动移除
	public isWorking: boolean = false;
	public shakex = 1;
	public shakeInterv = 0;
	public buffID = 0;
	public eff: Part;
	public buffLv = 0;
	public cfg: Ibuff_011;
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
		self.isWorking = true;
		self.cfg = Config.buff_011[self.buffID];
		if (self.eff) {
			EffectMgr.instance.removeEff(self.eff);
			self.eff = null;
		}
		console.log("添加buffID" + self.buffID);
		if (self.cfg.texiao > 0) {
			switch (self.cfg.wz) {
				case 1:
					self.eff = EffectMgr.addEff("eff/" + self.cfg.texiao + "/ani", role.view, 0, 0, 1000, -1, true,1,Main.skill_part_type);
					break;
			}
		}
	}

	public onRemove() {
		let self = this;
		if (self.eff) {
			EffectMgr.instance.removeEff(self.eff);
			self.eff = null;
		}
		self.isWorking = false;
		if (self.role) {
			self.role.addZhaoYunBuff(0);
			self.role.buffData[self.buffID] = null;
			delete self.role.buffData[self.buffID];
			self.role = null;
		}
		console.log("移除buffID" + self.buffID);
		self.buffLv = 0;
		self.buffID = 0;
		self.cfg = null;
		if (RoleBuffState.POOL.indexOf(self) == -1) RoleBuffState.POOL.push(self);
	}

	public onEvent(evt, arg) {

	}
}