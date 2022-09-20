class View_FunctionPreview extends fairygui.GComponent {

	public iconImg: fairygui.GLoader;
	public openLb: fairygui.GRichTextField;
	public noticeImg: fairygui.GImage;
	public imgBg: fairygui.GImage;

	public static URL: string = "ui://7gxkx46wobjs4d";

	private static _instance: View_FunctionPreview;
	public static createInstance(): View_FunctionPreview {
		if (!View_FunctionPreview._instance) View_FunctionPreview._instance = <View_FunctionPreview><any>(fairygui.UIPackage.createObject("MainUI", "View_FunctionPreview"));
		return View_FunctionPreview._instance;
	}

	private static _instance1: View_FunctionPreview;
	public static createInstance1(): View_FunctionPreview {
		if (!View_FunctionPreview._instance1) View_FunctionPreview._instance1 = <View_FunctionPreview><any>(fairygui.UIPackage.createObject("MainUI", "View_FunctionPreview"));
		return View_FunctionPreview._instance1;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		a.iconImg = <fairygui.GLoader><any>(a.getChild("iconImg"));
		a.openLb = <fairygui.GRichTextField><any>(a.getChild("openLb"));
		a.noticeImg = <fairygui.GImage><any>(a.getChild("noticeImg"));
		a.imgBg = <fairygui.GImage><any>(a.getChild("imgBg"));
		Model_FunctionPreview.getFunctionPreView();
		GGlobal.reddot.listen(UIConst.FUNCTIONPREVIEW, a.showNotice, this);
		a.show();
		GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, a.show, this);
		GGlobal.control.listen(Enum_MsgType.FUNCTIONPREVIEW, a.show, this);
		fairygui.GRoot.inst.addEventListener(fairygui.GObject.SIZE_CHANGED, a.resetPosition, this);
		a.addClickListener(a.OnOpen, this);
	}

	private OnOpen() {
		GGlobal.layerMgr.open(UIConst.FUNCTIONPREVIEW);
	}

	private guanqiaID = 0;
	public show() {
		let a = this;
		let curcfg;
		let listArr = Model_FunctionPreview.listArr;
		let arr = Model_FunctionPreview.drawArr;
		let index = 0;
		for (let i = 0; i < listArr.length; i++) {
			let cfg = listArr[i];
			if (GGlobal.modelGuanQia.curGuanQiaLv < cfg.id) {
				curcfg = cfg;
				break;
			} else {
				if (Model_FunctionPreview.isFirstOpen && arr.indexOf(cfg.id) == -1) {
					index++;
					GGlobal.reddot.setCondition(UIConst.FUNCTIONPREVIEW, 0, true);
				}
			}
		}
		if (!curcfg) curcfg = listArr[listArr.length - 1];
		if (Model_FunctionPreview.isFirstOpen && index == 0) {
			GGlobal.reddot.setCondition(UIConst.FUNCTIONPREVIEW, 0, false);
		}
		IconUtil.setImg(a.iconImg, Enum_Path.SYSSHOW_URL + curcfg.icon + ".png");
		a.openLb.text = curcfg.tips;
		if (a.guanqiaID == 0) a.guanqiaID = curcfg.id;
		if (a.guanqiaID != curcfg.id && !Model_FunctionPreview.isFirstOpen) {
			a.guanqiaID = curcfg.id
			GGlobal.reddot.setCondition(UIConst.FUNCTIONPREVIEW, 0, true);
		}
		a.showNotice();
		a.resetPosition();
	}

	private showNotice() {
		this.noticeImg.visible = GGlobal.reddot.checkCondition(UIConst.FUNCTIONPREVIEW);
	}

	public hide() {
		let a = this;
		GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, a.show, this);
		fairygui.GRoot.inst.removeEventListener(fairygui.GObject.SIZE_CHANGED, a.resetPosition, this);
		GGlobal.reddot.remove(UIConst.FUNCTIONPREVIEW, a.showNotice, this);
		GGlobal.control.remove(Enum_MsgType.FUNCTIONPREVIEW, a.show, this);
		IconUtil.setImg(a.iconImg, null);
	}

	public resetPosition(): void {
		let a = this;
		// a.setXY((fairygui.GRoot.inst.width - a.width), View_ActPreview.instance.height + ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + ViewMainTopUI2.instance.height * 2);
	}

	public resetPosition1(): void {
		let a = this;
		a.setXY(43, 164);
	}
}