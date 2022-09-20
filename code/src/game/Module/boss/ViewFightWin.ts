class ViewFightWin extends UIModalPanel {
	//>>>>start
	public bg1: ViewBg1;
	public list: fairygui.GList;
	public lbTip: fairygui.GRichTextField;
	public txtXieZhu: fairygui.GRichTextField;
	public btnClose: Button1;
	//>>>>end

	public static URL: string = "ui://jvxpx9emnn9876";

	public static createInstance(): ViewFightWin {
		return <ViewFightWin><any>(fairygui.UIPackage.createObject("common", "ViewFightWin"));
	}

	public constructor() {
		super();
		this.isClosePanel = false;
		this.loadRes();
	}
	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("common", "ViewFightWin").asCom;
		this.contentPane = this.view;
		CommonManager.parseChildren(this.view, this);

		this.list.setVirtual();
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.listRender;
		this.txtXieZhu.visible = false;
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.finish, this);
		super.childrenCreated();
		this.resetPosition();
	}

	public static showTip = false;
	protected onShown(): void {
		this.showWin(this._args);
		this.timeremain = 5000;
		this.lbTip.visible = ViewFightWin.showTip;
		this.updateBtnRemain();
		GGlobal.control.listen(Enum_MsgType.BATTLEWIN_AWARDSCHANGE, this.showWin, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
	}

	protected onHide() {
		this.list.numItems = 0;
		ViewFightWin.showTip = false;
		GGlobal.layerMgr.close(UIConst.BATTLEWIN);
		GGlobal.control.remove(Enum_MsgType.BATTLEWIN_AWARDSCHANGE, this.showWin, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
		GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
	}

	public timeremain: number;
	protected timer = 0;
	protected onFrame(e: egret.Event) {
		this.timer += GGlobal.mapscene.dt;
		this.timeremain -= GGlobal.mapscene.dt;
		if (this.timer >= 500) {
			this.updateBtnRemain();
			this.timer = 0;
		}
		if (this.timeremain <= 0) {
			this.timeremain = 0;
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
			this.finish();
		}
	}

	private listRender(idx, obj) {
		let item: ViewGridRender = obj as ViewGridRender;
		item.vo = this.dta[idx];
	}

	private dta;
	protected showWin(arg = null) {
		var self = this;
		var awards;
		if (arg) {
			awards = arg;
		} else {
			awards = GGlobal.modelBoss.bossAward;
		}
		this.dta = awards;
		this.list.numItems = this.dta.length;
	}

	protected updateBtnRemain() {
		this.btnClose.text = "领取" + "(" + Math.ceil(this.timeremain / 1000) + ")";
	}

	protected finish() {
		if (GGlobal.mapscene.scenetype == SceneCtrl.GUANQIA) {
			(GGlobal.mapscene.sceneCtrl as GuanQiaSceneCtrl).setCurSt(0);
		} else if (GGlobal.mapscene.scenetype == SceneCtrl.PBOSS) {
			Model_Boss.exitBoss(0);
		} else if (GGlobal.mapscene.scenetype == SceneCtrl.QMBOSS || GGlobal.mapscene.scenetype == SceneCtrl.QMBOSS_DJ) {
			Model_Boss.exitBoss(1);
		} else if (GGlobal.mapscene.scenetype == SceneCtrl.LVBU) {
			Model_Boss.exitBoss(3);
		} else if (GGlobal.mapscene.scenetype == SceneCtrl.MENGHUO) {
			Model_Boss.exitBoss(4);
		} else {
			GGlobal.layerMgr.close2(UIConst.BATTLEWIN);
			GGlobal.modelScene.returnMainScene();
		}
		GGlobal.layerMgr.open(UIConst.SCENELOADING);
		GGlobal.layerMgr.close(UIConst.ALERT);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}
}