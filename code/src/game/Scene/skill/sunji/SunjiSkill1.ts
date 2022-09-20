class SunjiSkill1 extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):SunjiSkill1 {
		var ret:SunjiSkill1 = new SunjiSkill1();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public constructor() {
		super();
	}

	public CFGTIME:number;
	public ET1:number;
	public ET2:number;

	public st = 0;

	public lifeTime = 0;

	public update(ctx) {
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.ET1 && this.lifeTime < this.ET1) {
			this.st++;
			this.dealHurt(1);
			this.role.scene.moveRole(this.role,20 * this.role.faceDir,0,0);
		}
		if(this.st == 1) {
			this.role.scene.moveRole(this.role,3 * this.role.faceDir,0,0);
		}
		if(nt >= this.ET2 && this.lifeTime < this.ET2) {
			this.st++;
			this.dealHurt(2);
		}
		if(nt >= this.CFGTIME) {
			ctx.d = 1;
		}
		this.lifeTime = nt;
	}


	public onAdd() {
		this.CFGTIME = 600;
		this.ET1 = 200;
		this.ET2 = 400;

		this.role.immuneHSt++;

		this.role.attack_index = 1;
		this.role.attack_state++;
		this.role.invalid |= 1;
		this.role.setPlayTime(this.CFGTIME,false);
	}

	public onRemove() {
		super.onRemove();
		this.role.immuneHSt--;
		this.role.attack_state--;
		this.role.invalid |= 1;
		this.role.setPlayTime();
	}

	public dealHurt(times) {
		this.dmgProxy.effect(times);
	}
}