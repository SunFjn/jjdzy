/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewLZDRet extends fairygui.GComponent {

	public n3: fairygui.GImage;
	public lbTitle: fairygui.GLoader;
	public lbScore: fairygui.GRichTextField;


	public static URL: string = "ui://1xydor24n7ie3";

	private static instance: ViewLZDRet;
	public static createInstance(): ViewLZDRet {
		if (!this.instance) {
			this.instance = <ViewLZDRet><any>(fairygui.UIPackage.createObject("activityHall", "ViewLZDRet"));
		}
		return this.instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n3 = <fairygui.GImage><any>(this.getChild("n3"));
		this.lbTitle = <fairygui.GLoader><any>(this.getChild("lbTitle"));
		this.lbScore = <fairygui.GRichTextField><any>(this.getChild("lbScore"));
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}

	public static showView(arr) {
		let ins = ViewLZDRet.createInstance();
		if (!ins.parent) {
			GGlobal.layerMgr.UI_Popup.addChild(ins);
		}
		ins.onOpenView(arr);
	}

	public onOpenView(arr){
		if (arr) {
			let urls = arr[0] == 1 ? "ui://1xydor24oc0jv" : "ui://1xydor24oc0jw";
			this.lbTitle.url = urls;
			this.lbScore.text = "增加" + arr[1] + "积分";
		}
		this.openTime = egret.getTimer() + 3000;
		Timer.instance.listen(this.onCloseHD, this, 1000);
	}

	private openTime: number = 0;
	private onCloseHD() {
		if (egret.getTimer() <  this.openTime) return;
		ViewLZDRet.createInstance().removeFromParent();
		Timer.instance.remove( this.onCloseHD, this );
	}
}