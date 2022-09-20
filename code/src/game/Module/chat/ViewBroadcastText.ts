/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewBroadcastText extends fairygui.GComponent {

	public btxt: BrocastTxt;

	public static URL: string = "ui://7gxkx46we2bn4a";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.btxt = <BrocastTxt><any>(this.getChild("btxt"));
		this.btxt.callBack = Handler.create(this, this.run);
		this.btxt.touchable = false;
		this.touchable = false;
		this.resetPosition();
		GGlobal.control.listen(Enum_MsgType.GAMEACTIVE_EVT, this.clearList, this);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, 230);
	}

	private clearList(){
		if(this.listStr.length>2){
			this.listStr.length = 2;
		}
	}

	protected listStr: any[] = [];
	private isTween: boolean = false;
	public showText(str: string): void {
		this.listStr.push(str);
		if (this.listStr.length > 20) {
			this.listStr.shift();
		}
		if (!this.isTween && this.listStr.length > 0) {
			this.run();
		}
	}

	protected run(): void {
		if (!this.btxt) {
			return;
		}
		this.btxt.clear();
		if (this.listStr.length > 0) {
			this.isTween = true;
			var str: string = this.listStr.shift();
			this.btxt.setdata(str);
		} else {
			this.isTween = false;
			ViewBroadcastText.createInstance().removeFromParent();
		}
	}

	public uidispose(): void {
		this.btxt.clear();
		ViewBroadcastText.createInstance().removeFromParent();
	}

	private static _instance: ViewBroadcastText;
	public static createInstance(): ViewBroadcastText {
		if (!this._instance) {
			this._instance = <ViewBroadcastText><any>(fairygui.UIPackage.createObject("MainUI", "ViewBroadcastText"));
		}
		return this._instance;
	}

	public static showMsg(str): void {
		let ins = ViewBroadcastText.createInstance();
		if (!ins.parent) {
			GGlobal.layerMgr.UI_Popup.addChild(ins);
		}
		ins.showText(str);
	}
}