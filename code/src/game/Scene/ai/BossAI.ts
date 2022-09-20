class BossAI {

	public static create() {
		return new BossAI();
	}

	public role: SceneCharRole;

	public ai_state = 0;

	public thinkInterv = 0;
	public thinkTime = 0;
	public autoRemove = 1;

	public constructor() {
	}

	public onAdd() {

	}

	public onRemove() {
	}

	public update(ctx) {
		var self = this;
		if (self.role.curhp <= 0) {
			return;
		}
		self.thinkTime += ctx.dt;
		if (self.role.attack_state) {
			return;
		}
		if (self.role.hurt_state || self.role.dizz_state) {
			return;
		}
		if (self.ai_state == 0) {
			if (self.thinkTime >= self.thinkInterv) {
				self.think();
				self.thinkTime = 0;
			}
		}
	}

	public think() {
		this.thinkAttack();
	}

	public thinkAttack() {
		var role = this.role;
		var skillList: Array<any> = role.skillList;//取出能够释放的技能
		let skillVo: Vo_Skill = SkillUtil.getWaitSkillVo(role);
		if (skillVo) skillList.push(skillVo);
		if (skillList.length) {
			var bestSkill: Vo_Skill;
			let len = skillList.length;
			for (let i = 0; i < len; i++) {
				let tempSkill = skillList[i];
				if (tempSkill.remaincd > 0) {
					continue;
				}
				if (bestSkill) {
					if(tempSkill.cfg.p > bestSkill.cfg.p){
						bestSkill = tempSkill;
					}
				} else {
					bestSkill = tempSkill;
				}
			}
			if (bestSkill) {
				var aicfg = bestSkill.cfg.ai;

				var skillAiMaxFarAbsx = aicfg.maxf != null ? aicfg.maxf : bestSkill.cfg.a.x;
				var skillAiMinFarAbsx = aicfg.minf != null ? aicfg.minf : 0;

				var skilly = aicfg.vert != null ? aicfg.vert : bestSkill.cfg.a.y;
				this.role.invalid |= 1;
				bestSkill.enterCool();
				var skillLogic = SkillBase.getPlayLogic(role, bestSkill);
				role.playSkill(skillLogic);
			}
		}
	}

	public onEvent(evt, arg) {
	}
}