class LvMengSkill2 extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):LvMengSkill2 {
		var ret:LvMengSkill2 = new LvMengSkill2();
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
	public ET3:number;

	public lifeTime = 0;

	public et = 0;

	public update(ctx) {
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.ET1 && this.lifeTime < this.ET1) {
			this.et++;
			this.dealHurt(this.et);
			this.fire(1);
		}
		if(nt >= this.ET2 && this.lifeTime < this.ET2) {
			this.et++;
			this.dealHurt(this.et);
			this.fire(2);
		}
		if(nt >= this.ET3 && this.lifeTime < this.ET3) {
			this.et++;
			this.dealHurt(this.et);
			this.fire(3);
		}
		if(nt >= this.CFGTIME) {
			ctx.d = 1;
		}
		//this.role.scene.moveRole(this.role, this.role.faceDir * 6, 0, 0);
		//this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
		this.lifeTime = nt;
	}

	protected fire(times) {
		var arrow = HuangZhongArrow1.create();
		arrow.initWithRoleFace(this.role,"eff/9014",1,400,false,50,-150);
		arrow.va = this.role.faceDir * (4 + times * 4);
		arrow.vd = 1;
		arrow.vc = this.role.faceDir;
		arrow.dep = this.role.y + 40;
		//arrow.eff.mc.scaleX = this.role.faceDir;
		var rot = Math.atan2(20, arrow.va) / Math.PI * 180 + (this.role.faceDir == -1 ? 180 : 0);
		arrow.eff.mc.rotation = rot;
		arrow.updateFunc = HuangZhongArrow1.LMDROP;
		this.role.scene.addUnit(arrow);
	}

	public onAdd() {
		this.CFGTIME = 800;
		this.ET1 = 200;
		this.ET2 = 400;
		this.ET3 = 600;

		this.role.attack_index = 2;
		this.role.attack_state++;
		this.role.invalid |= 1;
		this.role.setPlayTime(this.CFGTIME,false);
	}

	public onRemove() {
		super.onRemove();
		this.role.attack_state--;
		this.role.invalid |= 1;
		this.role.setPlayTime();
	}

	public dealHurt(times:number) {
		this.dmgProxy.effect(times);
	}
}