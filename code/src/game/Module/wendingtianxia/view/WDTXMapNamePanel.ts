/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class WDTXMapNamePanel extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public n1: fairygui.GImage;
	public lbMapName: fairygui.GRichTextField;

	public static URL: string = "ui://gxs8kn67hocl15";

	private static ins:WDTXMapNamePanel;
	public static createInstance(): WDTXMapNamePanel {
		if(!this.ins)this.ins =  <WDTXMapNamePanel><any>(fairygui.UIPackage.createObject("wendingTX", "WDTXMapNamePanel"));
		return this.ins;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChild("n0"));
		this.n1 = <fairygui.GImage><any>(this.getChild("n1"));
		this.lbMapName = <fairygui.GRichTextField><any>(this.getChild("lbMapName"));
	}

	public show1() {
		this.lbMapName.text = GGlobal.modelWenDingTX.layer + "";
		GGlobal.layerMgr.UI_Message.addChild(this);
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, fairygui.GRoot.inst.height>>1);
		Timer.instance.callLater(this.hide1, 1500,this);
	}

	public hide1() {
		this.removeFromParent();

	}
}