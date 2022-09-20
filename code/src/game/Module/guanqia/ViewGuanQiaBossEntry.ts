/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewGuanQiaBossEntry extends fairygui.GComponent {

	public btn: Button2;
	public autoBt: fairygui.GComponent;
	public imgAuto: fairygui.GLoader;
	public img: fairygui.GImage;
	public tip: guideTip;
	public prog: GuanQiaBar;
	public forwardBtn: fairygui.GButton;
	public forwardLB: fairygui.GTextField;
	public static URL: string = "ui://7gxkx46whf054w";
	private static _instance;
	public static createInstance(): ViewGuanQiaBossEntry {
		if (!ViewGuanQiaBossEntry._instance) ViewGuanQiaBossEntry._instance = <ViewGuanQiaBossEntry><any>(fairygui.UIPackage.createObject("MainUI", "ViewGuanQiaBossEntry"));
		return ViewGuanQiaBossEntry._instance;
	}

	public constructor() {
		super();
	}
	public grpExtral: fairygui.GComponent;
	public gridExtral: ViewGrid;
	public txtExtral: fairygui.GTextField;
	public img2: fairygui.GImage;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.btn = <Button2><any>(s.getChild("btn"));
		s.img = <fairygui.GImage><any>(s.getChild("img"));
		s.autoBt = <fairygui.GComponent><any>(s.getChild("autoBt"));
		s.imgAuto = <fairygui.GLoader><any>(s.getChild("imgAuto"));
		s.prog = <GuanQiaBar><any>(s.getChild("prog"));
		this.tip = <guideTip><any>(this.getChild("tip"));
		this.forwardBtn = <any>(this.getChild("forwardBtn"));
		this.forwardLB = <any>(this.forwardBtn.getChild("forwardLB"));
		this.grpExtral = <any>(this.getChild("grpExtral"));
		this.gridExtral = <any>(this.grpExtral.getChild("gridExtral"));
		this.txtExtral = <any>(this.grpExtral.getChild("n16"));
		this.img2 = <any>(this.grpExtral.getChild("img2"));
		s.tip.visible = false;
		s.resetPosition();

		s.btn.addClickListener(s.onTouch, s);
		s.tip.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onAutoT, s);
		s.imgAuto.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onAutoT, s);
		s.forwardBtn.visible = false;
		s.forwardBtn.addClickListener(this.onForward, this);
		s.grpExtral.addClickListener(this.onOpenGQMap, this);
		this.img.visible = false;
	}
	private onOpenGQMap() {
		GGlobal.layerMgr.open(UIConst.GUANQIAMAP);
	}

	//有免费扫荡或者有千人斩并且关卡大于30关
	private checkReddot() {
		this.img.visible =
			(GGlobal.reddot.checkCondition(UIConst.GUANQIABOSSUI) && GGlobal.modelGuanQia.curGuanQiaLv >= 30 &&
				Model_LunHui.realLv >= Config.xtcs_004[4424].num)//扫荡 0
			|| GGlobal.modelGuanQia.guanQiaNot() //关卡大地图 2
			|| (GGlobal.reddot.checkCondition(UIConst.GUANQIABOSSUI, 1) && Model_LunHui.realLv >= Config.xtcs_004[4425].num)//千人斩 1
			|| GGlobal.reddot.checkCondition(UIConst.GUANQIABOSSUI, 4);
	}

	public setVisible(value) {
		this.visible = value;
		if (value) {
			this.onShown();
		} else {
			this.onHide();
		}
	}

	private _entryEff: Part;
	public showEntryEffect() {
		if (!this._entryEff) {
			this._entryEff = EffectMgr.addEff("uieff/10029", this.displayListContainer, 65, 138, 1000, -1, true);
		}
	}

	public onShown() {
		let s = this;
		let c = GGlobal.control;
		s.update();
		s.checkReddot();
		s.updateAuto();
		s.checkAutoState();
		s.showEntryEffect();
		GGlobal.reddot.listen(UIConst.GUANQIABOSSUI, s.checkReddot, s);
		c.listen(Enum_MsgType.MSG_WAVEUPDATE, s.onWaveUD, s);
		c.listen(Enum_MsgType.MSG_GQ_UPDATE, s.update, s);
		c.listen(Enum_MsgType.MSG_AUTO_C, s.updateAuto, s);
		c.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.checkAutoState, s);
		c.listen(Enum_MsgType.ONRESIZE, s.resetPosition, s);
		GGlobal.modelGuanQia.listen(ModelGuanQia.msg_gqGetRed, this.switchForwardbtn, this);
		GGlobal.modelGuanQia.listen(ModelGuanQia.msg_gqGetRed, this.showRawTip, this);
		GGlobal.modelGuanQia.listen(ModelGuanQia.msg_gqGetRed, this.checkReddot, this);
	}

	public onHide() {
		let s = this;
		let c = GGlobal.control;
		GGlobal.reddot.remove(UIConst.GUANQIABOSSUI, s.checkReddot, s);
		c.remove(Enum_MsgType.MSG_WAVEUPDATE, s.onWaveUD, s);
		c.remove(Enum_MsgType.MSG_GQ_UPDATE, s.update, s);
		c.remove(Enum_MsgType.MSG_AUTO_C, s.updateAuto, s);
		c.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.checkAutoState, s);
		c.remove(Enum_MsgType.ONRESIZE, s.resetPosition, s);
		GGlobal.modelGuanQia.remove(ModelGuanQia.msg_gqGetRed, this.switchForwardbtn, this);
		GGlobal.modelGuanQia.remove(ModelGuanQia.msg_gqGetRed, this.showRawTip, this);
		GGlobal.modelGuanQia.remove(ModelGuanQia.msg_gqGetRed, this.checkReddot, this);
		if (s._eff) {
			EffectMgr.instance.removeEff(s._eff);
			s._eff = null;
		}
	}

	//背包不可熔炼且容量不足时停止挂机
	private checkAutoState() {
		if (!GGlobal.modelGuanQia.auto) return;
		var m = GGlobal.modelGuanQia;
		var curNum = Model_Bag.getResNum();
		var equipList = Model_RongLian.onekeyRongLianArr();
		if ((equipList.length + curNum) < 20) {
			ViewCommonWarn.text("装备背包空间不足，请手动分解");
			m.setAuto(false);
		} else {
			if (curNum < 20) {
				if (equipList.length) {
					Model_RongLian.onekeyRongLian();
				}
			}
		}
	}

	protected _eff: Part;
	protected update() {
		var m = GGlobal.modelGuanQia;
		var maxWave = Config.BOSS_205[m.curGuanQiaLv].BS;
		this.prog.setVo(m.curWave, maxWave);
		this.updateAuto();
		this.switchForwardbtn();
		this.showRawTip();
	}
	private showRawTip() {
		var m = GGlobal.modelGuanQia;
		if (m.curGuanQiaLv <= Config.xtcs_004[5401].num) {
			const cfg = Config.dgq_205[ModelGuanQia.curGQID];
			if (cfg) {
				this.grpExtral.visible = true;
				let canGetCfg = null;
				for (let key in Config.dgq_205) {
					if (GGlobal.modelGuanQia.curGQNotice(Config.dgq_205[key])) {
						canGetCfg = Config.dgq_205[key];
						break;
					}
				}
				if (canGetCfg) {
					var reward = ConfigHelp.makeItemListArr(JSON.parse(canGetCfg.jiangli))[0];
				} else {
					if (ModelGuanQia.hasPassed()) {
						const nextCfg = Config.dgq_205[cfg.ID + 1];
						if (nextCfg) {
							reward = ConfigHelp.makeItemListArr(JSON.parse(nextCfg.jiangli))[0];
						} else {
							reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.jiangli))[0];
						}
					} else {
						reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.jiangli))[0];
					}
				}
				this.gridExtral.vo = reward;
				const not = GGlobal.modelGuanQia.guanQiaNot();
				if (not) {
					this.txtExtral.text = "  可领取  ";
				} else {
					if (ModelGuanQia.hasPassed()) {
						const nextCfg = Config.dgq_205[cfg.ID + 1];
						if (nextCfg) {
							var infoArr = JSON.parse(nextCfg.guanqia);
						} else {
							infoArr = JSON.parse(cfg.guanqia);
						}
					} else {
						infoArr = JSON.parse(cfg.guanqia);
					}
					const low = infoArr[0][0],
						max = infoArr[0][1];
					if (m.curGuanQiaLv <= max) {
						this.txtExtral.text = `${max - m.curGuanQiaLv + 1}关后可领取`;
					}
				}
				this.img2.visible = GGlobal.modelGuanQia.guanQiaNot();
			} else {
				this.grpExtral.visible = false;
			}
		} else {
			this.grpExtral.visible = false;
		}
	}

	protected onTouch(e: egret.TouchEvent) {
		if (ModelGuanQia.hasPassed()) {
			ViewGQDetail.trytoOpen();
		} else {
			GGlobal.layerMgr.open(UIConst.GUANQIABOSSUI);
		}
	}
	private onForward() {
		ViewGQDetail.trytoOpen();
	}
	private eff: Part;
	private switchForwardbtn() {
		if (ModelGuanQia.hasPassed()) {
			this.forwardBtn.visible = true;
			this.imgAuto.visible = false;
			const nextCfg = Config.dgq_205[ModelGuanQia.curGQID + 1];
			if (nextCfg) {
				this.forwardLB.text = "前往" + nextCfg.mingcheng;
			}
			if (!this.eff && !(Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
				this.eff = EffectMgr.addEff("eff/200007/ani", this.displayListContainer, 68, 213, 1000, -1, true,1,Main.skill_part_type);
			}
		} else {
			this.forwardBtn.visible = false;
			this.imgAuto.visible = true;
			if (this.eff) {
				EffectMgr.instance.removeEff(this.eff);
				this.eff = null;
			}
		}
	}
	protected onAutoT(e: egret.TouchEvent) {
		e.stopPropagation();
		var m = GGlobal.modelGuanQia;
		if (ModelGuanQia.hasPassed()) {
			ViewGQDetail.trytoOpen();
			return;
		}
		if (m.curGuanQiaLv < ModelGuanQia.autoWave) {
			ViewCommonWarn.text("自动战斗通关" + ModelGuanQia.autoWave + "关后开启");
			return;
		}
		if (m.isMaxGuanQia()) {
			ViewCommonWarn.text("已达最大通关数");
			return;
		}

		if (m.auto) {
			m.setAuto(false);
			return;
		}
		var s = !GGlobal.modelGuanQia.auto;
		if (s) {
			var d = GGlobal.modelGuanQia.challBossWithCond();
			if (!d) return;
		}

		ViewAlert.show("开启自动任务获得以下功能：\n1、自动挑战首领\n2、自动熔炼装备", Handler.create(this, function func() {
			GGlobal.modelGuanQia.setAuto(!GGlobal.modelGuanQia.auto);
			this.checkAutoBoss();
		}, null, true), ViewAlert.OKANDCANCEL, "确定", "取消");
	}
	protected checkAutoBoss() {
		var m = GGlobal.modelGuanQia;
		var maxWave = Config.BOSS_205[m.curGuanQiaLv].BS;
		if (m.curWave >= maxWave && m.auto && !ModelGuanQia.hasPassed()) {
			var rest = GGlobal.modelGuanQia.challBossWithCond();
			if (!rest) {
				m.setAuto(false);
			} else {
				GGlobal.modelGuanQia.CG_FIGHTBOSS_1113();
			}
		}
	}

	protected updateAuto() {
		let isAuto = GGlobal.modelGuanQia.auto;
		if (isAuto) {
			this.imgAuto.icon = CommonManager.getUrl("MainUI", "Bt_ZDTZ_down1");
		} else {
			this.imgAuto.icon = CommonManager.getUrl("MainUI", "Bt_ZDTZ_up1");
		}
	}

	private canShowGuide() {
		let curGQ = GGlobal.modelGuanQia.curGuanQiaLv;
		let ret = curGQ >= 12 && curGQ <= 30 && Model_player.taskId >= 43;
		return ret;
	}

	protected onWaveUD() {
		this.update();
		this.checkAutoBoss();
	}

	public resetPosition(): void {
		this.setXY(-GGlobal.layerMgr.offx, fairygui.GRoot.inst.height - 412);
	}


	public guideAuto(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.autoBt, self.autoBt.width / 2, self.autoBt.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.autoBt, self.autoBt.width, self.autoBt.height / 2, 0, 50, -35);
		GGlobal.control.listen(Enum_MsgType.MSG_AUTO_C, self.guideListen, self);
	}

	private guideListen() {
		if (GGlobal.modelGuanQia.auto) {
			GGlobal.control.remove(Enum_MsgType.MSG_AUTO_C, this.guideListen, this);
			GGlobal.modelPlayer.CG_SCENETASK_SUBMISSION(1);
		}
	}
}