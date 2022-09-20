/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class HomeUI extends Sprite {

	public n1: fairygui.GImage;
	public n2: fairygui.GImage;
	public n3: fairygui.GImage;
	public lbHomeType: fairygui.GRichTextField;
	public lbMaster: fairygui.GRichTextField;
	public head: ViewHead;
	public soundOn: fairygui.GLoader;
	public soundOff: fairygui.GLoader;
	public lbHomeLevel: fairygui.GRichTextField;
	public headGroup: fairygui.GGroup;
	public yuanbaoBg: fairygui.GImage;
	public tongbiBg: fairygui.GImage;
	public n22: fairygui.GImage;
	public n23: fairygui.GImage;
	public lbYB: fairygui.GRichTextField;
	public lbTongBi: fairygui.GRichTextField;
	public imgTongBi: fairygui.GLoader;
	public btnAddYB: fairygui.GButton;
	public moneyGroup: fairygui.GGroup;
	public btnHomeLevelup: Button2;
	public btnHomeTask: Button2;
	public btnHomeShop: fairygui.GButton;
	public btnHomeList: fairygui.GButton;
	public groupLeftBtn: fairygui.GGroup;
	public groupTop: fairygui.GGroup;
	public lbHomeExp: fairygui.GRichTextField;
	public btnMaid: VHomeBtnMaid;
	public btnExite: fairygui.GButton;
	public btnDesc: fairygui.GButton;
	public btnShow: fairygui.GButton;
	public c2: fairygui.Controller;
	public vMaidWel: VHomeBtnMaidWel

	public static URL: string = "ui://y0plc878ye030";

	private static _instance: HomeUI;
	public static createInstance(): HomeUI {
		if (!HomeUI._instance) {
			HomeUI._instance = <HomeUI><any>(fairygui.UIPackage.createObject("home", "HomeUI"));
		}
		return HomeUI._instance;
	}

	public constructor() {
		super();
	}
	moneyGroupX = 0;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
		this.moneyGroupX = this.moneyGroup.x;
	}

	//升级府邸
	levelUpHd = () => {
		this.openUI(UIConst.HOME_LEVELUP_UI, 300);
	}

	//府邸任务
	taskHD = () => {
		this.openUI(UIConst.HOME_TASK, 300);
	}

	//府邸商店
	shopHD = () => {
		this.openUI(UIConst.HOME_SHOP, 300);
	}

	//府邸列表
	HomeListHD = () => {
		this.openUI(UIConst.HOME_LIST_UI, 300);
	}

	//府邸列表
	leaveHomeHD = () => {
		if (Model_player.isMineID(GGlobal.homemodel.home_masterID)) {
			GGlobal.homemodel.CG_House_outHouse_11103();
		} else {
			GGlobal.homemodel.CG_House_gotoRoom_11119(Model_player.voMine.id);
			// GGlobal.homemodel.CG_House_gotoYard_11101(Model_player.voMine.id);
		}
	}

	maidOpen = () => {
		const model = GGlobal.homemodel;
		if (Model_player.isMineID(model.home_masterID)) {
			this.openUI(UIConst.HOME_MAID, 300);
		} else {
			this.showMaidWel()
		}
	}

	//家园数据更新。
	dataUpdate = () => {
		const self = this;
		const model = GGlobal.homemodel;
		self.head.setdata(model.home_masterHead, model.home_masterLevel);
		self.lbMaster.text = BroadCastManager.reTxt("府邸主人：{0}", model.home_masterName);
		self.lbHomeType.text = BroadCastManager.reTxt("档次：{0}", model.getHomeType);
		self.lbHomeLevel.text = BroadCastManager.reTxt("等级：{0}级", model.home_level);
		self.lbYB.text = ConfigHelp.numToStr(Model_player.voMine.yuanbao) + "";
		self.lbTongBi.text = ConfigHelp.numToStr(Model_player.voMine.homeMoney) + "";
		IconUtil.setImg(self.imgTongBi, Enum_Path.ICON70_URL + 22 + ".png");
		self.lbHomeExp.text = "" + ConfigHelp.numToStr(model.home_exp);
		self.changeEventFun();
		self.checkNotic();
	}

	checkNotic = () => {
		this.btnHomeLevelup.checkNotice = GGlobal.homemodel.checkHomeLevelUp_Condition();
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

	public static show() {
		let self = HomeUI.createInstance();
		self.showUI();
	}


	public static hide() {
		let self = HomeUI.createInstance();
		self.hideUI();
	}

	changeEventFun = () => {
		this.c2.selectedIndex = Model_player.isMineID(GGlobal.homemodel.home_masterID) ? 0 : 1;
		this.btnHomeList.y = this.c2.selectedIndex==0?549:305;
	}

	openWFSM(){
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL,UIConst.HOME);
	}


	_state = 0;
	showOrHide = () => {
		this._state = this._state == 1 ? 0 : 1;
		this.setUI(this._state);
	}

	setUI = (v) => {
		let self = this;
		self._state = v;
		self.btnShow.icon = v ? "ui://y0plc878se7l23" : "ui://y0plc878se7l22";
		self.btnMaid.visible = v;
		self.groupLeftBtn.visible = v;
		self.groupTop.visible = v;
		// ViewMainTownTop.instance.visible = v;
	}

	event = (flag) => {
		let self = this;
		let fun = EventUtil.register;
		fun(flag, self.btnDesc, EventUtil.TOUCH, self.openWFSM, self);
		fun(flag, self.btnHomeLevelup, EventUtil.TOUCH, self.levelUpHd, self);
		fun(flag, self.btnHomeTask, EventUtil.TOUCH, self.taskHD, self);
		fun(flag, self.btnHomeShop, EventUtil.TOUCH, self.shopHD, self);
		fun(flag, self.btnExite, EventUtil.TOUCH, self.leaveHomeHD, self);
		fun(flag, self.btnHomeList, EventUtil.TOUCH, self.HomeListHD, self);
		fun(flag, self.soundOff, EventUtil.TOUCH, self.onSoundHD, self);
		fun(flag, self.soundOn, EventUtil.TOUCH, self.offSoundHD, self);
		fun(flag, self.btnMaid, EventUtil.TOUCH, self.maidOpen, self);
		let r = GGlobal.reddot
		r.register(flag, UIConst.HOME_MAID, self.upBtnRed, self)
		r.register(flag, UIConst.HOME_TASK, self.upBtnRed, self)
		let m = GGlobal.model_HomeMaid
		m.register(flag, Model_HomeMaid.useMaid, self.upMaidBtn, self);
		fun(flag, self.btnShow, EventUtil.TOUCH, self.showOrHide, self);
		let c = GGlobal.control
		c.register(flag, HomeModel.HOME_UI_MAID_SHOW, self.showMaidWel, self)
		c.register(flag, HomeModel.HOME_UI_MAID_SHOW, self.upMaidBtn, self)
		c.register(flag, Enum_MsgType.ONRESIZE, self.resetPosition, self)
		c.register(flag, Enum_MsgType.HOME_DATA_UPDATE, self.dataUpdate, self);
		c.register(flag, HomeModel.HOME_SCENE_UPDATE, self.dataUpdate, self);
		c.register(flag, HomeModel.HOME_UI_DATA_UPDATE, self.dataUpdate, self);
	}

	public showUI() {
		let self = this;
		GGlobal.layerMgr.UI_floorUI.addChild(self);
		let control = GGlobal.control;
		self.setUI(1);
		self.event(1);
		self.dataUpdate();
		// control.listen(Enum_MsgType.ONRESIZE, self.resetPosition, self);
		// control.listen(Enum_MsgType.HOME_DATA_UPDATE, self.dataUpdate, self);
		// control.listen(HomeModel.HOME_SCENE_UPDATE, self.dataUpdate, self);
		// control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.dataUpdate, self);
		control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, self.checkNotic, self);
		//侍女
		// let m = GGlobal.model_HomeMaid
		// m.CG_OPENUI_11301();//正在使用的侍女 已放登陆获取
		self.upMaidBtn()
		self.upBtnRed()
		self.showMaidWel()
	}

	public hideUI() {
		let self = this;
		self.removeFromParent();
		let control = GGlobal.control;
		self.event(0);
		// control.remove(Enum_MsgType.ONRESIZE, self.resetPosition, self);
		// control.remove(Enum_MsgType.HOME_DATA_UPDATE, self.dataUpdate, self);
		// control.remove(HomeModel.HOME_SCENE_UPDATE, self.dataUpdate, self);
		// control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.dataUpdate, self);
		control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, self.checkNotic, self);
		IconUtil.setImg(self.imgTongBi, null);
	}

	public resetPosition(): void {
		let s = this;
		s.y = GGlobal.layerMgr.uiAlign;
		let backImg = s.getChild("n2").asImage;
		backImg.setXY(-GGlobal.layerMgr.offx, 0);
		backImg.setSize(App.stageWidth, 56);
		s.headGroup.setXY(-GGlobal.layerMgr.offx - 12, 1);
		s.groupLeftBtn.x = -GGlobal.layerMgr.offx - 12;
		s.moneyGroup.setXY(s.moneyGroupX + GGlobal.layerMgr.offx, 12);
	}

	// private _maidVo: Ishinv_020
	private upMaidBtn() {
		let s = this;
		let m = GGlobal.model_HomeMaid;
		let model = GGlobal.homemodel;
		let maidId = Model_player.isMineID(model.home_masterID) ? m.useId : model.home_maid
		let v: Ishinv_020 = maidId > 0 ? Config.shinv_020[maidId] : null;
		IconUtil.setImg(s.btnMaid.img, Enum_Path.HOMEMAID_URL + (v ? v.yuanhua : "0") + ".png");
		s.upBtnRed();
	}
	//侍女 问候语
	private showMaidWel() {
		let self = this;
		let model = GGlobal.homemodel;
		let m = GGlobal.model_HomeMaid;

		let maidId = Model_player.isMineID(model.home_masterID) ? m.useId : model.home_maid
		let maidCfg: Ishinv_020 = maidId > 0 ? Config.shinv_020[maidId] : null;
		self.vMaidWel.visible = true;
		self.vMaidWel.alpha = 0;
		if (maidCfg) {
			if (Model_player.isMineID(model.home_masterID)) {
				self.vMaidWel.text = maidCfg.hy
			} else {
				self.vMaidWel.text = maidCfg.bfhy
			}
			egret.Tween.removeTweens(self.vMaidWel)
			egret.Tween.get(self.vMaidWel).wait(500).to({ alpha: 1 }, 1000).wait(5000).to({ alpha: 0 }, 1000).call(function () { self.vMaidWel.visible = false; }, self);
		} else {
			egret.Tween.removeTweens(self.vMaidWel)
		}
	}


	private upBtnRed() {
		let s = this;
		let r = GGlobal.reddot
		let model = GGlobal.homemodel;
		if (Model_player.isMineID(model.home_masterID)) {
			s.btnMaid.checkNotice = r.checkCondition(UIConst.HOME_MAID);
			s.btnHomeTask.checkNotice = r.checkCondition(UIConst.HOME_TASK);
		}else{
			s.btnMaid.checkNotice = false;
			s.btnHomeTask.checkNotice = false;
		}

	}
}