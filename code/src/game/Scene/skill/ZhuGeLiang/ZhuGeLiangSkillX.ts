class ZhuGeLiangSkillX extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):ZhuGeLiangSkillX {
		var ret:ZhuGeLiangSkillX = new ZhuGeLiangSkillX();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public constructor() {
		super();
	}

	public CFGTIME = 1000;
	public EFFECTTIME1 = 200;
	public EFFECTTIME2 = 300;
	public EFFECTTIME3 = 600;

	public lifeTime = 0;

	public attackIndex = 1;

	public eff:Part;

	public update(ctx) {
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.EFFECTTIME1 && this.lifeTime < this.EFFECTTIME1) {
			this.dealHurt(0);
		}
		if(nt >= this.EFFECTTIME2 && this.lifeTime < this.EFFECTTIME2) {
			this.dealHurt(1);
		}
		if(nt >= this.EFFECTTIME3 && this.lifeTime < this.EFFECTTIME3) {
			this.dealHurt(2);
		}
		if(nt >= this.CFGTIME) {
			ctx.d = 1;
		}

		this.lifeTime = nt;
	}

	public onAdd() {
		this.role.attack_index = 13;
		this.role.attack_state++;
		this.role.invalid |= 1;
		this.role.setPlayTime(this.CFGTIME,false);

		this.dealHurt(0);
	}

	public onRemove() {
		super.onRemove();
		this.role.attack_state--;
		this.role.invalid |= 1;
		this.role.setPlayTime();
	}

	public dealHurt(times) {
		var mine = this.role;
		var cfga = this.skill.cfg.a;
		if(times == 0) {
			for(var i = 0; i < 6; i++) {
				var angle = Math.PI * i / 3;
				var cos = Math.cos(angle);
				var sin = Math.sin(angle);
				var sceneff = new HuangZhongArrow1();
				sceneff.initXY("eff/" + cfga.effid,1,500,true,mine.x+cos*70,mine.y+sin*35);
				sceneff.alpha = 1;
				sceneff.va = mine.x;//sx
				sceneff.vb = mine.y;//sy
				sceneff.vc = angle;//angle
				sceneff.vd = 70;//width
				sceneff.ve = 35;//height
				sceneff.effInterv = 200;
				sceneff.dieTime = 600;
				sceneff.updateFunc = HuangZhongArrow1.ZGLTHUNDERFUNC2;

				mine.scene.addUnit(sceneff);
			}
			return;
		}
		this.dmgProxy.effect(times);
	}
}