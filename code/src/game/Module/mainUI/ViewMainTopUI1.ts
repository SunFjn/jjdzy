class ViewMainTopUI1 extends fairygui.GComponent {

	public ButtonVIP: Button2;
	public lbVip: fairygui.GTextField;
	public lbPower: fairygui.GTextField;
	public lbExp: fairygui.GTextField;
	public lbTongbi: fairygui.GTextField;
	public lbGuanQia: fairygui.GTextField;
	public head: ViewHead;

	public static URL: string = "ui://7gxkx46wj30eo";

	public lbName: fairygui.GRichTextField;
	public lbYB: fairygui.GRichTextField;
	public lbTongBi: fairygui.GRichTextField;
	public zsLvLb: fairygui.GRichTextField;
	public btnAddYB: fairygui.GButton;
	public btnAddBindYB: fairygui.GButton;
	public btnAddTB: fairygui.GButton;
	public moneyGroup: fairygui.GGroup;
	public headGroup: fairygui.GGroup;
	public powerEffBt: Button2;
	public soundOn: fairygui.GLoader;
	public soundOff: fairygui.GLoader;
	public qcBar: fairygui.GProgressBar;
	public qcIcon: fairygui.GLoader;
	public qiceGroup: fairygui.GGroup;

	private moneyGroupX: number = 0;
	public static createInstance(): ViewMainTopUI1 {
		return <ViewMainTopUI1><any>(fairygui.UIPackage.createObject("MainUI", "ViewMainTopUI1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.moneyGroupX = s.moneyGroup.x;
		s.lbYB.enabled = true;
		s.lbYB.addClickListener(s.recharge, s);
		s.lbTongBi.addClickListener(s.buyTongbiHandler, s);
		s.btnAddYB.addClickListener(s.recharge, s);
		s.btnAddTB.addClickListener(s.buyTongbiHandler, s);
		s.soundOff.addClickListener(s.onSoundHD, s);
		s.soundOn.addClickListener(s.offSoundHD, s);
		s.btnAddYB.visible = !GGlobal.isIOS;
		s.lbYB.enabled = !GGlobal.isIOS;
		s.lbTongBi.enabled = !GGlobal.isIOS;
		s.updateSound();
		GGlobal.control.listen(Enum_MsgType.SETTING_CHANGE_HEAD, this.updateSound, this)
		this.listen();
		this.resetPosition();
	}

	private onSoundHD() {
		this.soundOn.visible = true;
		this.soundOff.visible = false;
		SoundManager.getInstance().setBGM(true);
		SoundManager.getInstance().setEFF(true)
		GGlobal.modelSetting.CGOperateSound(0, 0);
	}

	private offSoundHD() {
		this.soundOn.visible = false;
		this.soundOff.visible = true;
		SoundManager.getInstance().setBGM(false);
		SoundManager.getInstance().setEFF(false)
		GGlobal.modelSetting.CGOperateSound(1, 1);
	}

	public updateSound(): void {
		let sound = SoundManager.getInstance();
		this.soundOn.visible = sound.BGM || sound.EFF;
		this.soundOff.visible = !this.soundOn.visible;
	}

	private openVIP(event: TouchEvent) {
		GGlobal.layerMgr.open(UIConst.VIP);
	}

	public static _instance: ViewMainTopUI1;
	public static get instance(): ViewMainTopUI1 {
		if (!ViewMainTopUI1._instance) ViewMainTopUI1._instance = ViewMainTopUI1.createInstance();
		return ViewMainTopUI1._instance;
	}

	private setVipNotice() {
		this.ButtonVIP.checkNotice = GGlobal.reddot.checkCondition(UIConst.VIP) || GGlobal.reddot.checkCondition(UIConst.VIPGIFT);
	}

	private initUI() {
		this.update();
		this.updateHead();
	}

	private vipEff: Part;
	private powerEff: Part;
	private update() {
		let s = this;
		let v = Model_player.voMine;
		if (v) {
			s.lbPower.text = v.str + "";
			s.updateHead();
		}
		if (!s.powerEff) {
			s.powerEff = EffectMgr.addEff("uieff/10008", s.powerEffBt.displayListContainer, s.powerEffBt.width / 2 + 20, s.powerEffBt.height / 2 - 10, 800, -1, true);
		}
	}

	private updateHead() {
		let s = this;
		let v = Model_player.voMine;
		if (v) {
			s.head.setdata(Model_Setting.headId, v.level, null, null, false, Model_Setting.frameId);
		}
	}

	public updateGuanQia() {
		let s = this;
		let vomine = Model_player.voMine;
		if (!vomine) return;
		let m: ModelGuanQia = GGlobal.modelGuanQia;
		let scenename = Config.map_200[Config.xiaoguai_205[Config.BOSS_205[m.curGuanQiaLv].lj].dt].n;
		s.lbGuanQia.text = m.curGuanQiaLv + "";
		s.lbGuanQia.text = BroadCastManager.reTxt("{0}", m.curGuanQiaLv);
		let expValue = ModelGuanQia.getExpGP(m.curGuanQiaLv);
		expValue = Math.ceil(Number(expValue) * (100 + vomine.expAdd) / 100);
		s.lbExp.text = ConfigHelp.numToStr(expValue) + "/时";
		s.lbTongbi.text = ConfigHelp.numToStr(ModelGuanQia.getTBGP(m.curGuanQiaLv)) + "/时";

		s.btnAddYB.visible = !GGlobal.isIOS;
		s.lbYB.enabled = !GGlobal.isIOS;
		s.lbTongBi.enabled = !GGlobal.isIOS;
	}

	public updateVIP() {
		let s = this;
		let vomine = Model_player.voMine;
		if (!vomine) return;
		this.lbVip.text = "P" + vomine.viplv + "";
		if (!s.vipEff) {
			s.vipEff = EffectMgr.addEff("uieff/10006", s.ButtonVIP.displayListContainer, s.ButtonVIP.width / 2, s.ButtonVIP.height / 2, 800, -1, true);
		}
	}
	// private checkWarNot() {
	// 	var icon = GGlobal.mainUICtr.getIcon(UIConst.CHAOZHIFL);
	// 	if(icon) {
	// 		var notice = GGlobal.modelWarToDead.checkNotice();
	// 		icon.checkNotice = notice;
	// 	}
	// }

	public listen() {
		let s = this;
		let r = GGlobal.reddot;
		let c = GGlobal.control;
		s.ButtonVIP.addClickListener(s.openVIP, s);
		if (Model_player.voMine) {
			s.initUI();
			s.update();
			s.updateVIP();
			s.updateGuanQia();
			s.setVipNotice();
			s.updateQCBar();
		}
		s.resetPosition();
		s.head.addClickListener(this.onSetting, this);
		let m = GGlobal.modelPlayer;
		m.listen(Model_player.MSG_UPDATE, s.updatePlayerdata, s);
		m.listen(Model_player.YUANBAO_UPDATE, s.updatePlayerdata, s);
		m.listen(Model_player.TONGBI_UPDATE, s.updatePlayerdata, s);
		m.listen(Model_player.ZHUANSHENG_UPDATE, s.updatePlayerdata, s);
		m.listen(Model_player.MSG_UPDATE, s.update, s);

		c.listen(Enum_MsgType.VIP_CHANGE, s.updateVIP, s);
		c.listen(Enum_MsgType.MSG_GQ_UPDATE, s.updateGuanQia, s);
		c.listen(Enum_MsgType.ONRESIZE, s.resetPosition, s);
		c.listen(Enum_MsgType.SETTING_CHANGE_HEAD, s.updateHead, s);
		c.listen(Enum_MsgType.SETTING_CHANGE_NAME, s.updatePlayerdata, s);
		c.listen(Enum_MsgType.ROLE_QICE_RAGE, s.updateQCBar, s);
		r.listen(ReddotEvent.CHECK_VIP, s.setVipNotice, s);
		c.listen(Enum_MsgType.QICE_SUIT_UPDATE, s.updateQCBar, s);
		c.listen(Enum_MsgType.QICE_SUIT_ACTIVE, s.updateQCBar, s);
		s.updatePlayerdata();
	}

	public remove() {
		let self = this;
		if (self.vipEff) {
			EffectMgr.instance.removeEff(self.vipEff);
			self.vipEff = null;
		}
		if (self.powerEff) {
			EffectMgr.instance.removeEff(self.powerEff);
			self.powerEff = null;
		}
	}

	public resetPosition(): void {
		let s = this;
		s.y = GGlobal.layerMgr.uiAlign;
		let backImg = s.getChild("n138").asImage;
		backImg.setXY(-GGlobal.layerMgr.offx, 0);
		backImg.setSize(App.stageWidth, 56);
		s.headGroup.setXY(-GGlobal.layerMgr.offx - 12, 1);
		s.moneyGroup.setXY(s.moneyGroupX + GGlobal.layerMgr.offx, 12);
	}


	private onSetting(): void {
		GGlobal.layerMgr.open(UIConst.SETTING)
	}

	private recharge(event: TouchEvent) {
		event.stopImmediatePropagation();
		if (GGlobal.isIOS) {
			ViewAlert.show("由于苹果政策影响，iOS暂未开放充值", Handler.create(this, null), ViewAlert.OK);
		} else {
			ViewChongZhi.tryToOpenCZ();
		}
	}

	private buyTongbiHandler(event: TouchEvent) {
		event.stopImmediatePropagation();
		View_CaiLiao_GetPanel.show(VoItem.create(Enum_Attr.TONGBI));
	}

	private updatePlayerdata() {
		var vomine = Model_player.voMine;
		if (!vomine) return;
		this.lbYB.text = ConfigHelp.numToStr(vomine.yuanbao) + "";
		this.lbTongBi.text = ConfigHelp.numToStr(vomine.tongbi) + "";

		this.lbName.text = vomine.name;
		if (vomine.zsID > 0) {
			this.zsLvLb.text = Config.zhuansheng_705[vomine.zsID].lv;
		} else {
			this.zsLvLb.text = ""
		}
	}

	private updateQCBar() {
		let self = this;
		let vomine = Model_player.voMine
		if (GGlobal.modelQice.suitLv > 0) {
			self.qiceGroup.visible = true;
			let max = ~~(Config.changshu_101[75].num / 100);
			self.qcBar.value = vomine.qcRage;
			self.qcBar.max = max;
			if (vomine.qcRage >= max) {
				self.qcIcon.url = CommonManager.getUrl("MainUI", "rageMax");
			} else {
				self.qcIcon.url = CommonManager.getUrl("MainUI", "rage");
			}
		} else {
			vomine.qcRage = 0;
			vomine.qcTime = 0;
			self.qiceGroup.visible = false;
		}
	}
}