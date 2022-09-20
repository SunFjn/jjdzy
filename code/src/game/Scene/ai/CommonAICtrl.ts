class CommonAICtrl {

	public static create() {
		var ret = Pool.getItemByClass("CommonAICtrl", CommonAICtrl);
		return ret;
	}

	public role: SceneCharRole;

	public ai_state = 0;

	public thinkInterv = 0;
	public thinkTime = 0;

	public enemyid = 0;
	public tarpx = 0;
	public tarpy = 0;

	public nx = 0;
	public ny = 0;
	public autoRemove = 1;
	public lastTime = 0;
	public constructor() {
	}

	public onAdd() {

	}

	public onRemove() {
		let self = this;
		self.role = null;
		self.ai_state = 0;
		self.thinkInterv = 0;
		self.thinkTime = 0;

		self.enemyid = 0;
		self.tarpx = 0;
		self.tarpy = 0;

		self.nx = 0;
		self.ny = 0;
		self.autoRemove = 1;
		self.lastTime = 0;
		Pool.recover("CommonAICtrl", self);
	}

	public update(ctx) {
		var self = this;
		if (self.role.curhp <= 0) {
			return;
		}
		self.thinkTime += ctx.dt;
		if (GGlobal.pauseBattle || self.role.attack_state || self.role.hurt_state || self.role.dizz_state) {
			return;
		}
		if (self.role.isStand && self.role.standTime > 0) {
			let nowTime = egret.getTimer();
			self.role.standTime -= (nowTime - self.lastTime);
			self.lastTime = nowTime;
			return;
		}
		if (GGlobal.sceneType == SceneCtrl.GUANQIA && Model_player.voMine.sceneChar) {
			let xx = Math.abs(Model_player.voMine.sceneChar.x - self.role.x);
			let arr = JSON.parse(Config.xtcs_004[2021].other);
			if (self.role.standTime > 0 && xx >= arr[0][0] && xx <= arr[0][1]) {
				self.lastTime = egret.getTimer();
				self.role.isStand = true;
				self.ai_state = 0;
				self.role.move_state = 0;
				self.role.invalid |= 1;
			} else {
				if (self.ai_state == 0) {
					if (self.thinkTime >= self.thinkInterv) {
						self.think();
						self.thinkTime = 0;
					}
				} else if (self.ai_state == 1) {//正在移动状态
					if (!self.role.move_state && self.thinkTime >= self.thinkInterv) {
						self.think();
						self.thinkTime = 0;
					} else {//继续移动
						self.nearTarXY();
					}
				}
			}
		} else {
			if (self.ai_state == 0) {
				if (self.thinkTime >= self.thinkInterv) {
					self.think();
					self.thinkTime = 0;
				}
			} else if (self.ai_state == 1) {//正在移动状态
				if (!self.role.move_state && self.thinkTime >= self.thinkInterv) {
					self.think();
					self.thinkTime = 0;
				} else {//继续移动
					self.nearTarXY();
				}
			}
		}
	}

	public nearTarXY() {
		var tar = this.role.scene.getUnit(this.role.careEnemyID);
		if (tar) {
			this.nearPoint(tar.x, tar.y);
		} else {
			this.role.move_state = 0;
			this.role.invalid |= 1;
			this.ai_state = 0;
		}
	}

	public nearPoint(x: number, y: number) {
		var speedAbs = this.role.movespeed;

		var distx = x - this.role.x;
		if (distx >= 0) {
			var distxAbs = distx;
			var speedx = speedAbs;
		} else {
			var distxAbs = -distx;
			var speedx = -speedAbs;
		}
		if (distxAbs > this.nx) {
			this.role.scene.setRoleXY(this.role, this.role.x + speedx, this.role.y);
			this.role.faceX(x);
			return;
		}

		var disty = y - this.role.y;
		if (disty > 0) {
			var distyAbs = disty;
			var speedy = speedAbs;
		} else {
			var distyAbs = -disty;
			var speedy = -speedAbs;
		}
		if (distyAbs > this.ny) {
			this.role.scene.setRoleXY(this.role, this.role.x, this.role.y + speedy);
			return;
		}
		this.ai_state = 0;
		this.role.move_state = 0;
		this.role.invalid |= 1;
	}

	public think() {
		this.thinkAttack();
	}

	public thinkAttack() {
		let self = this;
		var role = self.role;
		var skillList: Array<any> = role.skillList;//取出能够释放的技能
		var enemy: SceneCharRole = role.scene.getBestRole(MapScene.NEARESTLIFEENEMYFUNC, role);//根据算法取出一个敌人
		if (!enemy) {
			return;
		}
		self.role.careEnemyID = enemy.id;
		if (skillList.length) {
			var bestSkill: Vo_Skill = SkillUtil.getBestSkill(role);
			if (bestSkill) {
				// if (bestSkill.type == 1) {//距离攻击
				if (!enemy) {
					return;
				}
				role.careEnemyID = enemy.id;

				var aicfg = bestSkill.cfg.ai;

				var skillAiMaxFarAbsx = aicfg.maxf != null ? aicfg.maxf : bestSkill.cfg.a.x;
				var skillAiMinFarAbsx = aicfg.minf != null ? aicfg.minf : 0;

				var skilly = aicfg.vert != null ? aicfg.vert : bestSkill.cfg.a.y;

				var distx = enemy.x - role.x;
				var disty = enemy.y - role.y;

				var dir = distx > 0 ? 1 : -1;

				var distxAbs = distx >= 0 ? distx : -distx;
				var distyAbs = disty >= 0 ? disty : -disty;

				self.nx = skillAiMaxFarAbsx;
				self.ny = skilly;

				if (skillAiMaxFarAbsx >= distxAbs && skilly >= distyAbs) {//isNear
					self.ai_state = 0;
					role.move_state = 0;
					self.role.invalid |= 1;
					if (bestSkill.type == Model_Skill.TYPE4) {
						if (role.id == Model_player.voMine.id) {
							let skillVo: Vo_Skill = Model_BaoWu.skillVo(0);
							if (skillVo && skillVo.id == bestSkill.id) {
								Model_player.voMine.skillcdList[2] = Config.xtcs_004[1071].num * 1000 - role.bwAndTSCD;
							} else {
								skillVo = Model_BaoWu.skillVo(1);
								if (skillVo && skillVo.id == bestSkill.id) Model_player.voMine.skillcdList[1] = Config.xtcs_004[1071].num * 1000 - role.bwAndTSCD;
							}
						} else {
							if (role.bwID1 == bestSkill.id) {
								role.skillcdList[2] = Config.xtcs_004[1071].num * 1000 - role.bwAndTSCD;
							} else if (role.bwID2 == bestSkill.id) {
								role.skillcdList[1] = Config.xtcs_004[1071].num * 1000 - role.bwAndTSCD;
							}
						}
					} else if (bestSkill.type == Model_Skill.TYPE5) {
						if (role.id == Model_player.voMine.id) {
							Model_player.voMine.skillcdList[0] = Config.xtcs_004[1072].num * 1000 - role.bwAndTSCD;
						} else {
							role.skillcdList[0] = Config.xtcs_004[1072].num * 1000 - role.bwAndTSCD;
						}
					} else {
						bestSkill.enterCool();
					}
					var skillLogic = SkillBase.getPlayLogic(role, bestSkill);
					role.faceX(enemy.x);
					role.playSkill(skillLogic);
				} else {
					if (distxAbs >= skillAiMaxFarAbsx) {
						self.tarpx = enemy.x + skillAiMaxFarAbsx * -dir;
					} else if (distxAbs <= skillAiMinFarAbsx) {
						self.tarpx = enemy.x + skillAiMinFarAbsx * -dir;
					} else {
						self.tarpx = role.x;
					}
					var rndy = -skilly + (Math.random() * skilly * 2);
					self.tarpy = enemy.y + rndy;
					self.ai_state = 1;
					role.move_state = 1;
					role.invalid |= 1;
				}
			}
			// }
		}
	}

	public onEvent(evt, arg) {
	}
}