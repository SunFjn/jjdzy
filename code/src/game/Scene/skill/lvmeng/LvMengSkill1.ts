class LvMengSkill1 extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):LvMengSkill1 {
		var ret:LvMengSkill1 = new LvMengSkill1();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public constructor() {
		super();
	}

	public T:number;
	public T1:number;
	public T2:number;
	public T3:number;

	public ms:number;

	public lifeTime = 0;

	public et = 0;

	public update(ctx) {
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.T1 && this.lifeTime < this.T1) {
			this.et++;
			this.dealHurt(this.et);
		}
		if(nt >= this.T2 && this.lifeTime < this.T2) {
			this.et++;
			this.dealHurt(this.et);
		}
		if(nt >= this.T3 && this.lifeTime < this.T3) {
			this.et++;
			this.dealHurt(this.et);
		}
		if(nt >= this.T) {
			ctx.d = 1;
		}
		this.role.scene.moveRole(this.role, this.role.faceDir * 6, 0, 0);
		//this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
		this.lifeTime = nt;
	}


	public onAdd() {
		var skilllogiccfg = this.skill.cfg.a;

		this.T = skilllogiccfg.t;
		this.T1 = skilllogiccfg[1].t;
		this.T2 = skilllogiccfg[2].t;
		this.T3 = skilllogiccfg[3].t;

		//this.role.immuneHSt++;

		var act_index = skilllogiccfg.a ? skilllogiccfg.a : 1;

		this.role.attack_index = act_index;
		this.role.attack_state++;
		this.role.invalid |= 1;
		this.role.setPlayTime(skilllogiccfg.at,true);
	}

	public onRemove() {
		super.onRemove();
		//this.role.immuneHSt--;
		this.role.attack_state--;
		this.role.invalid |= 1;
		this.role.setPlayTime();
	}

	public dealHurt(times:number) {
		this.dmgProxy.effect(times);
	}
}