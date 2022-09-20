class BossCtrl extends SceneCtrl {
	public constructor() {
		super();
	}
	bossDmgPer = 0;//BOSS秒伤
	update(ctx) {
	}

	onEnter(scene: MapScene) {
		let s = this;
		s.scene = scene;
		scene.ignoreBreak = false;
		GGlobal.layerMgr.close2(UIConst.BOSS);
		GGlobal.control.listen(Enum_MsgType.MSG_MINEHPCHANGE, s.updateHp, s);
		MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
		s.createMyChars();
	}

	onExit(scene: MapScene) {
		let self = this;
		GGlobal.control.remove(Enum_MsgType.MSG_MINEHPCHANGE, self.updateHp, self);
		View_BossSceneHead.hide();
		let vomine = Model_player.voMine;
		let role: SceneCharRole = vomine.sceneChar;
		if (role) {
			role.curhp = role.maxhp;
			role.immuneDmg = 0;
		}
		self.scene.ctx = {};
		self.scene.removeAll();
		self.others = [];
		MainUIController.showBottomExite(false);
		self.deadInvide = 0;

		GGlobal.modelPlayer.playerDetailDic = {};
		self.enemyBoss = null;
	}

	protected updateHp(arg) {
		let vomine = Model_player.voMine;
		if (vomine.sceneChar) {
			if (arg.hp > 0) this.deadInvide = 0;
			vomine.sceneChar.curhp = arg.hp;
		}
	}

	protected onClickEixt() {
	}

	public createMyChars() {
		let vomine = Model_player.voMine;
		vomine.updateChars();

		let role: SceneCharRole = vomine.sceneChar;
		this.setRolePos(role);
		role.invalid |= 1023;
		role.force = 1;
		role.clearHurt = 1;
		if (this.scene.getUnit(role.id) == undefined) {
			this.scene.addUnit(role);
			this.addHpAndName(role, true);
		}
		let m = GGlobal.modelBoss;
		this.scaleAttribute(role, m.bossResult, true);
	}

	public setBossPos(role: SceneCharRole, offx = 0) {
		let cx = this.scene.map.focusx;
		role.x = cx + 400 + offx;
		role.y = 700;
	}

	public aiUpdate(ctx) {
		let vomine = Model_player.voMine;
		if (vomine && vomine.sceneChar) {
			GuanQiaAI.thinkAttack(vomine.sceneChar, ctx);
		}
	}

	protected generalStateChange(data) {
		let st = data.st;
		let list = data.list;
		if (st == 0) {
			this.generalRelife(list);
		} else {
			this.generalKilled(list);
		}
	}

	protected generalKilled(lst: any[]): void {
		for (let i = 0; i < lst.length; i++) {
			let id = lst[i];
			let role = GGlobal.mapscene.getUnit(id) as SceneCharRole
			if (role) {
				role.deadRemove();
			}
			for (let j = 0; j < this.others.length; j++) {
				if (this.others[j] && this.others[j].id == id) {
					this.others[j] = null;
				}
			}
		}
	}

	protected generalRelife(lst: any[]): void {
		for (let i = 0; i < lst.length; i++) {
			let id = lst[i];
			let role = GGlobal.mapscene.getUnit(id)
			if (role) {
				role.curhp = role.maxhp;
			} else if (GGlobal.modelPlayer.playerDetailDic[id]) {
				GGlobal.control.notify(Enum_MsgType.MSG_ADDROLEDETAIL, GGlobal.modelPlayer.playerDetailDic[id]);
			}
		}
		ArrayUitl.cleannull(this.others);
	}

	protected enemyBoss: SceneCharRole;
	public createChars(voplayer: Vo_Player, pos) {
		voplayer.updateChars();
		let s = this;
		let i = 0;
		let role: SceneCharRole = voplayer.sceneChar;
		if (s.scene.getUnit(role.id) == undefined) {
			s.setRolePos(role);
			role.invalid |= 255;
			role.force = pos;
			role.setName(voplayer.name);
			s.scene.addUnit(role);
		} else {
			s.setRolePos(role);
		}
	}

	/**其他玩家信息 */
	public others: Vo_Player[] = [];
	public createOtherPlayer(vo: Vo_Player): void {
		let s = this;
		ArrayUitl.cleannull(s.others);
		if (s.others.length >= 5) {
			s.removeOther(s.others[0].id);
		}
		if (s.others.indexOf(vo) == -1) {
			s.others.push(vo);
		}
		if (Model_player.isMineID(vo.id)) {
			return;
		}
		s.createChars(vo, 1);
	}

	/**删除某个玩家 */
	public removeOther(id: number): void {
		let s = this;
		let len = s.others.length;
		for (let i = 0; i < len; i++) {
			if (s.others[i] && s.others[i].id == id) {
				let vo = s.others[i];
				if (vo.sceneChar && vo.sceneChar.view && vo.sceneChar.view.parent) {//当前角色还存在于此场景
					s.scene.removeUnit(vo.sceneChar);
				}
				if (Model_player.voMine.id == vo.id) {
					Model_player.voMine.sceneChar = null;
				}
				s.others[i] = null;
				break;
			}
		}
		ArrayUitl.cleannull(s.others);
	}
}