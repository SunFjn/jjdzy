class ZhuGeLiangSkillZ extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):ZhuGeLiangSkillZ {
		var ret:ZhuGeLiangSkillZ = new ZhuGeLiangSkillZ();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public constructor() {
		super();
	}

	public CFGTIME = 1000;
	public EFFECTTIME1 = 300;
	public EFFECTTIME2 = 500;
	public EFFECTTIME3 = 700;

	public lifeTime = 0;

	public attackIndex = 1;

	public eff:Part;

	public update(ctx) {
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.EFFECTTIME1 && this.lifeTime < this.EFFECTTIME1) {
			this.dealHurt(1);
		}
		if(nt >= this.EFFECTTIME2 && this.lifeTime < this.EFFECTTIME2) {
			this.dealHurt(2);
		}
		if(nt >= this.EFFECTTIME3 && this.lifeTime < this.EFFECTTIME3) {
			this.dealHurt(3);
		}
		if(nt >= this.CFGTIME) {
			ctx.d = 1;
		}

		//this.role.scene.moveRole(this.role,4 * this.role.faceDir,0,0);
		this.lifeTime = nt;
	}

	public onAdd() {
		this.role.attack_index = 11;
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

	public dealHurt(times) {
		var box3d = Box3D.create();
		var mine = this.role;
		if(1) {
			var sceneff = new HuangZhongArrow1();
			var farx;
			var fary;
			if(times == 1) {
				sceneff.va = 0.35;
				sceneff.initWithRoleFace(this.role,"eff/2_2",1,300,false,0,-90);
			}else if(times == 2) {
				sceneff.va = 0.4;
				sceneff.initWithRoleFace(this.role,"eff/2_2",1,300,false,0,-120);
			}else{
				sceneff.va = 0.45;
				sceneff.initWithRoleFace(this.role,"eff/2_2",1,300,false,0,-150);
			}
			sceneff.alpha = 2;
			sceneff.updateFunc = HuangZhongArrow1.ZGL2FUNC;
			mine.scene.addUnit(sceneff);
			this.role.scene.shake(0,5);
		}
		this.dmgProxy.effect(times);
	}
}