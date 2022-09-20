class ZhaoYunSkill3 extends SkillBase {
	public constructor() {
		super();
	}

	public static create(role:SceneCharRole, skill:Vo_Skill) {
		var ret = new ZhaoYunSkill3();
		ret.role = role;
		ret.skill = skill;
		return ret;
	}

	public T:number;
	public T1:number;
	public T2:number;

	public lt:number;

	public eff:Part;

	public onAdd() {
		this.lt = 0;
		this.role.attack_state++;
		this.T = 800;
		this.T1 = 400;
		this.T2 = 500;
		this.role.attack_index = 13;
		this.role.invalid |= 1;
		this.role.setPlayTime(this.T);

		this.role.immuneHSt++;

		this.eff = new Part();
		this.eff.setVal("eff/zy_3");
		this.eff.setAct(1);
		this.eff.setPec(0);
		this.eff.mc.y = -80;
		this.role.view.addChild(this.eff.mc);

		this.eff.mc.visible = false;
	}

	public onRemove() {
		super.onRemove();
		this.role.immuneHSt--;
		this.role.attack_state--;
		this.role.invalid |= 1;
		if(this.eff) {
			this.eff.mc.parent.removeChild(this.eff.mc);
			this.eff = null;
		}
	}

	protected _rt:Number = 0;
	public update(ctx) {
		var nt = this.lt + ctx.dt;
		if(this.eff) {
			this._rt += ctx.dt;
			if(this._rt >= 50) {
				this.eff.mc.rotation += 50 * this.role.faceDir;
				this._rt = 0;
			}
		}
		if(nt >= this.T1 && this.lt < this.T1) {
			if(this.eff) {
				this.eff.mc.parent.removeChild(this.eff.mc);
				this.eff = null;
			}

			var sceneff = HuangZhongArrow1.create();
			sceneff.va = 20 * this.role.faceDir;
			sceneff.vb = 15 * this.role.faceDir;
			sceneff.updateFunc = HuangZhongArrow1.ZY3FUNC;
			sceneff.initWithRoleFace(this.role,"eff/zy_3",2,800,false,0,-80);
			sceneff.dieTime = 800;
			sceneff.dep = sceneff.y + 10;
			this.role.scene.addUnit(sceneff);

			sceneff.visible=false;
		}
		if(nt > this.T2 && this.lt < this.T2) {
			this.dmgProxy.effect(1);
		}
		if(nt > this.T) {
			ctx.d = 1;
		}
		this.lt = nt;
	}


}