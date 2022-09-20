class SunjiSkill2 extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):SunjiSkill2 {
		var ret:SunjiSkill2 = new SunjiSkill2();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public constructor() {
		super();
	}

	public CFGTIME:number = 1167;
	public ET1:number = 334;
	public ET2:number = 668;
	public ET3:number = 1000;

	public st:number;

	public lifeTime = 0;

	public update(ctx) {
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.ET1 && this.lifeTime < this.ET1) {
			this.dealHurt(1);
			this.st++;
		}
		if(nt >= this.ET2 && this.lifeTime < this.ET2) {
			this.dealHurt(2);
			this.st++;
		}
		if(nt >= this.ET3 && this.lifeTime < this.ET3) {
			this.dealHurt(3);
			this.st++;
		}
		if(nt >= this.CFGTIME) {
			ctx.d = 1;
		}
		if(this.st == 0) {
			this.role.scene.moveRole(this.role,20 * this.role.faceDir,0,0);
		}else if(this.st == 1) {
			this.role.scene.moveRole(this.role,-18 * this.role.faceDir,0,0);
		}
		this.lifeTime = nt;
	}


	public onAdd() {
		this.st = 0;
		this.role.immuneHSt++; 

		this.role.attack_index = 2;
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