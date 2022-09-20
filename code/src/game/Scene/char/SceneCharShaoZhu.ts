class SceneCharShaoZhu extends SceneCharRole {

	private static PP: Array<SceneCharShaoZhu> = [];
	public static create(): SceneCharShaoZhu {
		var pool = SceneCharShaoZhu.PP;
		return pool.length ? pool.pop() : new SceneCharShaoZhu();
	}
	/** 0:怪物角色 1:英雄角色 会用于计算伤害*/public charType = 0;
	/** #### ai相关 #####*/
	public view: DepSprite;
	public parts: Parts;
	public effPlayer: RoleEffctPlayerPlug;
	public movespeed = 9;

	/** -1:朝向左 1:朝向右 */
	public faceDir = 1;
	public aniTime = 0;
	public aniInterv = 1000;
	public invalid = 0;// |1：皮肤有更新

	public skillList: Vo_Skill[] = [];
	public plugs = [];
	public plugCtx: any = {};
	public body = 1;//皮肤

	public attack_state = 0;
	public move_state = 0;
	public masterID = 0;
	public constructor() {
		super();
		var self = this;
		self.objType = 2;
		self.view = new DepSprite();
		self.parts = new Parts();
		self.view.addChild(self.parts);

		var shadow: StaticPart = self.shadow = new StaticPart();
		shadow.setVal("s/1");
		shadow.setAct(4);
		self.view.addChild(shadow.mc);

		var body: Part = new Part(PartType.DB);
		body.type = 1;
		body.dep = 5;
		self.parts.addPart(body);
	}

	public update(ctx) {
		var self = this;

		var skillList = self.skillList;
		var len = skillList.length;
		for (var i = 0; i < len; i++) {
			var skill: Vo_Skill = skillList[i];
			var newcd = skill.remaincd - ctx.dt;
			if (newcd < 0) {
				newcd = 0;
			}
			skill.remaincd = newcd;
		}

		var len = self.plugs.length;
		var plugArg = self.plugCtx;

		var plugDirty = 0;
		for (var i = 0; i < len; i++) {
			var plug = self.plugs[i];
			if (!plug) {
				plugDirty++;
				continue;
			}
			plugArg.d = 0;
			plugArg.dt = ctx.dt;
			plug.update(plugArg);
			if (plugArg.d) {//dead
				self.plugs[i] = null;
				plug.onRemove();
				plugDirty++;
			} else {
			}
		}
		if (plugDirty) {
			ArrayUitl.cleannull(self.plugs);
		}

		if (self.x < self.scene.left) {
			self.x = self.scene.left + self.force;
		} else if (self.x > self.scene.right) {
			self.x = self.scene.right - self.force;
		}

		//updateViewPos
		self.view.x = self.x;
		self.view.y = self.y;

		self.updateState();
		self.aniTime += ctx.dt;
		var perc = self.aniTime / self.aniInterv;
		self.parts.perc = perc;

		self.view.dep = self.y;
	}

	public updateState() {
		let s = this;
		var invalid = s.invalid;
		if (invalid) {
			if (invalid & 1) {//action
				s.updateAction();
			}
			if (invalid & 2) {//way
				s.updateWay();
			}
			s.invalid = 0;
		}
	}

	public updateAction() {
		var self = this;
		var urlkey;
		var actkey = 1;
		var body = self.body;
		if (self.attack_state) {
			if (self.attack_index > 40) {
				urlkey = "body/" + body + "/stand/ani";
			} else {
				urlkey = "body/" + body + "/attack_01/ani";
			}
		} else {
			if (self.move_state) {
				urlkey = "body/" + body + "/run/ani";
			} else {
				urlkey = "body/" + body + "/stand/ani";
			}
			self.parts.ptype = Parts.DIS_REAPEAT;
		}
		if (urlkey) {
			self.parts.setPart(1, urlkey);
		}
		self.parts.setVal(actkey);
	}

	public updateWay() {
		let s = this;
		s.parts.scaleY = s.scale;
		if (s.faceDir == 1) {
			s.parts.scaleX = s.scale;
		} else {
			s.parts.scaleX = -1 * s.scale;
		}
	}

	public playSkill(skillLog: SkillBase, dmgProxy: DamageProxy = null) {
		let s = this;
		if (!dmgProxy) {
			if (skillLog.dmgProxy) {
				skillLog.dmgProxy.executeNewTask(skillLog.skill, s, s.scene);
			} else {
				dmgProxy = DamageProxy.createByClient(skillLog.skill, s, s.scene);
				skillLog.dmgProxy = dmgProxy;
			}
		}
		Model_battle.hurtRoleArr1 = [];
		s.addPlug(skillLog);
		s.curSkill = skillLog;
		if (Model_battle.battleId > 0 && s.masterID == Model_player.voMine.id) {
			GGlobal.modelbattle.CG_PLAYER_USESKILL(s.curSkill.skill.id)
		}
	}

	public setBody(v: number) {
		let s = this;
		if (s.body != v) {
			s.body = v;
			s.invalid |= 1;
		}
	}

	public addPlug(plug) {
		this.plugs.push(plug);
		plug.onAdd();
	}

	public removePlug(plug) {
		let s = this;
		var index = s.plugs.indexOf(plug);
		if (DEBUG) {
			if (index == -1) {
				throw new Error("plugIndexError");
			}
		}
		s.plugs[index] = null;
		plug.onRemove();
	}

	public onAdd() {
		let s = this;
		s.invalid |= 1;
		s.scene.unitLayer.depAddChild(s.view);
		s.view.visible = true;
	}

	public curSkill: SkillBase;
	public onRemove() {
		let s = this;
		if (s.curSkill) {//退出当前技能
			s.removePlug(s.curSkill);
		}
		for (var i = s.plugs.length - 1; i >= 0; i--) {//移除部分插件
			var plug = s.plugs[i];
			if (plug && plug.autoRemove) {
				s.removePlug(plug);
			}
		}
		s.skillList = [];
		s.scene.unitLayer.depRemoveChild(s.view);
		s.view.alpha = 1;
		s.view.dep = -1;
		s.h = 0;
		s.invalid |= 255;
		s.parts.setPart(1, null);
		if (SceneCharShaoZhu.PP.indexOf(this) == -1) SceneCharShaoZhu.PP.push(this);
	}
}