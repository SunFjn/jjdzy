class GuanQiaSceneCtrl extends SceneCtrl {
	public constructor() {
		super();
	}

	public scene: MapScene;

	/** 0:创建怪物正在打怪 1:打完怪同步数据领取奖励
	 * */
	public state = 0;

	private static _ins: GuanQiaSceneCtrl;
	public static getIns() {
		if (!GuanQiaSceneCtrl._ins) {
			GuanQiaSceneCtrl._ins = new GuanQiaSceneCtrl();
		}
		return GuanQiaSceneCtrl._ins;
	}

	public update(ctx) {
		let s = this;
		s.stateUpdate(ctx);
	}

	//设置当前关卡状态，普通打怪状态
	public setCurSt(st) {
		let s = this;
		s.state = st;
		if (st == 0) {
			let modelguanqia = GGlobal.modelGuanQia;
			let lib = Config.xiaoguai_205;
			let mapid = lib[Config.BOSS_205[modelguanqia.curGuanQiaLv].lj].dt;
			s.updateMap(mapid);
			GGlobal.control.listen(Enum_MsgType.HERO_UPDATE, s.createMyChars, s);
			GGlobal.control.listen(Enum_MsgType.MSG_WAVEUPDATE, s.onWaveUD, s);
			GGlobal.control.listen(ModelGuanQia.msg_gqGetRed, s.updateMap, s);
			s.createMyChars();
			s.createCurWave();
		} else if (st == 1) {
			s.playMoney();
			s.lastSynTime = -99999;
			s.synWave();
		}
	}

	private updateMap(mapId: number) {
		let cfg = Config.dgq_205[ModelGuanQia.curGQID];
		if (cfg) {
			let arr = JSON.parse(cfg.guanqia);
			if (GGlobal.modelGuanQia.curGuanQiaLv == arr[0][0] || GGlobal.modelGuanQia.curGuanQiaLv == arr[0][1] + 1) {
				this.scene.initWithID(cfg.ditu);
			} else {
				this.scene.initWithID(mapId);
			}
		} else {
			this.scene.initWithID(mapId);
		}
	}

	protected playMoney() {
		let moneys: SceneMoney[] = this.scene.filterRole(MapScene.ISMONEY);
		for (let i = 0; i < moneys.length; i++) {
			moneys[i].tweenToHero();
		}
	}

	protected lastSynTime = -99999;
	protected synWave() {
		let s = this;
		//请求下一波怪啊！
		let now = egret.getTimer();
		if (now - s.lastSynTime >= 10000) {
			GGlobal.modelGuanQia.CS_WAVE_1101(GGlobal.modelGuanQia.curWave);
			s.lastSynTime = now;
		}
	}

	public stateUpdate(ctx) {
		let s = this;
		if (s.state == 0) {
			s.aiUpdate(ctx);
			let liferole = s.scene.getLifeHero();
			if (liferole) {
				s.scene.watchMainRole(35);
			} else {//失败了，重新创建角色
				s.createMyChars();
			}

			if (!s.scene.getForceCount(2)) {
				s.setCurSt(1);
				return;
			}
		} else if (s.state == 1) {
			GuanQiaAI.keepPos(Model_player.voMine);
			s.synWave();
		}
	}

	onEnter(scene: MapScene) {
		let s = this;
		s.scene = scene;
		scene.ignoreBreak = false;

		s.createMyChars();

		s.scene.setLeftAndRight();

		s.setCurSt(0);
	}

	onExit(scene: MapScene) {
		let s = this;
		GGlobal.control.remove(Enum_MsgType.MSG_WAVEUPDATE, s.onWaveUD, s);
		s.scene.removeAll();
	}

	protected onWaveUD() {
		let s = this;
		s.setCurSt(0);
	}
	//根据后端的结果放大自身属性 BOSS战
	public createMyChars(isBoss?: boolean) {
		let s = this;
		let vomine = Model_player.voMine;
		vomine.updateChars();
		let role: SceneCharRole = vomine.sceneChar;
		role.scene = s.scene;
		if (s.scene.getUnit(role.id)) {
			s.scene.watchMainRole(35);
			return;
		}
		role.curhp = role.maxhp;
		s.setRolePos(role);
		role.invalid |= 1023;
		role.force = 1;
		s.scene.addUnit(role);
		s.scene.watchMainRole(35);
		s.addHpAndName(role, true);
	}

	protected createCurWave() {
		let s = this;
		let guanqia = GGlobal.modelGuanQia.curGuanQiaLv;
		let guanqiacfg = Config.BOSS_205[guanqia];
		let cfg = Config.xiaoguai_205[guanqiacfg.lj];
		if (!cfg) {
			ViewCommonWarn.text("noneLevel:" + guanqia);
			return;
		}
		let count = 0;
		let monsters: Array<any> = JSON.parse((cfg.m as string));
		for (let i = 0; i < monsters.length; i++) {
			let id = monsters[i][1];
			let num = monsters[i][2];
			for (let ii = 0; ii < num; ii++) {
				let m = s.createEmenyByInfo(id);
				s.setMonsterPos(m, (count / 2) >> 0);
				count++;
			}
		}
	}

	protected createEmenyByInfo(id) {
		let s = this;
		let mapscene = s.scene;

		let enemy = super.createEmeny(id);
		let gailv = Math.random() * 100000;
		if (gailv <= Config.xtcs_004[2023].num) {
			enemy.standTime = Config.xtcs_004[2022].num;
		} else {
			enemy.standTime = 0;
		}
		enemy.isStand = false;
		s.setMonsterPos(enemy);
		enemy.curhp = enemy.maxhp = ModelGuanQia.MAX_HP;

		let ai = CommonAICtrl.create();
		ai.role = enemy;
		enemy.addPlug(ai);

		let hpplug = GuanQiaMonHpPlug.create();
		hpplug.role = enemy;
		enemy.addPlug(hpplug);

		mapscene.addUnit(enemy);

		return enemy;
	}

	public setMonsterPos(enemy: SceneCharRole, fixedPos = 0) {
		let role = this.scene.getLifeHero();
		let posArr = [500, 620, 750]
		let pos = 662;
		if (posArr.length > fixedPos) pos = posArr[fixedPos];
		enemy.x = MathUtil.rndNum(role.x + 400, role.x + 600);
		enemy.y = MathUtil.rndNum(pos + 50, pos);
	}

	public aiUpdate(ctx) {
		let vomine = Model_player.voMine;
		GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
	}

	public bossAiUpdate(ctx) {
		let enemys: SceneCharRole[] = this.scene.filterRole(MapScene.ISLIFEENEMY, 1);
		for (let len = enemys.length, i = 0; i < len; i++) {
			let enemy = enemys[i];
			GuanQiaAI.thinkAttack(enemy, ctx);
		}
	}

	//boss--
	public challBoss() {
		let s = this;
		GGlobal.mapscene.enterScene(SceneCtrl.GUANQIABOSS);
	}
}