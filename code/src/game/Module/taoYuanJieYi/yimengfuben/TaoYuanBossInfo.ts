class TaoYuanBossInfo extends fairygui.GComponent {

	public lbMyhurt: fairygui.GRichTextField;
	public btn: fairygui.GButton;

	public static URL: string = "ui://m2fm2aiygf441g";

	public static createInstance(): TaoYuanBossInfo {
		return <TaoYuanBossInfo><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "TaoYuanBossInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private click() {
		// GGlobal.layerMgr.open(UIConst.TYBOSS_RANK);
	}

	public listen() {
		let s = this;
		s.btn.addClickListener(s.click, s);
		GGlobal.model_TYJY.listen(Model_TYJY.msg_batInfo, s.setdata, s);
		s.resetPosition();
	}

	public removeList() {
		let s = this;
		s.btn.removeClickListener(s.click, s);
		GGlobal.model_TYJY.remove(Model_TYJY.msg_batInfo, s.setdata, s);
	}

	private static instance: TaoYuanBossInfo;
	public static show() {
		let s = this;
		if (!s.instance) s.instance = s.createInstance();
		s.instance.listen();
		GGlobal.layerMgr.UI_floorUI_1.addChild(s.instance);
	}

	public static hide() {
		let s = this;
		s.instance.removeList();
		s.instance.clearDatta();
		if (s.instance.parent) GGlobal.layerMgr.UI_floorUI_1.removeChild(s.instance);
	}

	public setdata() {
		let s = this;
		var d = GGlobal.model_TYJY.battleInfo.others;
		if (d.length) {
			s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(GGlobal.model_TYJY.battleInfo.myDamage) + "               " + d[0].name + "：" + ConfigHelp.getYiWanText(d[0].demage);
		} else {
			s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(GGlobal.model_TYJY.battleInfo.myDamage);
		}
	}

	private clearDatta() {
		let s = this;
		s.lbMyhurt.text = "";
	}

	public resetPosition(): void {
		let s = this;
		s.setXY((fairygui.GRoot.inst.width - s.width) >> 1, 380);
	}
}