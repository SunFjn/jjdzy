class ComboAttack3 extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):ComboAttack3 {
		var ret:ComboAttack3 = new ComboAttack3();
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

	public lifeTime = 0;

	public eff:Part;

	public update(ctx) {
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.T1 && this.lifeTime < this.T1) {
			this.dealHurt(1);
		}
		if(nt >= this.T2 && this.lifeTime < this.T2) {
			this.dealHurt(2);
		}
		if(nt >= this.T3 && this.lifeTime < this.T3) {
			this.dealHurt(3);
		}
		if(nt >= this.T) {
			ctx.d = 1;
		}
		this.lifeTime = nt;
	}


	public onAdd() {
		var self = this;
		self.T1 = self.skill.cfg.a[1].t;
		self.T2 = self.skill.cfg.a[2].t;
		self.T3 = self.skill.cfg.a[3].t;
		self.T = self.skill.cfg.a.t;

		self.role.attack_index = self.skill.cfg.a.a ? self.skill.cfg.a.a : 1;
		self.role.attack_state++;
		self.role.invalid |= 1;
		self.role.setPlayTime(self.T,false);
	}

	public onRemove() {
		super.onRemove();
		this.role.attack_state--;
		this.role.invalid |= 1;
		this.role.setPlayTime();
		this.role.attack_index = 0;
	}

	public dealHurt(times:number) {
		this.dmgProxy.effect(times);
	}
}