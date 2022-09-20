class ZhaoYunSkillX extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):ZhaoYunSkillX {
		var ret:ZhaoYunSkillX = new ZhaoYunSkillX();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public constructor() {
		super();
	}

	public CFGTIME = 600;
	public EFFECTTIME1 = 250;
	public EFFECTTIME2 = 550;

	public lifeTime = 0;

	public attackIndex = 1;

	public eff:Part;
	public effid;

	public update(ctx) {
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.EFFECTTIME1 && this.lifeTime < this.EFFECTTIME1) {
			this.dealHurt(1);
		}
		if(nt >= this.EFFECTTIME2 && this.lifeTime < this.EFFECTTIME2) {
			this.dealHurt(2);
		}
		if(nt >= this.CFGTIME) {
			ctx.d = 1;
		}
		if(this.effid) {
			var effperc = this.lifeTime / this.CFGTIME;
			if(effperc > 1) {
				effperc = 1
			}
			this.eff.setPec(effperc);
		}
		//this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
		this.lifeTime = nt;
	}


	public onAdd() {
		this.effid = null;
		this.CFGTIME = 800;

		//this.effid = "eff/1_13"
		this.effid = null;
		if(this.effid) {
			this.eff = new Part();
			this.eff.setVal(this.effid);
			this.eff.setAct(1);
			this.eff.setPec(0);
			this.eff.mc.scaleX = this.role.faceDir;
			this.role.view.addChild(this.eff.mc);
		}

		this.role.attack_index = 12;
		this.role.attack_state++;
		this.role.invalid |= 1;
		this.role.setPlayTime(this.CFGTIME - 50,false);
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

	public dealHurt(times:number) {
		this.dmgProxy.effect(times);
	}

	public onEvent(evt, arg) {
		super.onEvent(evt, arg);
	}
}