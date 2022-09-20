class DiaoChanSkillZ extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):DiaoChanSkillZ {
		var ret:DiaoChanSkillZ = new DiaoChanSkillZ();
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
		this.lifeTime = nt;
	}


	public onAdd() {
		this.effid = null;
		this.CFGTIME = 500;
		this.EFFECTTIME = 300;

		this.effid = "eff/5_11";
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
		var box3d = Box3D.create();
		var r = this.role;
		box3d.setDCXY(r.faceDir,r.x,r.y,r.h,-50,-this.skill.cfg.a.y,-50,this.skill.cfg.a.x,this.skill.cfg.a.y,100);
		var roles = this.role.scene.filterRole(Box3D.ROLE3DTESTEnemy,this.role,box3d);
		for(var i = 0; i < roles.length; i++) {
			var role:SceneCharRole = roles[i];
			var dmgVal = 20;
			var hitback = true;
			var dmgCtx:any = {srcid:this.role.id,srcRole:this.role,dmgVal:dmgVal};
			dmgCtx = this.role.scene.setHurtState(this.role, dmgCtx, role);
			role.takeDmg(dmgCtx);
			role.throw(10 * this.role.faceDir, 13);
		}
	}
}