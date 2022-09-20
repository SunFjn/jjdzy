class DiaoChanSkillX extends SkillBase {
	public static create(role:SceneCharRole,skill:Vo_Skill):DiaoChanSkillX {
		var ret:DiaoChanSkillX = new DiaoChanSkillX();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public constructor() {
		super();
	}

	public CFGTIME = 600;
	public EFFECTTIME1 = 100;
	public EFFECTTIME2 = 300;
	public EFFECTTIME3 = 500;

	public lifeTime = 0;

	public attackIndex = 1;

	public eff:Part;
	public effid;

	public update(ctx) {
		var nt = this.lifeTime + ctx.dt;
		if(nt >= this.EFFECTTIME1 && this.lifeTime < this.EFFECTTIME1) {
			this.dealHurt(1);
		}
		if(nt >= this.EFFECTTIME2 && this.lifeTime < this.EFFECTTIME2) {
			this.dealHurt(2);
		}
		if(nt >= this.EFFECTTIME3 && this.lifeTime < this.EFFECTTIME3) {
			this.dealHurt(2);
		}
		if(nt >= this.CFGTIME) {
			ctx.d = 1;
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
		this.CFGTIME = 800;

		this.effid = "eff/5_12";
		if(this.effid) {
			this.eff = new Part();
			this.eff.setVal(this.effid);
			this.eff.setAct(1);
			this.eff.setPec(0);
			this.eff.mc.scaleX = this.role.faceDir;
			this.role.view.addChild(this.eff.mc);
		}

		this.role.attack_index = 12;
		this.role.attack_state++;
		this.role.invalid |= 1;
		this.role.setPlayTime(this.CFGTIME - 50,false);
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

	public dealHurt(times:number) {
		var box3d = Box3D.create();
		var r = this.role;
		box3d.setDCXY(r.faceDir,r.x,r.y,r.h,-50,-this.skill.cfg.a.y,-50,this.skill.cfg.a.x,this.skill.cfg.a.y,100);
		var roles = this.role.scene.filterRole(Box3D.ROLE3DTESTEnemy,this.role,box3d);
		for(var i = 0; i < roles.length; i++) {
			var role:SceneCharRole = roles[i];
			var dir = this.role.x <= role.x ? 1 : -1;
			if(times == 1) {//将敌人挑起来
				var dmgVal = 10;
				var dmgCtx:any = {srcid:this.role.id,srcRole:this.role,dmgVal:dmgVal};
				dmgCtx = this.role.scene.setHurtState(this.role, dmgCtx, role);
				role.takeDmg(dmgCtx);
				role.throw(2 * dir, 15);
			}else{//将敌人挑起来
				var dmgVal = 10;
				var dmgCtx:any = {srcid:this.role.id,srcRole:this.role,dmgVal:dmgVal};
				dmgCtx = this.role.scene.setHurtState(this.role, dmgCtx, role);
				role.takeDmg(dmgCtx);
				role.throw(2 * dir, 15);
			}
		}
	}
}