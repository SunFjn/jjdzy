/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewMainTown extends UIModalPanel {

	public btnSyzlb: TownFlag;
	public arenaBt: MainMenuBtn;
	public fubenBt: MainMenuBtn;
	public bg0: fairygui.GLoader;
	public bg1: fairygui.GLoader;
	public btnBoss: MainMenuBtn;
	public btnQM: MainMenuBtn;
	public btnGang: MainMenuBtn;
	public btnHD: MainMenuBtn;
	public noticeBtArr: TownLabel[] = [];
	public static URL: string = "ui://p8pwr887jie06";
	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(TownLabel.URL, TownLabel);
		this.loadRes("MainTown", "MainTown_atlas0");
		this.isShowOpenAnimation = false;
		this.isShowMask = false;
	}
	public container: EmptyComp;
	public grpYWTip: fairygui.GGroup;
	protected childrenCreated(): void {
		GGlobal.createPack("MainTown");
		this.view = fairygui.UIPackage.createObject("MainTown", "ViewMainTown").asCom;
		this.contentPane = this.view;
		this.bg0 = <fairygui.GLoader><any>(this.view.getChild("bg0"));
		this.bg1 = <fairygui.GLoader><any>(this.view.getChild("bg1"));
		this.arenaBt = <MainMenuBtn><any>(this.view.getChild("arenaBt"));
		this.fubenBt = <MainMenuBtn><any>(this.view.getChild("fbBt"));
		this.btnBoss = <MainMenuBtn><any>(this.view.getChild("btnBoss"));
		this.btnQM = <MainMenuBtn><any>(this.view.getChild("btnQM"));
		this.btnGang = <MainMenuBtn><any>(this.view.getChild("btnGang"));
		this.btnHD = <MainMenuBtn><any>(this.view.getChild("btnHD"));
		this.container = <any>(this.view.getChild("container"));
		this.grpYWTip = <any>(this.view.getChild("grpYWTip"));
		this.btnSyzlb = <TownFlag>(this.view.getChild("btnSyzlb"));
		let arr = [UIConst.ACTIVITYHALL, UIConst.CROSS_TEAM, UIConst.ARENA, UIConst.BOSS, UIConst.COUNTRY, UIConst.FUBEN];
		for (let i = 0; i < 6; i++) {
			let noticeBt = this.view.getChild("noticeBt" + i) as TownLabel;
			noticeBt.data = arr[i];
			this.noticeBtArr.push(noticeBt);
			noticeBt.addClickListener(this.noticeHandle, this);
		}
		this.btnSyzlb.addClickListener(this.onSyzlv, this);

		this.arenaBt.panelId = UIConst.ARENA;
		this.fubenBt.panelId = UIConst.FUBEN;
		this.btnBoss.panelId = UIConst.BOSS;
		this.btnQM.panelId = UIConst.CROSS_TEAM;
		this.btnGang.panelId = UIConst.COUNTRY;
		this.btnHD.panelId = UIConst.ACTIVITYHALL;
		this.isShowMask = false;
		super.childrenCreated();
	}

	private noticeHandle(event: egret.TouchEvent) {
		let panelId = event.target.data;
		GGlobal.layerMgr.open(panelId);
	}

	private onSyzlv() {
		GGlobal.layerMgr.open(UIConst.ZSSF);
	}

	private checkSyzlv() {
		let r = GGlobal.reddot;
		let red = r.checkCondition(UIConst.SYZLB)
			|| r.checkCondition(UIConst.ZSSF, 0) || r.checkCondition(UIConst.ZSSF, 1)
			|| r.checkCondition(UIConst.LHFB) || r.checkCondition(UIConst.DENG_FENG_SEA) || r.checkCondition(UIConst.DENG_FENG_FINAL);
		this.btnSyzlb.checkNotice = red;
	}



	private checkArenaNotice() {
		let r = GGlobal.reddot;
		let isCheckDDFH = ModuleManager.isOpen(UIConst.DANDAO_FUHUI) && r.checkCondition(UIConst.DANDAO_FUHUI);
		let ret = r.checkCondition(UIConst.SANGUO_ZHANSHEN) || isCheckDDFH || r.checkCondition(UIConst.SANGUO_WUSHUANG) || r.checkCondition(UIConst.CROSS_KING, 0) || r.checkCondition(UIConst.CROSS_WARS, 0);
		this.noticeBtArr[2].checkNotice(ret);
	}

	private checkGangNotice(): void {
		let r = GGlobal.reddot;
		let ret = r.checkCondition(UIConst.NANZHENG_BEIZHAN) || r.checkCondition(UIConst.COUNTRY_DONATE)
			|| r.checkCondition(UIConst.COUNTRY_KINGSHIP) || r.checkCondition(UIConst.COUNTRY_BOSS) || r.checkCondition(UIConst.COUNTRY_SKILL);
		this.noticeBtArr[4].checkNotice(ret);
	}

	private checkFuBenNotcie(): void {
		let ret = false;
		let reddot = GGlobal.reddot;
		ret = reddot.checkCondition(UIConst.FUBEN_YJDQ) || reddot.checkCondition(UIConst.FUBEN_CAILIAO)
			|| reddot.checkCondition(UIConst.PEACOCK) || reddot.checkCondition(UIConst.RUNMAN);
		this.noticeBtArr[5].checkNotice(ret);
	}

	private checkActivityHall() {
		let r = GGlobal.reddot;
		let source =
			[
				[UIConst.LONGZHONGDUI, 0],
				[UIConst.FHLY, 1],
				[UIConst.WENDINGTX, 0],
				[UIConst.LBBOSS, 0],
				[UIConst.SHAOZHU_ESCORT, 0],
				[UIConst.SHAOZHU_ESCORT, 1],
				[UIConst.SHAOZHU_ESCORT, 2],
				[UIConst.QXZL, 0],
				[UIConst.XU_TIAN, 0],
			];
		let ret;
		for (let i = 0; i < source.length; i++) {
			let dta = source[i];
			ret = r.checkCondition(dta[0], dta[1]);
			if (ret) break;
		}
		this.noticeBtArr[0].checkNotice(ret);
	}

	private checkBoss() {
		let r = GGlobal.reddot;
		this.noticeBtArr[3].checkNotice(r.checkCondition(
			UIConst.DRBOSS)
			|| r.checkCondition(UIConst.QMBOSS)
			|| r.checkCondition(UIConst.YSBOSS)
			|| r.checkCondition(UIConst.BOSS_BATTLEFIELD_CROSS)
			|| r.checkCondition(UIConst.BOSS_BATTLEFIELD_CROSS)
			|| r.checkCondition(UIConst.SHOP));
	}

	private checkCross() {
		let r = GGlobal.reddot;
		let date: Date = new Date(Model_GlobalMsg.getServerTime());
		let key = UIConst.CROSS_SHILIAN + "#" + date.getDay() + date.getMonth() + date.getFullYear();
		GGlobal.reddot.setCondition(UIConst.CROSS_SHILIAN, 0, !LocalStorageUtil.getItem(key));
		let ret = r.checkCondition(UIConst.SJMJ1, 0) || r.checkCondition(UIConst.CROSS_MINERAL, 0) ||
			r.checkCondition(UIConst.CROSS_MINERAL, 1) || r.checkCondition(UIConst.CROSS_MINERAL, 2) ||
			r.checkCondition(UIConst.CROSS_SHILIAN, 0);
		this.noticeBtArr[1].checkNotice(ret);
	}
	private zjywHasIn: boolean = false;
	private showZJYW(value: boolean = true) {
		if (value) {
			if (!this.zjywHasIn) {
				this.zjywHasIn = true;
				const modId = 601;
				this.container.setUIRole(modId);
				this.container.getUIRole().setScaleXY(0.8, 0.8)
				this.container.addClickListener(this.onZJYW, this);
				Utils.DisplayUtil.addPop(this.container.displayObject);
			}
			this.grpYWTip.visible = ModelZJYW.remainCnt != null ? ModelZJYW.remainCnt > 0 : true;
			Utils.DisplayUtil.addPop(this.grpYWTip.displayObject);
			this.grpYWTip.displayObject.touchEnabled = true;
			this.grpYWTip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZJYW, this);
		} else {
			if (this.zjywHasIn) {
				this.zjywHasIn = false;
				this.container.setUIRole(null);
				this.container.removeClickListener(this.onZJYW, this);
			}
			this.grpYWTip.visible = false;
			this.grpYWTip.displayObject.touchEnabled = false;
			this.grpYWTip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onZJYW, this);
		}
	}
	private onZJYW() {
		if (ModuleManager.isOpen(UIConst.ZJYW, true)) {
			GGlobal.layerMgr.open(UIConst.CHILDZJYW);
		}
	}

	protected onShown(): void {
		let s = this;
		let r = GGlobal.reddot;
		s.checkFuBenNotcie();
		s.checkBoss();
		s.checkGangNotice();
		s.checkCross();
		s.checkArenaNotice();
		s.checkActivityHall();
		s.checkSyzlv();
		s.showZJYW(ModelZJYW.actState == 1);//诸将演武
		GGlobal.mainUICtr.setState(1);
		r.listen(ReddotEvent.CHECK_YJDQ, s.checkFuBenNotcie, s);
		r.listen(ReddotEvent.CHECK_FUBEN_CAILIAO, s.checkFuBenNotcie, s);
		r.listen(ReddotEvent.CHECK_PEACOCK, s.checkFuBenNotcie, s);
		r.listen(ReddotEvent.CHECK_RUNMAN, s.checkFuBenNotcie, s);
		r.listen(UIConst.MHBOSS, s.checkActivityHall, s);
		r.listen(UIConst.LBBOSS, s.checkActivityHall, s);
		r.listen(UIConst.DRBOSS, s.checkBoss, s);
		r.listen(UIConst.QMBOSS, s.checkBoss, s);
		r.listen(UIConst.YSBOSS, s.checkBoss, s);
		r.listen(UIConst.BOSS_BATTLEFIELD_CROSS, s.checkBoss, s);
		r.listen(UIConst.BOSS_BATTLEFIELD_CROSS, s.checkBoss, s);
		r.listen(UIConst.BOSS, s.checkBoss, s);
		r.listen(ReddotEvent.CHECK_NZBZ, s.checkGangNotice, s);
		r.listen(ReddotEvent.CHECK_COUNTRY, s.checkGangNotice, s);
		r.listen(ReddotEvent.CHECK_COU_KSHIP, s.checkGangNotice, s);
		r.listen(UIConst.COUNTRY_SKILL, s.checkGangNotice, s);
		r.listen(UIConst.ACTIVITYHALL, s.checkActivityHall, s);
		r.listen(UIConst.LONGZHONGDUI, s.checkActivityHall, s);
		r.listen(UIConst.SHAOZHU_ESCORT, s.checkActivityHall, s);
		r.listen(UIConst.QXZL, s.checkActivityHall, s);
		r.listen(UIConst.XU_TIAN, s.checkActivityHall, s);
		r.listen(ReddotEvent.CHECK_CROSS_KING, s.checkArenaNotice, s);
		r.listen(ReddotEvent.CHECK_CROSS_WARS, s.checkArenaNotice, s);
		r.listen(UIConst.DANDAO_FUHUI, s.checkArenaNotice, s);
		r.listen(UIConst.SANGUO_WUSHUANG, s.checkArenaNotice, s);
		r.listen(UIConst.SANGUO_ZHANSHEN, s.checkArenaNotice, s);
		r.listen(UIConst.SYZLB, s.checkSyzlv, s);
		r.listen(UIConst.ZSSF, s.checkSyzlv, s);
		r.listen(UIConst.LHFB, s.checkSyzlv, s);
		r.listen(UIConst.DENG_FENG_SEA, s.checkSyzlv, s);
		r.listen(UIConst.DENG_FENG_FINAL, s.checkSyzlv, s);
		r.listen(ReddotEvent.CHECK_CROSS_SJMJ, s.checkCross, s);
		GGlobal.modelZJYW.listen(ModelZJYW.msg_datas, this.updateZJYWTip, this);
		GGlobal.modelZJYW.listen(ModelZJYW.msg_act_state, this.showZJYW, this);

		IconUtil.setImg(this.bg0, "resource/image/back/0.jpg");
		IconUtil.setImg(this.bg1, "resource/image/back/1.jpg");
	}
	private updateZJYWTip() {
		this.grpYWTip.visible = GGlobal.reddot.checkCondition(UIConst.CHILDZJYW, 0) && this.zjywHasIn;
	}
	protected onHide(): void {
		let s = this;
		s.visible = true;
		let r = GGlobal.reddot;
		GGlobal.layerMgr.close(UIConst.MAINTOWN);
		GGlobal.mainUICtr.setState(0);
		r.remove(ReddotEvent.CHECK_YJDQ, s.checkFuBenNotcie, s);
		r.remove(ReddotEvent.CHECK_FUBEN_CAILIAO, s.checkFuBenNotcie, s);
		r.remove(ReddotEvent.CHECK_PEACOCK, s.checkFuBenNotcie, s);
		r.remove(UIConst.MHBOSS, s.checkActivityHall, s);
		r.remove(UIConst.LBBOSS, s.checkActivityHall, s);
		r.remove(UIConst.DRBOSS, s.checkBoss, s);
		r.remove(UIConst.QMBOSS, s.checkBoss, s);
		r.remove(UIConst.YSBOSS, s.checkBoss, s);
		r.remove(UIConst.BOSS_BATTLEFIELD_CROSS, s.checkBoss, s);
		r.remove(UIConst.BOSS_BATTLEFIELD_CROSS, s.checkBoss, s);
		r.remove(UIConst.BOSS, s.checkBoss, s);
		r.remove(ReddotEvent.CHECK_NZBZ, s.checkGangNotice, s);
		r.remove(ReddotEvent.CHECK_COUNTRY, s.checkGangNotice, s);
		r.remove(ReddotEvent.CHECK_COU_KSHIP, s.checkGangNotice, s);
		r.remove(UIConst.ACTIVITYHALL, s.checkActivityHall, s);
		r.remove(UIConst.LONGZHONGDUI, s.checkActivityHall, s);
		r.remove(UIConst.SHAOZHU_ESCORT, s.checkActivityHall, s);
		r.remove(UIConst.QXZL, s.checkActivityHall, s);
		r.remove(ReddotEvent.CHECK_CROSS_KING, s.checkArenaNotice, s);
		r.remove(ReddotEvent.CHECK_CROSS_WARS, s.checkArenaNotice, s);
		r.remove(UIConst.DANDAO_FUHUI, s.checkArenaNotice, s);
		r.remove(UIConst.SANGUO_WUSHUANG, s.checkArenaNotice, s);
		r.remove(ReddotEvent.CHECK_CROSS_SJMJ, s.checkCross, s);
		GGlobal.modelZJYW.remove(ModelZJYW.msg_datas, this.updateZJYWTip, this);
		GGlobal.modelZJYW.remove(ModelZJYW.msg_act_state, this.showZJYW, this);
		GGlobal.layerMgr.closeAllPanel();
		IconUtil.setImg(this.bg0, null);
		IconUtil.setImg(this.bg1, null);
	}
}