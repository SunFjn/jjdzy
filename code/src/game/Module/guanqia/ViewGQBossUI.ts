/**关卡BOSS入口*/class ViewGQBossUI extends UIPanelBase {
	//>>>>
	public frame: fairygui.GComponent;
	public guanqiaBg: fairygui.GLoader;
	public n47: fairygui.GImage;
	public lbCant: fairygui.GRichTextField;
	public lbHelpCount: fairygui.GRichTextField;
	public lbHelp: fairygui.GRichTextField;
	public btnRank: fairygui.GButton;
	public btnSendHelp: Button0;
	public n23: fairygui.GImage;
	public n34: fairygui.GImage;
	public rank0: PanellistItem;
	public rank1: PanellistItem;
	public rank2: PanellistItem;
	public lbGuanQia: fairygui.GRichTextField;
	public lbTongBi: fairygui.GRichTextField;
	public lbExp: fairygui.GRichTextField;
	public n43: fairygui.GImage;
	public n44: fairygui.GImage;
	public n46: fairygui.GImage;
	public btnFight: fairygui.GButton;
	public n51: fairygui.GImage;
	public btnSweeping: Button2;
	public btnQRS: Button2;
	public progress: fairygui.GProgressBar;
	public guanQiaInfo: VGQInfo;
	public n60: fairygui.GImage;
	public grid: ViewGrid
	public n57: fairygui.GTextField;
	public rewardGrp: fairygui.GGroup;
	public n61: fairygui.GList;
	public t0: fairygui.Transition;

	public static URL: string = "ui://r92dp953hfx70";

	public static createInstance(): ViewGQBossUI {
		return <ViewGQBossUI><any>(fairygui.UIPackage.createObject("guanqia", "ViewGQBossUI"));
	}

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.setSkin("guanqia", "guanqia_atlas0", "ViewGQBossUI");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(PanellistItem.URL, PanellistItem);
		fairygui.UIObjectFactory.setPackageItemExtension(VGQInfo.URL, VGQInfo);
	}

	protected initView(): void {
		super.initView();
		let s = this;
		s.btnQRS.addClickListener(s.openQRZ, s);
		s.btnRank.addClickListener(s.openRank, s);
		s.btnFight.addClickListener(s.fightBossHandler, s);
		s.btnSweeping.addClickListener(s.sweepingHandler, s);
		s.btnSendHelp.addClickListener(s.helpHD, s);
		s.rank0.index = 0;
		s.rank1.index = 1;
		s.rank2.index = 2;
		s.grid.tipEnabled = true;
		s.n61.callbackThisObj = s;
		s.n61.itemRenderer = s.awardsRender;
		// s.preview.resetPosition = s.preview.resetPosition1;
	}

	private awardsRender(idx, obj) {
		let item: ViewGridRender = obj as ViewGridRender;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.grid.showEff(true);
	}

	private openQRZ() {
		GGlobal.layerMgr.open(UIConst.QIANRENZHAN);
	}

	private openRank() {
		GGlobal.layerMgr.open(UIConst.GUANQIARNK);
	}

	//扫荡
	private sweepingHandler() {
		GGlobal.layerMgr.open(UIConst.GUANQIASWEEPING);
	}

	private _limitLevel = -1;
	private helpHD() {
		if (this._limitLevel == -1) {
			this._limitLevel = ConfigHelp.getSystemNum(3924);
		}
		if (GGlobal.modelGuanQia.curGuanQiaLv < this._limitLevel) {
			ViewCommonWarn.text(BroadCastManager.reTxt("关卡求助{0}关开启", this._limitLevel));
			return;
		}
		if (GGlobal.modelGuanQia.help == 0) {
			ViewCommonWarn.text("求助次数不足");
			return;
		}
		GGlobal.modelGuanQia.helpRed = 0;
		this.checkNotice();
		GGlobal.modelGuanQiaHelp.CG_5901_HELP();
	}

	//挑战BOSS
	private fightBossHandler() {
		if (this.hasNotPass()) {
			GGlobal.modelGuanQia.CG_FIGHTBOSS_1113();
		}
	}
	private hasNotPass() {
		if (ModelGuanQia.hasPassed()) {
			const nextGQ = ModelGuanQia.curGQID + 1;
			const cfg = Config.dgq_205[nextGQ];
			if (cfg) {
				ViewCommonWarn.text("请先前往" + cfg.mingcheng);
			}
			return false;
		}
		return true;
	}

	private checkNotice() {
		// this.progress.visible = this.btnQRS.visible = Model_player.voMine.level >= Config.xtcs_004[4425].num;
		// this.btnSweeping.visible = Model_player.voMine.level >= Config.xtcs_004[4424].num;
		this.progress.visible = this.btnQRS.visible = Model_LunHui.realLv >= Config.xtcs_004[4425].num;
		this.btnSweeping.visible = Model_LunHui.realLv >= Config.xtcs_004[4424].num;
		this.btnQRS.checkNotice = GGlobal.reddot.checkCondition(UIConst.GUANQIABOSSUI, 1);
		this.btnSweeping.checkNotice = GGlobal.reddot.checkCondition(UIConst.GUANQIABOSSUI);
		let m = GGlobal.modelGuanQia;
		if (this._limitLevel == -1) {
			this._limitLevel = ConfigHelp.getSystemNum(3924);
		}
		this.btnSendHelp.checkNotice = (m.help > 0 || m.helpCount > 0) && m.helpRed == 1 && m.curGuanQiaLv >= this._limitLevel;
	}

	protected onShown(): void {
		let s = this;
		let c = GGlobal.control;
		s.reqRankData();
		s.updateGK();
		s.updateRnk();
		s.updateWave();
		s.checkNotice();
		GGlobal.reddot.listen(UIConst.GUANQIABOSSUI, s.checkNotice, s);
		c.listen(Enum_MsgType.MSG_WAVEUPDATE, s.updateWave, s);
		c.listen(Enum_MsgType.MSG_GQ_UPDATE, s.updateGK, s);
		c.listen(Enum_MsgType.MSG_BOSSINFO, s.updateRnk, s);
		c.listen(Model_player.MSG_HERO_LEVEL, s.checkNotice, s);
		IconUtil.setImg(this.guanqiaBg, Enum_Path.BACK_URL + "guanqia.jpg");
		GGlobal.modelGuanQia.listen(ModelGuanQia.msg_gqGetRed, this.updateMap, this);
	}

	protected onHide(): void {
		let s = this;
		let c = GGlobal.control;
		GGlobal.layerMgr.close(UIConst.GUANQIABOSSUI);
		GGlobal.reddot.remove(UIConst.GUANQIABOSSUI, s.checkNotice, s);
		c.remove(Enum_MsgType.MSG_WAVEUPDATE, s.updateWave, s);
		c.remove(Enum_MsgType.MSG_GQ_UPDATE, s.updateGK, s);
		c.remove(Enum_MsgType.MSG_BOSSINFO, s.updateRnk, s);
		c.remove(Model_player.MSG_HERO_LEVEL, s.checkNotice, s);
		IconUtil.setImg(s.guanqiaBg, null);
		GGlobal.modelGuanQia.remove(ModelGuanQia.msg_gqGetRed, s.updateMap, s);
		if (s.eff) {
			EffectMgr.instance.removeEff(s.eff);
			s.eff = null;
		}
		s.n61.numItems = 0;
		s.guanQiaInfo.clean();
	}

	protected _l = -999999;
	protected reqRankData() {
		let s = this;
		let now = egret.getTimer();
		if (now - s._l >= 30000) {
			s._l = 0;
			GGlobal.modelGuanQia.CS_BOSSINFO_1103();
		}
	}

	/**更新怪物波次**/
	protected updateWave() {
		let s = this;
		let m = GGlobal.modelGuanQia;
		let gkcfg = Config.BOSS_205[m.curGuanQiaLv];
		if (m.isMaxGuanQia()) {
			s.btnFight.visible = false;
			s.lbCant.text = BroadCastManager.reTxt("已达最大关卡", gkcfg.BS - m.curWave);
		} else if (m.curWave >= gkcfg.BS) {
			s.btnFight.visible = true;
			s.lbCant.text = "";
		} else {
			s.btnFight.visible = false;
			s.lbCant.text = BroadCastManager.reTxt("再击杀<font color='" + Color.TEXT_YELLOW + "'>{0}</font>波怪可挑战BOSS", gkcfg.BS - m.curWave);
		}
	}

	private awards = [];
	public updateGK() {
		let s = this;
		let m = GGlobal.modelGuanQia;
		let color = m.help > 0 ? Color.WHITESTR : Color.REDSTR;
		s.lbHelp.text = BroadCastManager.reTxt("求助次数：<font color='{0}'>{1}/{2}</font>", color, m.help, ConfigHelp.getSystemNum(3925));
		color = m.helpCount > 0 ? Color.WHITESTR : Color.REDSTR;
		s.lbHelpCount.text = BroadCastManager.reTxt("帮助次数：<font color='{0}'>{1}/{2}</font>", color, m.helpCount, ConfigHelp.getSystemNum(3926));
		s.lbGuanQia.text = BroadCastManager.reTxt("第{0}关", m.curGuanQiaLv);
		let lib = Config.kill_205;
		s.progress.max = 100;
		if (lib[m.killAwardsIndex + 1]) {
			s.progress.max = lib[m.killAwardsIndex + 1]["num"];
			s.progress.value = m.killCount;
		} else {
			s.progress.max = lib[m.killAwardsIndex]["num"];
			s.progress.value = m.killCount;
		}

		let add = Model_player.voMine.expAdd;
		if (add == 0) s.lbExp.text = ConfigHelp.numToStr(ModelGuanQia.getExpGP(m.curGuanQiaLv)) + "/小时";
		else s.lbExp.text = ConfigHelp.numToStr(ModelGuanQia.getExpGP(m.curGuanQiaLv)) + "/小时<font color='#3ba5ff'>(+" + add + "%)</font>";
		s.lbTongBi.text = ConfigHelp.numToStr(ModelGuanQia.getTBGP(m.curGuanQiaLv)) + "/小时";

		let gkcfg = Config.BOSS_205[m.curGuanQiaLv];
		this.awards = ConfigHelp.makeItemListArr(JSON.parse(gkcfg.reward));
		this.n61.numItems = this.awards.length;
		s.updateMap();
	}

	public updateRnk() {
		let m = GGlobal.modelGuanQia;
		let r = m.rank_3;
		let s = this;
		s.rank0.update(r[0]);
		s.rank1.update(r[1]);
		s.rank2.update(r[2]);
	}
	private eff: Part;
	public updateMap() {
		let curCfg = Config.dgq_205[ModelGuanQia.curGQID];
		if (curCfg) {
			this.guanQiaInfo.visible = true;
			this.rewardGrp.visible = true;
			this.guanQiaInfo.setData(curCfg);
			this.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(curCfg.jiangli))[0];
		} else {
			this.guanQiaInfo.visible = false;
			this.rewardGrp.visible = false;
		}
		if (ModelGuanQia.hasPassed()) {
			if (!this.eff) {
				this.eff = EffectMgr.addEff("eff/200007/ani", this.displayListContainer, 80, 273, 1000, -1, true,1,Main.skill_part_type);
			}
			if ((Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
				QuestGuideArrow.instance.specialToHide = true;
				QuestGuideArrow.instance.release();
			}
		} else {
			if (this.eff) {
				EffectMgr.instance.removeEff(this.eff);
				this.eff = null;
			}
		}
	}

	public guidePage(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.btnFight, self.btnFight.width / 2, self.btnFight.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btnFight, self.btnFight.width / 2, 0, -90, -106, -100);
	}
}

