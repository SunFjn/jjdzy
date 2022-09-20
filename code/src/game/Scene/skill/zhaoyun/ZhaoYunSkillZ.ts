class ZhaoYunSkillZ extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):ZhaoYunSkillZ {
		var ret:ZhaoYunSkillZ = new ZhaoYunSkillZ();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public constructor() {
		super();
	}

	public CFGTIME = 600;
	public EFFECTTIME = 300;

	public lifeTime = 0;

	public attackIndex = 1;

	public eff:Part;
	public effid;

	public update(ctx) {
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.EFFECTTIME && this.lifeTime < this.EFFECTTIME) {
			this.dealHurt();
		}
		if(nt >= this.CFGTIME) {
			ctx.d = 1;
		}
		this.role.scene.moveRole(this.role, this.role.faceDir * 10, 0, 0);
		if(this.effid) {
			var effperc = this.lifeTime / this.CFGTIME;
			if(effperc > 1) {
				effperc = 1;
			}
			this.eff.setPec(effperc);
		}
		//this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
		this.lifeTime = nt;
	}


	public onAdd() {
		this.effid = null;
		this.CFGTIME = 400;
		this.EFFECTTIME = 200;

		//this.effid = "eff/1_1";
		if(this.effid) {
			this.eff = new Part();
			this.eff.setVal(this.effid);
			this.eff.setAct(1);
			this.eff.setPec(0);
			this.eff.mc.y = 20;
			this.eff.mc.scaleX = this.role.faceDir;
			this.role.view.addChild(this.eff.mc);
		}

		this.role.attack_index = 11;
		this.role.attack_state++;
		this.role.invalid |= 1;
		this.role.setPlayTime(this.CFGTIME,false);
	}

	public onRemove() {
		super.onRemove();
		if(this.effid) {
			this.role.view.removeChild(this.eff.mc);
			this.effid = null;
		}

		this.role.attack_state--;
		this.role.invalid |= 1;
		this.role.setPlayTime();
	}

	public dealHurt() {
		this.dmgProxy.effect(1);
	}
}