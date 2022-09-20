/**问鼎天下 攻击怪物*/class WenDingTXPVECtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	private _hero: SceneCharRole;
	private _monster: SceneCharRole;

	public winScore = 0;
	public result = 0;
	public awards = [];
	public onEnter(scene: MapScene) {
		let s = this;
		s.scene = scene;
		let layer = GGlobal.modelWenDingTX.layer;
		let cfg = Config.wdtx_260[layer];
		let vo = VoItem.create(13);
		vo.count = cfg.point;
		s.awards = [vo];
		s.winScore = cfg.point;
		s.scene.initWithID(380000);
		let npcCFG = JSON.parse(cfg.npc)[0];
		s.createMyChars();
		s.createEmenyByInfo(npcCFG[0]);
		s.scene.setLeftAndRight();
		// GGlobal.control.listen(Enum_MsgType.WDTX_PVE_END, s.showReslt, s);
	}

	public onExit() {
		let s = this;
		s.scene.removeAll();
		s._hero = null;
		s._monster = null;
		s.result = 0;
		// GGlobal.control.remove(Enum_MsgType.WDTX_PVE_END, s.showReslt, s);
		GGlobal.layerMgr.close(UIConst.COMMON_WIN);
		GGlobal.layerMgr.close(UIConst.COMMON_FAIL);
	}

	// private showReslt(arg) {
	// 	if (arg == 1) {
	// 		ViewCommonWin.show(this.awards, 5000, this, "确定", WenDingTXManager.exiteBattle);
	// 	} else {
	// 		ViewCommonFail.show(5000, this, "退出", WenDingTXManager.exiteBattle);
	// 	}
	// }

	public update(ctx) {
		var self = this;
		var leftNum = GGlobal.mapscene.getForceCount(1);
		var rightNum = GGlobal.mapscene.getForceCount(2);
		if (leftNum == 0 || rightNum == 0) {
			if (self.result == 0) {
				GGlobal.modelWenDingTX.fightEnd4233(leftNum == 1 ? 1 : 2);
				WenDingTXManager.leavelBattleScene();
			}
			self.result = 1;
			return;
		}

		this.scene.watchMainRole();
		var guanQiaAI = GuanQiaAI;
		var leftrole: SceneCharRole = self._hero;
		guanQiaAI.thinkAttack(leftrole, ctx);
		var rightrole: SceneCharRole = self._monster;
		guanQiaAI.thinkAttack(rightrole, ctx);
	}


	public createMyChars() {
		let s = this;
		let vomine = Model_player.voMine;
		vomine.updateChars();
		let role: SceneCharRole = vomine.sceneChar;
		role.scene = s.scene;
		if (s.scene.getUnit(role.id)) {
			s.scene.watchMainRole(35);
			return;
		}
		s.setRolePos(role);
		role.invalid |= 1023;
		role.force = 1;
		s.scene.addUnit(role);
		s.scene.watchMainRole(35);
		s.addHpAndName(role, true);
		s._hero = role;
	}

	protected createEmenyByInfo(id) {
		let s = this;
		let mapscene = s.scene;

		let enemy = super.createEmeny(id);
		s.setMonsterPos(enemy);

		let hpplug = RoleHpAndNamePlug.create();
		hpplug.role = enemy;
		enemy.addPlug(hpplug);

		mapscene.addUnit(enemy);
		s._monster = enemy;
	}


	private static _inst: WenDingTXPVECtrl;
	public static getInstance() {
		return this._inst || (this._inst = new WenDingTXPVECtrl());
	}
}