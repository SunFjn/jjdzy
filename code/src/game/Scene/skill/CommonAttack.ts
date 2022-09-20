class CommonAttack extends SkillBase{
	public static create(role:SceneCharRole,skill:Vo_Skill):CommonAttack {
		var ret:CommonAttack = new CommonAttack();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public constructor() {
		super();
	}

	public T = 600;
	public T1 = 300;

	public lifeTime = 0;

	public dead:boolean;

	public update(ctx) {
		super.update(ctx);
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.T1 && this.lifeTime < this.T1) {
			this.dealHurt();
		}
		if(nt >= this.T) {
			ctx.d = 1;
		}
		//this.role.scene.moveRole(this.role,11 * this.role.faceDir,0,0);
		this.lifeTime = nt;
	}

	public onAdd() {
		super.onAdd();
		var self = this;
		self.T = self.skill.cfg.a.t;
		self.T1 = self.skill.cfg.a[1].t;

		self.role.attack_index = 1;
		self.role.attack_state++;
		self.role.invalid |= 1;
		self.role.setPlayTime(self.T,false);
	}

	public onRemove() {
		super.onRemove();
		this.role.attack_state--;
		this.role.invalid |= 1;
		this.role.setPlayTime();
	}

	public dealHurt() {
		this.dmgProxy.effect(1);
	}
}