/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class GuanQiaBossAni extends UIModalPanel {
	public t0: fairygui.Transition;
	public n0: fairygui.GLoader;

	public static URL: string = "ui://r92dp953v2391v";

	public static createInstance(): GuanQiaBossAni {
		return <GuanQiaBossAni><any>(fairygui.UIPackage.createObject("guanqia", "GuanQiaBossAni"));
	}

	public constructor() {
		super();
		this.isShowMask = false;
		this.touchable = false;
		this.loadRes("guanqia", "guanqia_atlas0");
	}

	protected childrenCreated() {
		GGlobal.createPack("guanqia");
		let a = this;
		a.view = fairygui.UIPackage.createObject("guanqia", "GuanQiaBossAni").asCom;
		a.contentPane = a.view;

		this.n0 = <fairygui.GLoader><any>(a.view.getChild("n0"));
		a.t0 = a.view.getTransition("t0");

		super.childrenCreated();
	}

	protected onShown(): void {
		let url;
		if (GGlobal.modelGuanQia.hasSurprise) {
			url = Enum_Path.PIC_URL + "guanqiaboss1.png";
		} else {
			url = Enum_Path.PIC_URL + "guanqiaboss.png";
		}
		IconUtil.setImg1(url, this.n0);
		this.t0.play();
		Timer.instance.callLater(this.close234, 2000, this);
	}

	private close234() {
		GGlobal.layerMgr.close2(UIConst.BOSSANI);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.BOSSANI);
		IconUtil.setImg1(null, this.n0);
	}
}