class GuideStepManager {
	public constructor() {
	}

	public static serverAuto: boolean = false;
	/**
	 * 是否允许自动新手的服务器标识
	 */
	public static isServerAuto(): boolean {
		var ret: boolean = GuideStepManager.serverAuto
		return ret;
	}

	private _restrictMap: any = {};
	public get restrictCount(): number {
		return this._restrictCount;
	}
	private _restrictCount: number = 0;
	public addRestrict(ident: string): void {
		if (ident == null) {
			return;
		}
		if (this._restrictMap[ident] == null) {
			this._restrictMap[ident] = true;

			this._restrictCount++;

			if (this._restrictCount == 1) {
				if (this.curStep && this.curStep.pause) {
					this.curStep.pause(this.curStep);
				}
			}
		}
	}

	public removeRestrict(ident: string): void {
		if (this._restrictMap[ident]) {
			delete this._restrictMap[ident];
			this._restrictCount--;

			if (this._restrictCount == 0) {
				if (this.curStep && this.curStep.resume) {
					this.curStep.resume(this.curStep);
				}
			}
		}
	}

	private static _instance: GuideStepManager;
	public static get instance(): GuideStepManager {
		if (GuideStepManager._instance == null) {
			GuideStepManager._instance = new GuideStepManager();
		}
		return GuideStepManager._instance;
	}

	public _auto: Function;
	/**
	 * @param 默认指向右<br>
	 * 指向下 rotate:-90 px:0 py:-50
	 * @auto 自动执行 如果为可视对象为可视对象抛出消息，否则认为是函数来执行
	 * @passRestrict 是否忽略限制来执行自动操作
	 */
	public showGuide(target: fairygui.GComponent, ax: number, ay: number, auto: any = null, isTop: boolean = false, passRestrict: boolean = false): void {
		if (Model_player.taskId <= 0 || Model_player.taskSt == 2) {
			target = null;
		}

		if (target != null) {//remove
			QuestGuideArrow.instance.focuseTo(target, ax, ay, isTop);
			QuestGuideArrow.instance.passRestrict = passRestrict;
		}
		this._auto = null;
	}

	/**
	 * @param 默认指向右<br>
 	* 指向下 rotate:-90 px:0 py:-50
 	* @auto 自动执行 如果为可视对象为可视对象抛出消息，否则认为是函数来执行
	 * @passRestrict 是否忽略限制来执行自动操作
 	*/
	public showGuide1(index: number, target: fairygui.GComponent, ax: number, ay: number, rotate: number = 0, px: number = -106, py: number = 5, isTop: boolean = false, auto: any = null,
		passRestrict: boolean = false): void {
		let self = this;
		if (index == -1) {
			QuestGuideArrow1.instance.focuseTo(target, ax, ay, rotate, px, py, isTop);
			let taskID = Config.mission_243[Model_player.taskId].next;
			if ((taskID > Config.xtcs_004[2801].num && Model_player.taskId < Config.xtcs_004[2806].num)) {
				self.showText("恭喜[color=#15F234]通过新手[/color]，江湖险恶，少侠一路保重！");
			} else {
				self.showText("点击领取奖励");
			}
		} else {
			let type = Config.mission_243[Model_player.taskId].type;
			let cfg = Config.xszy_243[type * 100 + index];
			if (cfg && cfg.miaoshu != "0") {
				if (Model_player.taskId <= 0 || Model_player.taskSt == 2) {
					target = null;
				}
				if (target != null) {//remove
					QuestGuideArrow1.instance.focuseTo(target, ax, ay, rotate, px, py, isTop);
					self.showText(cfg.miaoshu);
				}
				self._auto = null;
			} else {
				self.hideArrow1();
			}
		}
	}


	public showText(v: string): void {
		QuestGuideArrow1.instance.setText(v);
	}


	public checkCurrentGuide(): void {

	}

	private _timerCounter: number;
	public run(): void {
		if (!GGlobal.mapscene) return;
		this._timerCounter -= GGlobal.mapscene.dt;
		this._timerCounter = 100;

		if (this._restrictCount == 0) {
			if (this._timerCounter >= 0) {
				this.tickNow();
				this.handup();
			}
		}
	}

	public tickNow(): void {
		var matchStep: any = this.selectBestStep();

		if (matchStep == null) {
			this.exit("finish");
			return;
		}
		if (matchStep.source.prefault && matchStep.finishCheck(matchStep) == false) {
			this.exit("fault");
			return;
		}

		if (this.curStep != matchStep) {
			if (this.curStep != null) {
				if (this.curStep.exit != null) {
					this.curStep.exit(this.curStep);
				}
			}
			this.curStep = matchStep;
			if (this.curStep != null) {
				if (this.curStep.enter != null) {
					this.curStep.enter(this.curStep);
				}
			}
		}
	}

	public exit(reason: string): void {
		if (this.curStep) {
			if (this.curStep.exit != null) {
				this.curStep.exit(this.curStep);
			}
		}

		GGlobal.control.remove(Enum_MsgType.MSG_ENTERFRAME, this.run, this);
		this.curStep = null;
		this.guideList.length = 0;

		this.cleanupVars();
		this.checkArrowTarget();
	}

	//清空信息
	public cleanupVars(): void {
	}

	public selectBestStep(): any {
		var testStep: any = this.curStep;
		var retStep: any;

		while (testStep != null && testStep.preStep != null) {
			if (testStep.source.irreversible) {
				break;
			}
			testStep = testStep.preStep;
		}

		while (testStep) {
			if (this.checkNext(testStep) == false) {
				retStep = testStep;
				break;
			}
			testStep = testStep.nextStep;
		}

		return retStep;
	}

	private checkNext(step: any): boolean {
		var ret: boolean = false;
		if (ret == false) {
			if (step.finishCheck(step) == true) {
				ret = true;
			}
		}
		return ret;
	}


	public static TIMEDELTAMAX: number = 10000;
	private _handupremain: number = 10000;
	private handup(): void {
		this._handupremain -= 200;
		if (this._handupremain <= 0) {
			if (this.curStep != null) {
				if (this.curStep.auto != null) {
					this.curStep.auto(this.curStep);
				}
			}
			this._handupremain = GuideStepManager.TIMEDELTAMAX;
		}
	}

	public guideList: Array<any> = [];
	public source: Array<any> = [];
	public curStep: any;
	public doSeq(seq: Array<any>, restrict: boolean = true): void {
		if (this.curStep && this.curStep.source && this.curStep.source.exitPre) {
			this.curStep.exit(this.curStep);
		}


		this.source = seq;
		this.fill();
		if (this.guideList.length) {
			GGlobal.control.listen(Enum_MsgType.MSG_ENTERFRAME, this.run, this);
		}
	}

	public doTempSeq(seq: Array<any>): void {
	}

	public fill(): void {
		this.guideList.length = 0;

		var preStep: any;
		for (var i: number = 0; i < this.source.length; i++) {
			var step: any = {};
			var type: string = this.source[i].type;
			var arg: any = this.source[i].arg;

			step.finishCheck = (type + "_finishCheck" in this) ? this[type + "_finishCheck"] : null;
			step.enter = (type + "_enter" in this) ? this[type + "_enter"] : null;
			step.exit = (type + "_exit" in this) ? this[type + "_exit"] : null;
			step.finish = (type + "_finish" in this) ? this[type + "_finish"] : null;
			step.arg = arg;
			step.source = this.source[i];
			this.guideList.push(step);

			if (preStep != null) {
				step.preStep = preStep;
				preStep.nextStep = step;
			}
			preStep = step;
		}

		this.curStep = this.guideList[0];
		if (this.curStep && this.curStep.enter) {
			this.curStep.enter(this.curStep);
		}
	}

	//---------[打开面板
	public openui_finishCheck(step: any): boolean {
		var ret: boolean = false;
		if (typeof step.arg === "number") {
			if (step.source.panelId) {
				ret = GGlobal.layerMgr.isOpenView(step.arg) || GGlobal.layerMgr.isOpenView(step.source.panelId) || GGlobal.layerMgr.lastPanelId == step.source.panelId;
			} else {
				let cfg = Config.mission_243[step.source.taskid]
				if (cfg && cfg.type == 7) {
					ret = GGlobal.layerMgr.isOpenView(step.arg) || GGlobal.sceneType == SceneCtrl.PEACOCK;
				} else {
					ret = GGlobal.layerMgr.isOpenView(step.arg);
				}
			}
		}
		if (!ret) ret = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public openui_enter(step: any): void {
		if (typeof step.arg === "number" && !GuideStepManager.instance.finishCheck(step)) {
			if (step.arg == UIConst.NANZHENG_BEIZHAN) {
				(GGlobal.layerMgr.getView(UIConst.COUNTRY) as ViewCountryPanel).guidePage(step);
			} else {
				if (GGlobal.isEnterGame) {
					ViewMainUIBottomUI1.instance.updateNewerGuide();
				}
			}
		}
	}

	public openui_exit(step: any): void {
	}

	/**穿戴装备 */
	public keyEquip_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public keyEquip_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.ROLE) as ViewRolePanel).guidePage(step);
	}

	/**关卡通关 */
	public guanqia_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public guanqia_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.GUANQIABOSSUI) as ViewGQBossUI).guidePage(step);
	}

	/**技能升级 */
	public keySkill_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public keySkill_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.MAIN_SKILL) as View_Skill_Panel).guideUpgradeSkill(step);
	}


	/**武将TAB页*/
	public generalTab_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.WU_JIANG) &&
			(GGlobal.layerMgr.getView(UIConst.WU_JIANG) as ViewWuJiangPanel).guideCheckTab(step.arg));
		return ret;
	}

	public generalTab_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.WU_JIANG) as ViewWuJiangPanel).guideTab(step);
	}

	/**武将升级 */
	public keyGeneralUpLevel_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public keyGeneralUpLevel_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.WU_JIANG) as ViewWuJiangPanel).guidePage(step);
	}

	/**领取晋升任务经验 */
	public jinSheng_draw_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.getView(UIConst.JINSHENG) as ViewRebirthPanel).guideFinishCheck(step.source.taskid);
		return ret;
	}

	public jinSheng_draw_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.JINSHENG) as ViewRebirthPanel).guide_jinSheng_draw(step);
	}

	/**激活晋升官职 */
	public jinSheng_jihuo_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public jinSheng_jihuo_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.JINSHENG) as ViewRebirthPanel).guide_jinSheng_jihuo(step);
	}

	/**选中升星grid*/
	public baowu_Grid_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.getView(UIConst.BAOWU) as View_BaoWu_Panel).check_baowu_select(step.arg);
		return ret;
	}

	public baowu_Grid_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.BAOWU) as View_BaoWu_Panel).guide_baowu_select(step);
	}

	/**升星按钮 */
	public baowu_upstar_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.getView(UIConst.BAOWU) as View_BaoWu_Panel).check_baowu_upstar();
		return ret;
	}

	public baowu_upstar_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.BAOWU) as View_BaoWu_Panel).guide_baowu_upstar(step);
	}


	/**选择对应宝物 */
	public baowu_select_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.getView(UIConst.BAOWU) as View_BaoWu_Panel).check_use_grid();
		return ret;
	}

	public baowu_select_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.BAOWU) as View_BaoWu_Panel).guide_use_grid(step);
	}

	/**宝物使用按钮 */
	public baowu_use_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || GGlobal.layerMgr.isOpenView(UIConst.BAOWU_EQUIP);
		return ret;
	}

	public baowu_use_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.BAOWU) as View_BaoWu_Panel).guide_baowu_useBt(step);
	}

	/**更换宝物 */
	public baowu_change_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public baowu_change_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.BAOWU_EQUIP) as View_BaowWu_Use).guide_equip_baowu(step);
	}

	/**boss标签切换 */
	public DRBOSS_tab_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) ||
			(GGlobal.layerMgr.isOpenView(UIConst.BOSS) && (GGlobal.layerMgr.getView(UIConst.BOSS) as ViewBoss).check_guideTab(step.arg));
		return ret;
	}

	public DRBOSS_tab_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.BOSS) as ViewBoss).guideTab(step.arg);
	}

	/**挑战个人boss */
	public DRBOSS_battle_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public DRBOSS_battle_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.BOSS) as ViewBoss).guide_DRBOSS_battle(step);
	}

	/**挑战个人boss */
	public QMBOSS_battle_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public QMBOSS_battle_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.BOSS) as ViewBoss).guide_QMBOSS_battle(step);
	}

	/**进入副本tab页 */
	public fuben_tab_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.BOSS) && (GGlobal.layerMgr.getView(UIConst.FUBEN) as View_FuBen_Panel).check_guideTab(step.arg));
		return ret;
	}

	public fuben_tab_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.FUBEN) as View_FuBen_Panel).guideTab(step.arg);
	}

	/**铜雀台挑战 */
	public peacock_battleBt_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || GGlobal.sceneType == SceneCtrl.PEACOCK;;
		return ret;
	}

	public peacock_battleBt_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.FUBEN) as View_FuBen_Panel).guide_peacock_battle(step);
	}

	/**铜雀台退出战斗 */
	public peacockExit_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) && GGlobal.sceneType != SceneCtrl.PEACOCK;
		return ret;
	}

	public peacockExit_enter(step: any): void {
		if (GGlobal.layerMgr.isOpenView(UIConst.COMMON_WIN1)) {
			ViewCommonWin1.step = step;
			(GGlobal.layerMgr.getView(UIConst.COMMON_WIN1) as ViewCommonWin1).guide_exit(step);
		}
	}

	/**进入熔炼tab页 */
	public rongLian_tab_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.RONGLIAN) && (GGlobal.layerMgr.getView(UIConst.RONGLIAN) as ViewRongLianPanel).check_guideTab(step.arg));
		return ret;
	}

	public rongLian_tab_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.RONGLIAN) as ViewRongLianPanel).guideTab(step.arg);
	}

	/**熔炼 */
	public ronglianBt_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public ronglianBt_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.RONGLIAN) as ViewRongLianPanel).guide_ronglian(step);
	}

	/**锻造tab */
	public daunzao_tab_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.DUANZAO_STRENG) && (GGlobal.layerMgr.getView(UIConst.DUANZAO_STRENG) as View_DuanZao_Panel).check_guideTab(step.arg));
		return ret;
	}

	public daunzao_tab_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.DUANZAO_STRENG) as View_DuanZao_Panel).guideTab(step.arg);
	}

	/**锻造tab */
	public duanzao_keyStreng_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public duanzao_keyStreng_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.DUANZAO_STRENG) as View_DuanZao_Panel).guide_duanzao_keyStreng(step);
	}

	/**随机加入国家 */
	public country_random_join_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public country_random_join_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.COUNTRY_SELECT) as ViewCouSelectPanel).guide_country_random_join(step);
	}

	/**南征北战战斗 */
	public NZBZ_battle_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public NZBZ_battle_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.NANZHENG_BEIZHAN) as View_NZBZ_Panel).guide_NZBZ_battle(step);
	}

	/**晋升tab页 */
	public role_tab_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || ((GGlobal.layerMgr.isOpenView(UIConst.JINSHENG) && GGlobal.layerMgr.getView(UIConst.JINSHENG) as ViewRebirthPanel).check_guideTab(step.arg));
		return ret;
	}

	public role_tab_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.JINSHENG) as ViewRebirthPanel).guideTab(step.arg);
	}

	/**将衔升级 */
	public jiangxian_up_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public jiangxian_up_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.JINSHENG) as ViewRebirthPanel).guide_jianxian(step);
	}

	/**转生Tab */
	public zhaunsheng_tab_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.ROLE) && (GGlobal.layerMgr.getView(UIConst.ROLE) as ViewRolePanel).check_guideTab(step.arg));
		return ret;
	}

	public zhaunsheng_tab_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.ROLE) as ViewRolePanel).guideTab(step);
	}

	/**转生 */
	public zhuanshengBt_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public zhuanshengBt_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.ROLE) as ViewRolePanel).guidePage(step);
	}

	/**武将TAB页*/
	public zhanjiaTab_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.ZHAN_JIA) && (GGlobal.layerMgr.getView(UIConst.ZHAN_JIA) as ViewZhanJiaPanel).guideCheckTab(step.arg));
		return ret;
	}

	public zhanjiaTab_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.ZHAN_JIA) as ViewZhanJiaPanel).guideTab();
	}

	/**战甲升阶 */
	public keyZhanJiaUpLevel_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public keyZhanJiaUpLevel_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.ZHAN_JIA) as ViewZhanJiaPanel).guide_keyZhanJiaUpLevel(step.arg);
	}

	/**玲珑阁 */
	public LLG_draw_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) && (GGlobal.layerMgr.isOpenView(UIConst.LING_LONG_SHOW) && !ViewLingLongShow.isGuide || ViewLingLongShow.isGuide);
		return ret;
	}

	public LLG_draw_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.LING_LONG) as ViewLingLongPanel).guide_draw(step);
	}

	/**玲珑阁 奖励界面*/
	public LLG_rewardShow_finishCheck(step: any): boolean {
		let ret: boolean = !GGlobal.layerMgr.isOpenView(UIConst.LING_LONG_SHOW);
		return ret;
	}

	public LLG_rewardShow_enter(step: any): void {
		if (GGlobal.layerMgr.isOpenView(UIConst.LING_LONG_SHOW)) {
			(GGlobal.layerMgr.getView(UIConst.LING_LONG_SHOW) as ViewLingLongShow).guide_sureBt(step);
		}
	}

	/**自动闯关 */
	public auto_guanqia_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public auto_guanqia_enter(step: any): void {
		ViewGuanQiaBossEntry.createInstance().guideAuto(step);
	}

	/**功能预览 */
	public functionView_draw_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public functionView_draw_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.FUNCTIONPREVIEW) as View_FunctionPreview_Panel).guideDraw();
	}

	/**材料副本 */
	public cailiao_battle_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public cailiao_battle_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.FUBEN_CAILIAO) as View_FuBen_Panel).guideCaiLiao(step);
	}

	/**宝物升阶 */
	public baowu_upLv_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public baowu_upLv_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.BAOWU) as View_BaoWu_Panel).guide_baowu_upLv(step);
	}

	/**三国战神 */
	public sgzs_battle_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public sgzs_battle_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.SANGUO_ZHANSHEN) as View_Arena_Panel).guide_sgzs(step);
	}

	/**藏宝阁 */
	public CBG_draw_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) && (GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW2) && !View_Reward_Show2.isGuide || View_Reward_Show2.isGuide);
		return ret;
	}

	public CBG_draw_enter(step: any): void {
		if (GGlobal.layerMgr.isOpenView(UIConst.CANGBAOGE)) {
			(GGlobal.layerMgr.getView(UIConst.CANGBAOGE) as ViewCangBaoGe).guide_draw(step);
		}
	}

	/**藏宝阁 奖励界面*/
	public CBG_rewardShow_finishCheck(step: any): boolean {
		let ret: boolean = !GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW2);
		return ret;
	}

	public CBG_rewardShow_enter(step: any): void {
		if (GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW2)) {
			(GGlobal.layerMgr.getView(UIConst.REWARD_SHOW2) as View_Reward_Show2).guide_sureBt(step);
		}
	}

	/**闯关有礼*/
	public chuangguanyouli_draw_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		ViewChuangGuanYL.isGuide = !GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public chuangguanyouli_draw_enter(step: any): void {
		ViewChuangGuanYL.step = step;
		(GGlobal.layerMgr.getView(UIConst.CHUANGGUANYOULI) as ViewChuangGuanYL).guideDraw(step);
	}

	/**关卡大地图*/
	public guanqiaMap_Draw_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	/**选中升星grid*/
	public shenJian_Grid_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.SHEN_JIAN) &&
			(GGlobal.layerMgr.getView(UIConst.SHEN_JIAN) as View_ShenJian_Panel).check_shenjian_select(step.arg));
		return ret;
	}

	public shenJian_Grid_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.SHEN_JIAN) as View_ShenJian_Panel).guide_shenjian_select(step);
	}

	/**升星按钮 */
	public shenJian_upstar_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.SHEN_JIAN) &&
			(GGlobal.layerMgr.getView(UIConst.SHEN_JIAN) as View_ShenJian_Panel).check_shenjian_upstar(step.arg));
		return ret;
	}

	public shenJian_upstar_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.SHEN_JIAN) as View_ShenJian_Panel).guide_shenjian_upstar(step);
	}

	public guanqiaMap_Draw_enter(step: any): void {
	}

	/**选中对应的武将格子 */
	public wujiang_Grid_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.WU_JIANG) &&
			(GGlobal.layerMgr.getView(UIConst.WU_JIANG) as ViewWuJiangPanel).check_wujiang_select());
		return ret;
	}

	public wujiang_Grid_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.WU_JIANG) as ViewWuJiangPanel).guide_wujiang_select(step);
	}

	/**武将激活 */
	public wujiang_upstar_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step) || (GGlobal.layerMgr.isOpenView(UIConst.WU_JIANG) &&
			(GGlobal.layerMgr.getView(UIConst.WU_JIANG) as ViewWuJiangPanel).check_wujiang_upstar());
		return ret;
	}

	public wujiang_upstar_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.WU_JIANG) as ViewWuJiangPanel).guide_wujiang_upstar(step);
	}

	/**切换武将*/
	public wujiang_changeBt_finishCheck(step: any): boolean {
		let ret: boolean = GuideStepManager.instance.finishCheck(step);
		return ret;
	}

	public wujiang_changeBt_enter(step: any): void {
		(GGlobal.layerMgr.getView(UIConst.WU_JIANG) as ViewWuJiangPanel).guide_wujiang_change(step);
	}

	public finishCheck(step: any): boolean {
		let ret: boolean = Model_player.taskSt == 1;
		return ret;
	}

	public resetToStageCenter(): void {
		GuideStepManager.instance.showGuide(fairygui.GRoot.inst, App.stage.stageWidth / 2, App.stage.stageHeight / 2);
	}

	public flagDict: any = {};
	//记录数据
	public saveIntFlag_finishCheck(step: any): boolean {
		var ret: boolean = true;
		var key: string = step.arg.key;
		var value: number = Number(step.arg.value);
		this.flagDict[key] = value;
		return ret;
	}

	public openui_finish(step: any): void {
	}

	public openui_auto(step: any): void {

	}
	//----------打开面板]

	//---------[打开面板
	public closeui_finishCheck(step: any): boolean {
		var ret: boolean = false;
		if (typeof step.arg === "number") {
			ret = !GGlobal.layerMgr.isOpenView(step.arg);
		}
		return ret;
	}

	public closeui_enter(step: any): void {
		if (typeof step.arg === "number") {
			(GGlobal.layerMgr.getView(step.arg)).guideClosePanel(step);
		}
	}

	public closeui_exit(step: any): void {

	}

	public taskFinsh_enter(step: any) {
		ViewMainUIBottomUI1.instance.updateNewerGuide();
	}

	public taskFinsh_finishCheck(step: any): boolean {
		var ret: boolean = Model_player.taskId != step.source.taskid;
		return ret;
	}
	//----------打开面板]


	public releaseArrow(): void {
		GGlobal.control.remove(Enum_MsgType.MSG_ENTERFRAME, this.run, this);
		this.curStep = null;
		this.guideList.length = 0;
		QuestGuideArrow.instance.release();
		QuestGuideArrow1.instance.release();
	}

	public checkArrowTarget(): void {
		var arrow: QuestGuideArrow = QuestGuideArrow.instance;
		ViewMainUIBottomUI1.instance.updateNewerGuide();
	}

	public hideArrow(): void {
		QuestGuideArrow.instance.hide();
		QuestGuideArrow1.instance.release();
	}

	public hideArrow1() {
		QuestGuideArrow1.instance.release();
	}

	public onEvent(event: any): void {
		if (this.curStep && this.curStep.onEvent) {
			this.curStep.onEvent(this.curStep, event);
		}
	}
}