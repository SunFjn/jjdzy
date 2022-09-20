class UIRoleSkillBase {
	public static createBase(role: UIRole, skill: Vo_Skill) {
		var ret = Pool.getItemByClass("UIRoleSkillBase", UIRoleSkillBase);
		ret.role = role;
		ret.skill = skill;
		ret.tag = 1;
		return ret;
	}

	public isEnd: boolean;

	/**技能总伤害*/
	public tHurt = 0;

	public role: UIRole;
	public skill: Vo_Skill;

	public dmgProxy: DamageProxy;

	public seq: any[];
	public t: number;

	public CFGTIME = 0;

	public ms: number;
	public msh: number;
	public attstate = 0;
	/**免疫击退 */public immst = 0;
	public uiparent: egret.DisplayObjectContainer;

	public constructor() {
	}

	public onEvent(evt, arg) {
		var evtsc = EVT_SC;
		if (evt == evtsc.EVT_STACT || evt == evtsc.EVT_THROW || evt == evtsc.EVT_DISSKILL) {
			this.role.removePlug(this);
		}
	}

	/**初始化技能场景逻辑表 */
	public static getLogicMap(): any {
		return SkillUtil.getLogicMap();
	}

	protected static styleMap: any = {};

	protected static mapInit = 0;

	public static getPlayLogic(role: UIRole, skill: Vo_Skill): any {
		var creator = UIRoleSkillBase.getLogicMap()[skill.cfg.s];
		if (!creator) {
			return UIRoleSkillBase.createBase(role, skill);
		}
		return creator(role, skill);
	}

	public tag = 0;
	public onRemove() {
		var self = this;
		self.role.invalid |= 1;
		self.role = null;
		self.skill = null;
		self.tag = 0;
		Pool.recover("UIRoleSkillBase", self);
	}
	public update(ctx: any) {
		var s = this;
		s.t += ctx.dt;
		s.doSeq(s.t);
		s.role.x += s.ms;
		s.role.h += s.msh;
		if (s.role.h < 0) {
			s.role.h = 0;
		}
		if (s.CFGTIME && s.t >= s.CFGTIME) {
			s.role.isPlaySkill = false;
		}
	}

	public doSeq(curtime: number) {
		var seq = this.seq;
		if (seq) {
			var self = this;
			while (seq.length && curtime >= seq[0].t) {
				var term = seq.shift();
				switch (term.type) {
					case "m":
						if (term.ms != undefined) {
							self.ms = self.role.faceDir * term.ms;
						}
						if (term.msh != undefined) {
							self.msh = term.msh
						}
						break;
					case "act":
						self.role.attack_index = term.act;
						self.role.invalid |= 1;
						var isLoop = term.loop ? true : false;
						self.role.setPlayTime(term.interv, isLoop);
						self.role.attack_state++;
						self.attstate++;
						break;
					case "cure":
						self.role.immuneDmg = 1;
						self.dmgProxy.use_cure(term);
						break;
					case "addRage":
						self.role.immuneDmg = 1;
						self.dmgProxy.addRage(term);
						break;
					case "reduceDef":
						self.dmgProxy.reduce_def(term);
						break;
					case "eff":
						if (term.effid < 100001) return;
						var effid;
						if (self.role.job == 15) {
							let effid1 = SkillUtil.replaceEff(self.role.godWeapon > 0 ? self.role.godWeapon : self.role.weapon, self.role.body, term.effid);
							effid = "eff/" + effid1 + "/ani";
						} else {
							effid = "eff/" + term.effid + "/ani";
						}
						isLoop = term.loop ? true : false;
						var interval = term.interval ? term.interval : term.lifeTime;
						if (term.self) {//加到角色身上
							let offx = term.offx ? term.offx : 0;
							let offy = term.offy ? term.offy : 0;
							let tempeff = this.role.addTempEff(effid, offx * this.role.faceDir, -offy, interval, term.lifeTime);
							tempeff.removeBreak = true;
							if (term.scaleX) {
								tempeff.mc.scaleX = this.role.faceDir * term.scaleX;
							} else {
								tempeff.mc.scaleX = this.role.faceDir;
							}
						} else if (term.scene) {
							let offx = term.offx ? term.offx : 0;
							let offy = term.offy ? term.offy : 0;
							if (!term.scaleX) term.scaleX = 1;
							let sceneff = UIRoleArrow.create();
							sceneff.initXY(effid, 1, interval, true, this.role.view.x + offx, this.role.view.y + offy, 0, term.scaleX);
							sceneff.dieTime = term.lifeTime;
							sceneff.updateFunc = UIRoleArrow.LIFEONLY;
							sceneff.uiparent = this.role.uiparent;
							sceneff.onAdd();
							this.role.effList.push(sceneff);
						} else if (term.enemy) {
						} else {
							let offx = term.offx ? term.offx : 0;
							let h = term.h ? term.h : 0;
							let offy = term.offy ? term.offy : 0;
							let eff: UIRoleArrow = UIRoleArrow.create();
							if (!term.scaleX) term.scaleX = 1;
							eff.initWithRoleFace(this.role, effid, 1, interval, isLoop, offx, -h, offy, term.scaleX);
							eff.uiparent = this.role.uiparent;
							eff.onAdd();
							this.role.effList.push(eff);
							let depAdd = term.depAdd ? term.depAdd : 50;//深度排序修正
							eff.dep += depAdd;

							let movetype = term.movetype;//移动类别
							if (movetype) {
								if (movetype == "forward") {
									let xspeed = term.xspeed ? term.xspeed : 10;
									let yspeed = term.yspeed ? term.yspeed : 0;
									eff.dieTime = term.lifeTime;
									eff.updateFunc = UIRoleArrow.FORWARD;
									eff.va = this.role.faceDir * xspeed;
									eff.vb = yspeed;
								}
							} else {
								eff.updateFunc = UIRoleArrow.LIFEONLY;//默认没有轨迹
							}
						}
						break;
					default:
						break;
				}
				// if (term.s) {//播放音乐
				// 	SoundManager.getInstance().playEff(term.s);
				// }
			}
		}
	}

	public onAdd() {
		let s = this;
		s.CFGTIME = s.skill.cfg.a.t;
		s.attstate = 0;
		s.t = 0;
		s.ms = 0;
		s.msh = 0;
		s.immst = 0;
		if (s.skill.cfg.a.seqs) {
			s.seq = (s.skill.cfg.a.seqs as Array<any>).concat();
		} else {
			s.seq = null;
		}
		s.doSeq(0);
		s.role.isPlaySkill = true;
	}

}