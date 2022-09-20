/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildYSBossTip extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public lbInfo: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6ein3b3n";

	private static _inst;
	public static createInstance(): ChildYSBossTip {
		return ChildYSBossTip._inst ||(ChildYSBossTip._inst=<ChildYSBossTip><any>(fairygui.UIPackage.createObject("Boss", "ChildYSBossTip")));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	update = (v) => {
		this.lbInfo.text = "剩余可购买的复活次数：" + v;
	}

	public showOrHide(v) {
		if (v) {
			this.setXY(0,App.stageHeight-300);
			GGlobal.layerMgr.UI_MainLowBottom.addChild(this);
		} else {
			this.removeFromParent();
		}
	}
}