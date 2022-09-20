class ViewMainBottomUI extends fairygui.GComponent {
	public constructor() {
		super();
	}

	public static URL: string = "ui://7gxkx46wmp9n0";
	public static _instance: ViewMainBottomUI;
	public static get instance(): ViewMainBottomUI {
		if (!ViewMainBottomUI._instance) ViewMainBottomUI._instance = <ViewMainBottomUI><any>(fairygui.UIPackage.createObject("MainUI", "ViewMainButtom"));
		return ViewMainBottomUI._instance;
	}

	public bar: fairygui.GProgressBar;
	public generalBt: MainMenuBtn;
	public roleBt: MainMenuBtn;
	public bagBt: MainMenuBtn;
	public recruitBt: MainMenuBtn;
	public forgeBt: MainMenuBtn;
	public townBt: MainMenuBtn;
	public imgRongL: fairygui.GLoader;
	public imgRongL1: fairygui.GLoader;
	public gRongL: fairygui.GGroup;
	public imgBackGQ: fairygui.GLoader;
	public gBackGQ: fairygui.GGroup;
	public t0: fairygui.Transition;

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		let r = GGlobal.reddot;
		let c = GGlobal.control;

		s.generalBt = <MainMenuBtn><any>(s.getChild("generalBt"));
		s.generalBt.panelId = UIConst.WU_JIANG;
		s.generalBt.checkDisImg = false;
		s.roleBt = <MainMenuBtn><any>(s.getChild("roleBt"));
		s.roleBt.panelId = UIConst.ROLE;
		s.bagBt = <MainMenuBtn><any>(s.getChild("bagBt"));
		s.bagBt.panelId = UIConst.BAG;
		s.recruitBt = <MainMenuBtn><any>(s.getChild("recruitBt"));
		s.recruitBt.panelId = UIConst.MAIN_SKILL;
		s.forgeBt = <MainMenuBtn><any>(s.getChild("forgeBt"));
		s.forgeBt.panelId = UIConst.DUANZAO_STRENG;
		s.townBt = <MainMenuBtn><any>(s.getChild("townBt"));
		s.townBt.panelId = UIConst.MAINTOWN;
		s.bar = <fairygui.GProgressBar><any>(s.getChild("bar"));
		s.gRongL = <fairygui.GGroup><any>(this.getChild("gRongL"));
		s.imgRongL = <fairygui.GLoader><any>(this.getChild("imgRongL"));
		s.t0 = this.getTransition("t0");
		s.imgBackGQ = <fairygui.GLoader><any>(this.getChild("imgBackGQ"));
		s.gBackGQ = <fairygui.GGroup><any>(this.getChild("gBackGQ"));

		s.gBackGQ.visible = false;
		s.gRongL.visible = false;
		s.t0.stop();

		s.resetPosition();
		s.imgRongL.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onRongL, s);
		s.imgBackGQ.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onBackGQ, s);
		r.listen(ReddotEvent.CHECK_DAUNZAO, s.checkDuanZaoNotice, s);
		r.listen(ReddotEvent.CHECK_SKILL, s.checkSkillNotice, s);
		r.listen(ReddotEvent.CHECK_GOD_SKILL, s.checkSkillNotice, s);
		r.listen(ReddotEvent.CHECK_XINGTU, s.checkSkillNotice, s);
		r.listen(ReddotEvent.CHECK_BAOWU, s.checkRolelNotice, s);
		r.listen(ReddotEvent.CHECK_TIANSHU, s.checkRolelNotice, s);
		r.listen(ReddotEvent.CHECK_ROLE, s.checkRolelNotice, s);
		r.listen(ReddotEvent.CHECK_REBIRTH, s.checkRolelNotice, s);
		r.listen(ReddotEvent.CHECK_BAOWU, s.checkRolelNotice, s);
		r.listen(ReddotEvent.CHECK_TIANSHU, s.checkRolelNotice, s);
		r.listen(ReddotEvent.CHECK_ZHAN_JIA, s.checkRolelNotice, s);
		r.listen(ReddotEvent.CHECK_BINGFA, s.checkRolelNotice, s);
		r.listen(UIConst.MHBOSS, s.checkTownBtn, s);
		r.listen(UIConst.DRBOSS, s.checkTownBtn, s);
		r.listen(UIConst.LBBOSS, s.checkTownBtn, s);
		r.listen(UIConst.QMBOSS, s.checkTownBtn, s);
		r.listen(ReddotEvent.CHECK_CROSS_WARS, s.checkTownBtn, s);
		r.listen(ReddotEvent.CHECK_CROSS_KING, s.checkTownBtn, s);
		r.listen(ReddotEvent.CHECK_CROSS_SJMJ, s.checkTownBtn, s);
		r.listen(ReddotEvent.CHECK_COUNTRY, s.checkTownBtn, s);
		r.listen(ReddotEvent.CHECK_PEACOCK, s.checkTownBtn, s);
		r.listen(UIConst.LONGZHONGDUI, s.checkTownBtn, s);
		r.listen(UIConst.SHAOZHU_ESCORT, s.checkTownBtn, s);
		r.listen(UIConst.QXZL, s.checkTownBtn, s);
		r.listen(ReddotEnum.GROUP_QICE, s.checkTownBtn, s);
		r.listen(UIConst.ZSSF, s.checkTownBtn, s);
		r.listen(UIConst.LHFB, s.checkTownBtn, s);
		GGlobal.modelSHJX.listen(ModelSH.msg_notice, this.checkTownBtn, this);
		r.listen(ReddotEvent.CHECK_WU_JIANG, s.checkWuJiang, s);
		r.listen(UIConst.ZS_GODWEAPON, s.checkWuJiang, s);
		r.listen(UIConst.RONGLIAN, s.checkBagNotice, s);
		r.listen(UIConst.BAG, s.checkBagNotice, s);

		c.listen(Enum_MsgType.ONRESIZE, s.resetPosition, s);
		c.listen(Enum_MsgType.ACTIVITY_LOGIN_SEND, s.checkSBDiscount, s);
		c.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, s.checkSBDiscount, s);
		GGlobal.modelPlayer.listen(Model_player.EXP_UPDATE, s.expUpdate, s);
		s.checkSkillNotice();
		s.checkRolelNotice();
		s.checkDuanZaoNotice();
		s.checkBagNotice();
		s.checkTownBtn();
		s.expUpdate();
		s.checkWuJiang();
		s.checkSBDiscount();
	}

	private expUpdate() {
		let v = Model_player.voMine;
		let lb = Config.lv_200[v.level]
		// let lhCfg = Config.lunhui_274[Model_player.voMine.reincarnationLevel];
		// this.bar.max = lb.exp * (1 + lhCfg.exp / 100);
		this.bar.max = lb.exp;
		this.bar.value = v.exp;
	}

	public checkRolelNotice() {
		let r = GGlobal.reddot;
		let checkLH = r.checkCondition(UIConst.LUNHUI) || r.checkCondition(UIConst.TIANMING) || Model_LunHui.checkSWNotice();
		//宝物
		let checkBW = r.checkCondition(UIConst.BAOWU, 0) || r.checkCondition(UIConst.BAOWU, 1) || r.checkCondition(UIConst.JUEXING, 1);
		//天书
		let checkTS = r.checkCondition(UIConst.TIANSHU, 0) || r.checkCondition(UIConst.TIANSHU, 1) || r.checkCondition(UIConst.TIANSHU, 2)
			|| r.checkCondition(UIConst.TIANSHU, 3) || r.checkCondition(UIConst.TIANSHU, 4) || r.checkCondition(UIConst.TIANSHU, 5) || r.checkCondition(UIConst.JUEXING, 4);
		//神剑
		let checkShenJian = r.checkCondition(UIConst.SHEN_JIAN, 0) || r.checkCondition(UIConst.SHEN_JIAN, 1) || r.checkCondition(UIConst.SHEN_JIAN, 2) || r.checkCondition(UIConst.JUEXING, 2);
		//异宝
		let checkYB;
		if (Model_YiBao.isFirstOpen) {
			checkYB = r.checkCondition(UIConst.YIBAO, 0) || r.checkCondition(UIConst.YIBAO, 1) || r.checkCondition(UIConst.YIBAO, 2) || r.checkCondition(UIConst.JUEXING, 3);
		} else {
			checkYB = r.checkCondition(UIConst.ROLE, UIConst.YIBAO);
		}
		//战甲
		let checkZJ = r.checkCondition(UIConst.ZHAN_JIA, 0) || r.checkCondition(UIConst.JUEXING, 6)
		//兵法
		let checkBF = r.checkCondition(UIConst.BINGFA, 0) || r.checkCondition(UIConst.BINGFA, 1) || r.checkCondition(UIConst.BINGFA, 2) || r.checkCondition(UIConst.BINGFA, 3) || r.checkCondition(UIConst.JUEXING, 5);

		this.roleBt.checkNotice = r.checkCondition(UIConst.ROLE, 4) || r.checkCondition(UIConst.REBIRTH, 0) || r.checkCondition(UIConst.TITLE, 0) || r.checkCondition(UIConst.ROLE, 1) || r.checkCondition(UIConst.GOD_EQUIP, 0) || r.checkCondition(UIConst.GOD_EQUIP, 1)
			|| checkBF || checkZJ || checkYB || checkShenJian || checkTS || checkBW || checkLH;
	}

	public checkSkillNotice() {
		let r = GGlobal.reddot;
		let checkXT = r.checkCondition(UIConst.XING_TU);
		this.recruitBt.checkNotice = r.checkCondition(UIConst.MAIN_SKILL) || r.checkCondition(UIConst.MAIN_SKILL_GOD) || checkXT;
	}

	public checkDuanZaoNotice(): void {
		let r = GGlobal.reddot;
		this.forgeBt.checkNotice = r.checkCondition(UIConst.DUANZAO_STRENG, 0) || r.checkCondition(UIConst.DUANZAO_STRENG, 1) ||
			r.checkCondition(UIConst.DUANZAO_STRENG, 2) || r.checkCondition(UIConst.DUANZAO_STRENG, 3);
	}

	public checkBagNotice(): void {
		let r = GGlobal.reddot;
		let rongL = r.checkCondition(UIConst.RONGLIAN, 0)
		this.bagBt.checkNotice = r.checkCondition(UIConst.BAG, 0) || r.checkCondition(UIConst.BAG, 1) || rongL || r.checkCondition(UIConst.RONGLIAN, 1) || r.checkCondition(UIConst.RONGLIAN, 2)
		if (rongL) {
			this.gRongL.visible = true;
			this.t0.play(null, null, null, -1);
		} else {
			this.gRongL.visible = false;
			if (!this.gBackGQ.visible) {
				this.t0.stop();
			}
		}
	}

	/**
	 * 检查神兵折扣图标显示
	 */
	private checkSBDiscount() {
		if (GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK)) {
			this.generalBt.checkDisImg = true;
		} else {
			this.generalBt.checkDisImg = false;
		}
	}

	private onRongL(): void {
		Model_RongLian.ALERT_ONEKEY()
	}

	private setBackGQ(vis: boolean): void {
		var gua = GGlobal.modelGuanQia.curGuanQiaLv;
		if (vis && gua >= 12 && gua <= 50) {
			this.gBackGQ.visible = true;
			this.t0.play(null, null, null, -1);
		} else {
			this.gBackGQ.visible = false;
			if (!this.gRongL.visible) {
				this.t0.stop();
			}
		}
	}

	private onBackGQ(): void {
		if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelGuanQia.inGuanQiaBoss()) {
			ViewCommonWarn.text("请先退出当前场景");
			return;
		}
		if (GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
			GGlobal.layerMgr.close2(UIConst.MAINTOWN);
		}
		this.setBackGQ(false)
	}

	//true icon显示主城  false 显示战斗
	public changeTownBt(v) {
		this.townBt.icon = v ? "ui://7gxkx46wmrrg4f" : "ui://7gxkx46wxhyw5a"
		if (v) {
			this.setBackGQ(false)
		} else {
			this.setBackGQ(true)
		}
	}

	private checkTownBtn() {
		let r = GGlobal.reddot;
		this.townBt.checkNotice = r.checkCondition(UIConst.LONGZHONGDUI)
			|| r.checkCondition(UIConst.DRBOSS)
			|| r.checkCondition(UIConst.LBBOSS)
			|| r.checkCondition(UIConst.MHBOSS)
			|| r.checkCondition(UIConst.QMBOSS)
			|| r.checkCondition(UIConst.BOSS_BATTLEFIELD_CROSS)
			|| r.checkCondition(UIConst.BOSS_BATTLEFIELD_LOCAL)
			|| r.checkCondition(UIConst.CROSS_WARS)
			|| r.checkCondition(UIConst.CROSS_KING)
			|| r.checkCondition(UIConst.SJMJ1)
			|| r.checkCondition(UIConst.COUNTRY_KINGSHIP)
			|| r.checkCondition(UIConst.COUNTRY_DONATE)
			|| r.checkCondition(UIConst.PEACOCK)
			|| r.checkCondition(UIConst.SHOULING)
			|| r.checkCondition(UIConst.CROSS_MINERAL, 0)
			|| r.checkCondition(UIConst.CROSS_MINERAL, 1)
			|| r.checkCondition(UIConst.CROSS_MINERAL, 2)
			|| r.checkCondition(UIConst.SHAOZHU_ESCORT, 0)
			|| r.checkCondition(UIConst.SHAOZHU_ESCORT, 1)
			|| r.checkCondition(UIConst.SHAOZHU_ESCORT, 2)
			|| ReddotMgr.ins().getValue(ReddotEnum.GROUP_QICE) > 0
			|| r.checkCondition(UIConst.LHFB)
			|| r.checkCondition(UIConst.QXZL)
			|| r.checkCondition(UIConst.ZSSF, 0)
			|| r.checkCondition(UIConst.ZSSF, 1)
	}

	private checkWuJiang() {
		let r = GGlobal.reddot;
		let temp = ViewMainBottomUI.checkShenjiangzhiliNotic();
		let temp1 = ViewMainBottomUI.checkShenjiangzhiliSkillNotic();
		this.generalBt.checkNotice = r.checkCondition(UIConst.WU_JIANG, 0) ||
			r.checkCondition(UIConst.WU_JIANG, 1) ||
			r.checkCondition(UIConst.WU_JIANG, 2) ||
			r.checkCondition(UIConst.WU_JIANG, 3) ||
			r.checkCondition(UIConst.WU_JIANG, 4) ||
			r.checkCondition(UIConst.JUEXING, 0) || temp || temp1 ||
			r.checkCondition(UIConst.ZS_GODWEAPON, 0) ||
			r.checkCondition(UIConst.ZS_GODWEAPON, 1) ||
			r.checkCondition(UIConst.ZS_GODWEAPON, 2)||
			r.checkCondition(UIConst.JUEXING, 7);
	}
	/**检测神将之力的红点 */
	public static checkShenjiangzhiliNotic() {
		let temp = Model_WuJiang.wujiangGodPower;
		for (let key in temp) {
			if (GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI, parseInt(key))) {
				return true;
			}
		}
		return false;
	}

	/**检测神将之力技能进阶的红点 */
	public static checkShenjiangzhiliSkillNotic() {
		let temp = Model_WuJiang.shenjiangzhiliSkillLv;
		for (let key in temp) {
			if (GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI_SKILL, parseInt(key))) {
				return true;
			}
		}
		return false;
	}

	public resetPosition(): void {
		let s = this;
		s.setXY((fairygui.GRoot.inst.width - s.width) / 2, fairygui.GRoot.inst.height - s.height);
		let backImg = s.getChild("n1").asImage;
		backImg.setXY(-GGlobal.layerMgr.offx, 29);
		backImg.setSize(App.stageWidth, 91);
		s.bar.setXY(-GGlobal.layerMgr.offx, 121);
		s.bar.setSize(App.stageWidth, 10);
	}

	protected onClickExit(): void {
		if (this.exitFun) {
			this.exitFun.run();
		} else {
			GGlobal.modelGlobalMsg.notify(Model_GlobalMsg.MSG_EXIT_FUBEN);
		}
	}

	protected btnExit: fairygui.GButton;
	protected exitFun: Handler;
	protected thisObj: any;
	public setExitBtn(bo: boolean, callBack?: Handler, thisObj?: any): void {
		let self = this;
		self.exitFun = callBack;
		self.thisObj = thisObj;
		if (bo) {
			if (!self.btnExit) {
				self.btnExit = GGlobal.commonpkg.createObject("CloseBt").asButton
				self.btnExit.width = 67;
				self.btnExit.height = 75;
				self.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClickExit, self);
			}
			self.btnExit.y = App.stageHeight - 270;
			GGlobal.layerMgr.UI_MainLowBottom.addChild(self.btnExit);
		} else {
			if (self.btnExit && self.btnExit.parent) {
				self.btnExit.parent.removeChild(self.btnExit);
			}
			if (this.exitFun) {
				this.exitFun.recover();
				this.exitFun = null;
			}
		}
	}

	public setExitVis(vis) {
		if (this.btnExit) {
			this.btnExit.visible = vis;
		}
	}

	public getBagRootPos() {
		return this.bagBt.localToRoot();
	}
}