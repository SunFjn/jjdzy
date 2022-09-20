class UIRole extends SceneCharRole {
	private static UIRoleP: Array<UIRole> = [];
	public static create(): UIRole {
		var pool = UIRole.UIRoleP;
		return pool.length ? pool.pop() : new UIRole();
	}

	public data;//存贮任何数据
	public effList: Array<UIRoleArrow> = [];
	public constructor() {
		super();
	}

	public createParts() {
		let self = this;
		var shadow: StaticPart = self.shadow = new StaticPart();
		shadow.setVal("s/1");
		shadow.setAct(4);
		self.view.addChild(shadow.mc);
		self.parts = new Parts();
		self.view.addChild(self.parts);

		var body: Part = new Part();
		body.type = Parts.T_BODY;
		body.dep = Parts.P_BODY;
		self.parts.addPart(body);
	}

	public _last = 0;
	public update(time) {
		let s = this;
		let dt = time - s._last;
		s._last = time;
		let ctx: any = { dt: dt };
		if (s.skillLogic) {
			if (s.isPlaySkill) {
				s.skillLogic.update(ctx);
			} else {
				if (s.skillLoop) {
					if (s.skillLogic.CFGTIME && s.skillLogic.t >= s.skillLogic.CFGTIME) s.skillLogic.onAdd();
				} else {
					s.attack_index = s.attack_state = 0;
					s.invalid |= 1;
				}
			}
		}

		s.aniTime += ctx.dt;
		var perc = s.aniTime / s.aniInterv;
		s.parts.perc = perc;
		s.updateState();
		let len = s.plugs.length;
		let plugArg = s.plugCtx;

		let plugDirty = 0;
		for (let i = 0; i < len; i++) {
			let plug = s.plugs[i];
			if (!plug) {
				plugDirty++;
				continue;
			}
			plugArg.d = 0;
			plugArg.dt = ctx.dt;
			plug.update(plugArg);
			if (plugArg.d) {//dead
				s.plugs[i] = null;
				plug.onRemove();
				plugDirty++;
			} else {
			}
		}
		if (plugDirty) {
			ArrayUitl.cleannull(s.plugs);
		}

		let arrawDirty = 0;
		for (let i = 0; i < s.effList.length; i++) {
			let arraw = s.effList[i];
			if (arraw) {
				arraw.update(ctx);
				if (ctx.d) {
					s.effList[i] = null;
					arraw.onRemove();
					i--;
					arrawDirty++;
				}
			}
		}
		if (arrawDirty) {
			ArrayUitl.cleannull(s.effList);
		}
		if (s.extraFrameFun) {
			s.extraFrameFun();
		}
	}
	public setJob(v) {
		let body = Model_player.getBodyOrWeaponID(v);
		this.setBody(body);
		this.setWeapon(v);
	}

	public setDir(dir) {
		let s = this;
		// if (s.faceDir != dir) {
		s.faceDir = dir;
		s.invalid |= 2;
		s.updateWay();
		// }
	}

	public updateState() {
		var invalid = this.invalid;
		if (invalid) {
			if (invalid & 1) {//action
				this.updateAction();
			}
			if (invalid & 2) {//way
				this.updateWay();
			}
			this.invalid = 0;
		}
	}

	public setAction(val) {
		if (this.move_state != val) {
			this.invalid = 1;
			this.move_state = val;
		}
	}

	public weaponDown = false;
	public updateAction() {
		var self = this;
		if (self.changeModel > 0) {
			self.updateChangeModel();
			return;
		}
		var urlkey;
		var weaponkey;
		var actkey = 1;

		var needSort: boolean;

		var isWeaponDown = false;
		var isHorseDown = false;

		var nameyStatey = 0;
		var weaponpic = self.godWeaponpic ? self.godWeaponpic : self.weaponpic;
		var horseMod = self.horseMod
		var horseWingUrl = "";
		if (self.attack_state) {
			if (self.attack_index > 20) {
				urlkey = "body/" + self.body + "/use_0" + (self.attack_index % 10) + "/ani";
				if (weaponpic) {
					weaponkey = "weapon/" + weaponpic + "/use_0" + (self.attack_index % 10) + "/ani";
				}
			} else if (self.attack_index > 10) {
				urlkey = "body/" + self.body + "/skill_0" + (self.attack_index % 10) + "/ani";
				if (weaponpic) {
					weaponkey = "weapon/" + weaponpic + "/skill_0" + (self.attack_index % 10) + "/ani";
				}
			} else {
				if (self.attack_index == 9) {
					urlkey = "body/" + self.body + "/rush/ani";
					if (weaponpic) {
						weaponkey = "weapon/" + weaponpic + "/rush/ani";
					}
				} else {
					urlkey = "body/" + self.body + "/attack_0" + self.attack_index + "/ani";
					if (weaponpic) {
						weaponkey = "weapon/" + weaponpic + "/attack_0" + self.attack_index + "/ani";
					}
				}
			}
		} else {
			if (self.move_state) {
				if (horseMod) {
					horseMod = "body/" + horseMod + "/ride/ani";
					horseWingUrl = "body/" + self.horseMod + "/wing/ani";
					urlkey = "body/" + self.body + "/ride/ani";
					if (weaponpic) {
						weaponkey = null;
					}
				} else {
					urlkey = "body/" + self.body + "/run/ani";
					if (weaponpic) {
						weaponkey = "weapon/" + weaponpic + "/run/ani";
					}
				}
			} else {
				if (horseMod) {
					horseMod = "body/" + horseMod + "/ride_st/ani";
					horseWingUrl = "body/" + self.horseMod + "/wing_st/ani";
					urlkey = "body/" + self.body + "/ride_st/ani";
					if (weaponpic) {
						weaponkey = null;
					}
				} else {
					urlkey = "body/" + self.body + "/stand/ani";
					if (weaponpic) {
						weaponkey = "weapon/" + weaponpic + "/stand/ani";
					}
				}
			}
			self.parts.ptype = Parts.DIS_REAPEAT;
		}

		if (urlkey) {
			self.parts.setPart(Parts.T_BODY, urlkey);
		}
		if (weaponkey) {//weapon = 2
			var weapon: Part = self.parts.dic[Parts.T_WEAPON];
			if (!weapon) {
				weapon = Part.create();
				weapon.type = Parts.T_WEAPON;
				weapon.dep = Parts.P_WEAPON;
				self.parts.addPart(weapon);
			}
			if (self.weaponDown != isWeaponDown) {//角色武器层级调整
				self.weaponDown = isWeaponDown;
				weapon.dep = Parts.D_WEAPON_DOWN;
				needSort = true;
			}
			self.parts.setPart(Parts.T_WEAPON, weaponkey);
		} else {
			self.parts.removePartByType(Parts.T_WEAPON);//移除PART
		}

		if (horseMod) {
			var horse: Part = self.parts.dic[Parts.T_HORSE];
			if (!horse) {
				horse = Part.create();
				horse.type = Parts.T_HORSE;
				horse.dep = Parts.D_HORSE_DOWN;
				self.parts.addPart(horse);
			}
			if (Config.zq_773[self.horseId].zhezhao == 1) {//坐骑在角色上层的部分
				var horseWing: Part = self.parts.dic[Parts.T_HORSE_WING];
				if (!horseWing) {
					horseWing = Part.create();
					horseWing.type = Parts.T_HORSE_WING;
					horseWing.dep = Parts.P_HORSE;
					self.parts.addPart(horseWing);
				}
				self.parts.setPart(Parts.T_HORSE_WING, horseWingUrl);
			} else {
				self.parts.removePartByType(Parts.T_HORSE_WING);//移除PART
			}
			needSort = true;
			self.parts.setPart(Parts.T_HORSE, horseMod);
		} else {
			self.parts.removePartByType(Parts.T_HORSE);//移除PART
			self.parts.removePartByType(Parts.T_HORSE_WING);//移除PART
		}
		if (self.charType == 1) {//只有主角才需要 更新武器 坐骑 翅膀等
			needSort = true;
		}
		self.parts.setVal(actkey);
		if (needSort) {
			self.parts.sort();
		}
		if (self.nameStatey != nameyStatey) {
			self.headGroup.y = self.namey + nameyStatey;
			self.nameStatey = nameyStatey;
		}
	}

	public extraFrameFun: Function;
	private skillLogic: UIRoleSkillBase;
	public isPlaySkill: boolean = false;
	private skillLoop: boolean = false;
	public playSkillID(skillID, skillLoop = true) {//传0或者null移除技能
		let bestSkill = Vo_Skill.create(skillID, 1, 1);
		if (this.skillLogic) {
			this.skillLogic.onRemove();
		}
		this.skillLogic = UIRoleSkillBase.getPlayLogic(this, bestSkill);
		this.skillLogic.onAdd();
		this.skillLoop = skillLoop;
	}

	public uiparent: egret.DisplayObjectContainer;
	public onAdd() {
		let self = this;
		self.invalid |= 1;
		if (!self.view.parent)
			self.uiparent.addChild(self.view);
		self.view.visible = true;
		if (!Timer.instance.has(self.update, self)) {
			self._last = egret.getTimer();
			Timer.instance.listen(self.update, self, 16);//30fps
		}
	}

	public setXY(xx, yy) {
		this.x = xx;
		this.y = yy;
	}

	public synchroPos() {
		this.view.x = this.x;
		this.view.y = this.y;
	}

	public setPos(xx, yy) {
		this.view.x = xx;
		this.view.y = yy;
	}
	public setScaleXY(xx, yy) {
		this.view.$setScaleX(xx);
		this.view.$setScaleY(yy);
	}

	public onHide() {
		let s = this;
		Timer.instance.remove(s.update, s);
		if (s.view.parent) s.view.parent.removeChild(s.view);
		s.invalid |= 255;
		s.setWeapon(0);
		s.setBody(0);
		s.setHorseId(0);
		s.setScaleXY(1, 1);
		s.parts.setPart(Parts.T_BODY, null);
		s.parts.setPart(Parts.T_WEAPON, null);
		s.uiparent = null;
	}

	public onRemove() {
		let s = this;
		for (let i = s.plugs.length - 1; i >= 0; i--) {//移除部分插件
			let plug = s.plugs[i];
			if (plug && plug.autoRemove) {
				s.removePlug(plug);
			}
		}

		for (let i = 0; i < s.effList.length; i++) {
			let arraw = s.effList[i];
			if (arraw) {
				arraw.onRemove();
				arraw = null;
			}
		}
		s.effList = [];
		if (s.skillLogic) {
			s.skillLogic.onRemove();
			s.skillLogic = null;
		}
		s.isPlaySkill = false;
		s.onHide();
		s.extraFrameFun = null;
		s.data = null;
		s.setDir(1);
		s.skillLoop = false;
		s.resetVar();
		if (UIRole.UIRoleP.indexOf(s) < 0) UIRole.UIRoleP.push(s);
	}
}