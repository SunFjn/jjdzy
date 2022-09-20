class DiaoChanPG extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):DiaoChanPG {
		var ret:DiaoChanPG = new DiaoChanPG();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public constructor() {
		super();
	}

	public CFGTIME = 600;
	public EFFECTTIME = 300;

	public role:SceneCharRole;
	public lifeTime = 0;

	public attackIndex = 1;

	public skill:Vo_Skill;

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
		if(this.attackIndex == 3) {
			//this.role.scene.moveRole(this.role,0.4 * this.role.faceDir,0,0);
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
		if(this.attackIndex == 1) {
			this.CFGTIME = 400;
			this.EFFECTTIME = 200;
			//this.effid = "eff/2_1";
		}else if(this.attackIndex == 2) {
			this.CFGTIME = 400;
			this.EFFECTTIME = 200;
			//this.effid = "eff/2_1";
		}else if(this.attackIndex == 3) {
			this.CFGTIME = 400;
			this.EFFECTTIME = 200;
			//this.effid = "eff/2_1";
		}else if(this.attackIndex == 4) {
			this.CFGTIME = 400;
			this.EFFECTTIME = 200;
		}

		this.role.attack_index = this.attackIndex;
		this.role.attack_state++;
		this.role.invalid |= 1;
		this.role.setPlayTime(this.CFGTIME,false);

		if(this.effid) {
			this.eff = new Part();
			this.eff.setVal(this.effid);
			this.eff.setAct(1);
			this.eff.setPec(0);
			this.eff.mc.scaleX = this.role.faceDir;
			this.role.view.addChild(this.eff.mc);
		}
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

		if(this.attackIndex <= 1) {
			var pg2 = new DiaoChanPG();
			pg2.skill = this.skill;
			pg2.attackIndex = this.attackIndex + 1;
			pg2.role = this.role;
			//this.role.addPlug(pg2);
			this.role.playSkill(pg2);
		}
	}

	public onEvent(evt, arg) {
	}

	public dealHurt() {
		var box3d = Box3D.create();
		var r = this.role;
		box3d.setDCXY(r.faceDir,r.x,r.y,r.h,-50,-this.skill.cfg.a.y,-50,this.skill.cfg.a.x,this.skill.cfg.a.y,100);
		var roles = this.role.scene.filterRole(Box3D.ROLE3DTESTEnemy,this.role,box3d);
		for(var i = 0; i < roles.length; i++) {
			var role:SceneCharRole = roles[i];
			var dmgVal = 10;
			var hitback = true;
			var dmgCtx = {srcid:this.role.id,dmgVal:dmgVal,hitback:hitback};
			dmgCtx = this.role.scene.setHurtState(this.role, dmgCtx, role);
			role.takeDmg(dmgCtx); 
		}
	}
}