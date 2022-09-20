/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class FengHuoLYUI extends fairygui.GComponent {
	public n0: fairygui.GButton;
	public n2: fairygui.GButton;
	public n4:Button2;
	public n6: fairygui.GImage;
	public n7: fairygui.GTextField;

	public static URL: string = "ui://edvdots4srrs0";

	public static createInstance(): FengHuoLYUI {
		return <FengHuoLYUI><any>(fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLYUI"));
	}

	public constructor() {
		super();
	}
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let sf = this;

		sf.n0 = <fairygui.GButton><any>(sf.getChild("n0"));
		sf.n2 = <fairygui.GButton><any>(sf.getChild("n2"));
		sf.n4 = <Button2><any>(sf.getChild("n4"));
		sf.n6 = <fairygui.GImage><any>(sf.getChild("n6"));
		sf.n7 = <fairygui.GTextField><any>(sf.getChild("n7"));
	}

	private onExite() {
		let sf = this;
		ViewAlert.show("退出后30秒不可进入\n是否退出", Handler.create(sf, sf.exiteAct), ViewAlert.OKANDCANCEL);
	}

	private exiteAct() {
		GGlobal.modelFengHuoLY.exite();
	}

	private CameraHD() {
		let sf = this;
		GGlobal.modelFengHuoLY.camera = sf.n0.selected ? 1 : 0;
	}

	private onRank() {
		GGlobal.layerMgr.open(UIConst.FHLY_RANK);
	}

	private addRedot(){
		this.n4.checkNotice = GGlobal.reddot.checkCondition(UIConst.FHLY);
	}

	protected resetPosition() {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, fairygui.GRoot.inst.height - this.height);
	}

	public enter() {
		let sf = this;
		let b = GGlobal.layerMgr.UI_MainBottom;
		b.addChild(this);
		sf.resetPosition();
		sf.n0.addClickListener(sf.CameraHD, sf);
		sf.n2.addClickListener(sf.onExite, sf);
		sf.n4.addClickListener(sf.onRank, sf);
		sf.addRedot();
		GGlobal.reddot.listen(UIConst.FHLY, sf.addRedot, sf);
	}

	public exite() {
		let sf = this;
		this.removeFromParent();
		sf.n0.removeClickListener(sf.CameraHD, sf);
		sf.n2.removeClickListener(sf.onExite, sf);
		sf.n4.removeClickListener(sf.onRank, sf);
		GGlobal.reddot.remove(UIConst.FHLY, sf.addRedot, sf);
	}
}